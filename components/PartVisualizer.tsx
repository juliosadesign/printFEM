"use client";

type PartVisualizerData = {
  partType: string;
  material: string;
  fixedPoint: string;
  forceDirection: string;
};

type PartVisualizerProps = {
  data: PartVisualizerData | null;
};

export function PartVisualizer({ data }: PartVisualizerProps) {
  const partType = data?.partType ?? "Suporte em L";
  const material = data?.material ?? "PLA";
  const fixedPoint = data?.fixedPoint ?? "Esquerda";
  const forceDirection = data?.forceDirection ?? "Para baixo";

  return (
    <section className="border-t border-zinc-900 bg-black px-6 py-20 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
            Visualização da peça
          </p>

          <h2 className="text-3xl font-black text-white md:text-5xl">
            Representação 3D/isométrica da peça analisada.
          </h2>

          <p className="mt-6 leading-8 text-zinc-400">
            A visualização abaixo representa a peça selecionada, a região de
            apoio e a força aplicada. O objetivo é deixar o processo do Método
            dos Elementos Finitos mais didático e visual.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl shadow-black/60 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,204,21,0.16),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(113,113,122,0.25),_transparent_35%)]" />

            <div className="relative flex h-full min-h-[450px] items-center justify-center">
              <div className="absolute bottom-20 h-12 w-80 rounded-full bg-black/80 blur-xl" />

              <ForceArrow direction={forceDirection} />

              <SupportMarker fixedPoint={fixedPoint} />

              <div className="relative flex h-[330px] w-[420px] items-center justify-center">
                {partType === "Suporte em L" && <LBracket />}
                {partType === "Barra retangular" && <RectangularBar />}
                {partType === "Placa com furo" && <PlateWithHole />}
                {partType === "Suporte de sensor" && <SensorSupport />}
                {partType === "Braço de drone" && <DroneArm />}
              </div>

              <PressureEffect />
            </div>
          </div>

          <aside className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/40 md:p-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Dados visuais
            </p>

            <h3 className="text-2xl font-black text-white">
              Peça configurada
            </h3>

            <div className="mt-6 space-y-3">
              <InfoItem label="Tipo da peça" value={partType} />
              <InfoItem label="Material" value={material} />
              <InfoItem label="Ponto de fixação" value={fixedPoint} />
              <InfoItem label="Direção da força" value={forceDirection} />
            </div>

            <div className="mt-8 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
                Interpretação
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-300">
                A peça em cinza representa o objeto físico que será analisado. A
                seta amarela representa a força aplicada. A região destacada
                indica o apoio ou fixação da peça, onde geralmente ocorre maior
                concentração de tensão.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-800 bg-black/40 p-5">
              <p className="text-sm font-bold text-white">
                Próxima etapa do projeto
              </p>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Depois desta visualização, a aplicação receberá a malha de
                elementos finitos, mostrando como a peça será dividida em
                pequenas regiões para o cálculo numérico.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function LBracket() {
  return (
    <div className="relative h-72 w-72 rotate-[-8deg]">
      <div className="absolute bottom-12 left-10 h-24 w-52 skew-y-[-10deg] rounded-2xl border border-zinc-500 bg-gradient-to-br from-zinc-300 via-zinc-600 to-zinc-900 shadow-2xl">
        <div className="absolute -right-8 top-4 h-24 w-8 skew-y-[35deg] rounded-r-2xl bg-zinc-800" />
        <div className="absolute -top-7 left-5 h-7 w-52 skew-x-[35deg] rounded-t-2xl bg-zinc-500" />
      </div>

      <div className="absolute bottom-12 left-10 h-56 w-24 skew-y-[-10deg] rounded-2xl border border-zinc-500 bg-gradient-to-br from-zinc-300 via-zinc-600 to-zinc-950 shadow-2xl">
        <div className="absolute -right-7 top-3 h-56 w-7 skew-y-[35deg] rounded-r-2xl bg-zinc-800" />
        <div className="absolute -top-7 left-4 h-7 w-24 skew-x-[35deg] rounded-t-2xl bg-zinc-500" />
      </div>

      <Bolt left="85px" top="195px" />
      <Bolt left="150px" top="195px" />
      <CriticalPoint left="82px" top="150px" />
    </div>
  );
}

function RectangularBar() {
  return (
    <div className="relative h-56 w-96 rotate-[-8deg]">
      <div className="absolute left-6 top-20 h-24 w-80 skew-y-[-10deg] rounded-2xl border border-zinc-500 bg-gradient-to-br from-zinc-300 via-zinc-600 to-zinc-950 shadow-2xl">
        <div className="absolute -right-10 top-5 h-24 w-10 skew-y-[35deg] rounded-r-2xl bg-zinc-800" />
        <div className="absolute -top-8 left-7 h-8 w-80 skew-x-[35deg] rounded-t-2xl bg-zinc-500" />
      </div>

      <Bolt left="90px" top="110px" />
      <Bolt left="230px" top="110px" />
      <CriticalPoint left="285px" top="95px" />
    </div>
  );
}

function PlateWithHole() {
  return (
    <div className="relative h-72 w-80 rotate-[-8deg]">
      <div className="absolute left-12 top-16 h-48 w-56 skew-y-[-10deg] rounded-3xl border border-zinc-500 bg-gradient-to-br from-zinc-300 via-zinc-600 to-zinc-950 shadow-2xl">
        <div className="absolute -right-9 top-5 h-48 w-9 skew-y-[35deg] rounded-r-3xl bg-zinc-800" />
        <div className="absolute -top-8 left-7 h-8 w-56 skew-x-[35deg] rounded-t-3xl bg-zinc-500" />

        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-zinc-900 bg-black shadow-inner" />
      </div>

      <Bolt left="85px" top="95px" />
      <Bolt left="210px" top="95px" />
      <Bolt left="85px" top="205px" />
      <Bolt left="210px" top="205px" />
      <CriticalPoint left="172px" top="145px" />
    </div>
  );
}

