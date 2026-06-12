"use client";

type StressMapProps = {
  stressByElement: number[];
  maxStress: number;
  criticalRegion: string;
};

export function StressMap({
  stressByElement,
  maxStress,
  criticalRegion,
}: StressMapProps) {
  const elementCount = stressByElement.length;
  const columns = Math.min(8, Math.max(3, Math.ceil(Math.sqrt(elementCount))));
  const criticalIndex = getCriticalElementIndex(stressByElement);

  if (elementCount === 0) {
    return null;
  }

  return (
    <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl shadow-black/40 md:p-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
            Mapa de tensão
          </p>

          <h3 className="text-2xl font-black text-white md:text-3xl">
            Distribuição aproximada de tensão por elemento.
          </h3>

          <p className="mt-4 leading-8 text-zinc-400">
            As cores representam a concentração aproximada de tensão nos
            elementos da peça. Quanto mais quente a cor, maior a solicitação
            naquela região.
          </p>
        </div>

        <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-5">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
            Região crítica identificada
          </p>

          <p className="mt-3 text-sm leading-7 text-zinc-300">
            {criticalRegion}
          </p>

          <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-300">
              Elemento mais solicitado
            </p>

            <p className="mt-2 text-lg font-black text-white">
              Elemento {criticalIndex + 1}
            </p>

            <p className="mt-1 text-sm text-zinc-400">
              {stressByElement[criticalIndex]} MPa
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-black p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,204,21,0.12),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(239,68,68,0.10),_transparent_34%)]" />

          <div className="relative">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {stressByElement.map((stress, index) => {
                const isCritical = index === criticalIndex;

                return (
                  <div
                    key={`stress-map-${index}`}
                    className={`relative flex min-h-20 flex-col justify-between rounded-2xl border p-3 transition hover:-translate-y-1 hover:scale-[1.02] ${getStressCellClass(
                      stress,
                      maxStress,
                      isCritical
                    )}`}
                  >
                    {isCritical && (
                      <span className="absolute -right-1 -top-1 flex h-5 w-5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex h-5 w-5 rounded-full bg-red-500" />
                      </span>
                    )}

                    <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-80">
                      E{index + 1}
                    </p>

                    <div>
                      <p className="text-lg font-black">{stress}</p>
                      <p className="text-xs opacity-80">MPa</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 h-6 rounded-full bg-gradient-to-r from-zinc-300 via-yellow-400 via-orange-400 to-red-500" />

            <div className="mt-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
              <span>Baixa</span>
              <span>Média</span>
              <span>Alta</span>
              <span>Crítica</span>
            </div>
          </div>
        </div>

        <aside className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
            Legenda
          </p>

          <div className="space-y-4">
            <LegendItem
              colorClass="bg-zinc-300"
              title="Baixa tensão"
              description="Elemento com pouca solicitação mecânica."
            />

            <LegendItem
              colorClass="bg-yellow-400"
              title="Média tensão"
              description="Região com esforço moderado."
            />

            <LegendItem
              colorClass="bg-orange-400"
              title="Alta tensão"
              description="Elemento que merece atenção no projeto."
            />

            <LegendItem
              colorClass="bg-red-500"
              title="Região crítica"
              description="Maior concentração aproximada de tensão."
            />
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-700 bg-black/40 p-5">
            <p className="text-sm font-bold text-white">
              Como interpretar?
            </p>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              O mapa não representa uma análise profissional completa, mas ajuda
              a visualizar onde a peça pode concentrar mais esforço. Em um
              projeto real, essa região seria revisada com reforços, aumento de
              espessura ou troca de material.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function getCriticalElementIndex(stressByElement: number[]) {
  let criticalIndex = 0;
  let highestStress = stressByElement[0];

  stressByElement.forEach((stress, index) => {
    if (stress > highestStress) {
      highestStress = stress;
      criticalIndex = index;
    }
  });

  return criticalIndex;
}

function getStressCellClass(
  stress: number,
  maxStress: number,
  isCritical: boolean
) {
  const ratio = stress / maxStress;

  if (isCritical || ratio >= 0.85) {
    return "border-red-400/60 bg-red-500/90 text-white shadow-lg shadow-red-500/20";
  }

  if (ratio >= 0.65) {
    return "border-orange-400/60 bg-orange-400/90 text-black shadow-lg shadow-orange-400/20";
  }

  if (ratio >= 0.4) {
    return "border-yellow-400/60 bg-yellow-400/90 text-black shadow-lg shadow-yellow-400/20";
  }

  return "border-zinc-400/40 bg-zinc-300 text-black";
}

function LegendItem({
  colorClass,
  title,
  description,
}: {
  colorClass: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-zinc-800 bg-black/40 p-4">
      <div className={`mt-1 h-5 w-5 rounded-full ${colorClass}`} />

      <div>
        <p className="font-bold text-white">{title}</p>

        <p className="mt-1 text-sm leading-6 text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}