function SensorSupport() {
  return (
    <div className="relative h-72 w-80 rotate-[-8deg]">
      <div className="absolute bottom-14 left-10 h-20 w-64 skew-y-[-10deg] rounded-2xl border border-zinc-500 bg-gradient-to-br from-zinc-300 via-zinc-600 to-zinc-950 shadow-2xl">
        <div className="absolute -right-8 top-4 h-20 w-8 skew-y-[35deg] rounded-r-2xl bg-zinc-800" />
        <div className="absolute -top-7 left-5 h-7 w-64 skew-x-[35deg] rounded-t-2xl bg-zinc-500" />
      </div>

      <div className="absolute bottom-32 left-32 h-32 w-20 skew-y-[-10deg] rounded-2xl border border-zinc-500 bg-gradient-to-br from-zinc-300 via-zinc-600 to-zinc-950 shadow-2xl">
        <div className="absolute -right-7 top-3 h-32 w-7 skew-y-[35deg] rounded-r-2xl bg-zinc-800" />
        <div className="absolute -top-7 left-4 h-7 w-20 skew-x-[35deg] rounded-t-2xl bg-zinc-500" />
      </div>

      <div className="absolute left-[115px] top-24 h-16 w-28 skew-y-[-10deg] rounded-xl border border-yellow-400/60 bg-yellow-400/20 shadow-lg shadow-yellow-400/10" />

      <Bolt left="82px" top="210px" />
      <Bolt left="210px" top="210px" />
      <CriticalPoint left="145px" top="165px" />
    </div>
  );
}

function DroneArm() {
  return (
    <div className="relative h-72 w-96 rotate-[-8deg]">
      <div className="absolute left-14 top-32 h-16 w-72 skew-y-[-10deg] rounded-full border border-zinc-500 bg-gradient-to-br from-zinc-300 via-zinc-600 to-zinc-950 shadow-2xl">
        <div className="absolute -right-8 top-3 h-16 w-8 skew-y-[35deg] rounded-r-full bg-zinc-800" />
        <div className="absolute -top-6 left-8 h-6 w-72 skew-x-[35deg] rounded-t-full bg-zinc-500" />
      </div>

      <div className="absolute left-10 top-24 h-28 w-28 rounded-full border border-zinc-500 bg-gradient-to-br from-zinc-300 via-zinc-600 to-zinc-950 shadow-2xl">
        <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      </div>

      <div className="absolute right-4 top-24 h-28 w-28 rounded-full border border-zinc-500 bg-gradient-to-br from-zinc-300 via-zinc-600 to-zinc-950 shadow-2xl">
        <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      </div>

      <CriticalPoint left="190px" top="135px" />
    </div>
  );
}

function ForceArrow({ direction }: { direction: string }) {
  const rotation =
    direction === "Para cima"
      ? "rotate-180"
      : direction === "Horizontal"
      ? "-rotate-90"
      : "rotate-0";

  const position =
    direction === "Horizontal"
      ? "right-16 top-1/2 -translate-y-1/2"
      : "right-24 top-10";

  return (
    <div
      className={`absolute z-20 flex flex-col items-center ${position} ${rotation}`}
    >
      <span className="mb-2 rounded-full border border-yellow-400/40 bg-black px-3 py-1 text-xs font-black text-yellow-300">
        FORÇA
      </span>

      <div className="h-24 w-2 animate-pulse rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50" />

      <div className="h-0 w-0 border-l-[16px] border-r-[16px] border-t-[26px] border-l-transparent border-r-transparent border-t-yellow-400" />
    </div>
  );
}

function SupportMarker({ fixedPoint }: { fixedPoint: string }) {
  const position =
    fixedPoint === "Direita"
      ? "right-16 bottom-24"
      : fixedPoint === "Base"
      ? "left-1/2 bottom-20 -translate-x-1/2"
      : "left-16 bottom-24";

  return (
    <div
      className={`absolute z-10 ${position} rounded-2xl border border-yellow-400/50 bg-yellow-400/10 px-4 py-3 shadow-lg shadow-yellow-400/10`}
    >
      <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-400">
        Apoio
      </p>

      <p className="mt-1 text-sm font-bold text-white">{fixedPoint}</p>
    </div>
  );
}

function PressureEffect() {
  return (
    <div className="absolute right-24 top-36 z-0 h-28 w-28 rounded-full border border-yellow-400/20 bg-yellow-400/5 blur-sm" />
  );
}

function Bolt({ left, top }: { left: string; top: string }) {
  return (
    <div
      className="absolute h-5 w-5 rounded-full border border-yellow-300/70 bg-yellow-400 shadow-lg shadow-yellow-400/30"
      style={{ left, top }}
    >
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70" />
    </div>
  );
}

function CriticalPoint({ left, top }: { left: string; top: string }) {
  return (
    <div
      className="absolute h-5 w-5 rounded-full border border-red-400 bg-red-500 shadow-lg shadow-red-500/40"
      style={{ left, top }}
    >
      <div className="absolute inset-0 animate-ping rounded-full bg-red-500/50" />
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-black/40 px-4 py-3">
      <span className="text-sm text-zinc-400">{label}</span>
      <span className="text-right text-sm font-bold text-white">{value}</span>
    </div>
  );
}