export function HeroSection() {
  return (
    <section
      id="inicio"
      className="technical-grid relative overflow-hidden px-6 py-24 md:px-16 lg:px-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,204,21,0.16),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(113,113,122,0.18),_transparent_36%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div className="tech-line">
          <div className="mb-6 inline-flex rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300 shadow-lg shadow-yellow-400/10">
            Engenharia • Impressão 3D • Método dos Elementos Finitos
          </div>

          <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Simule a resistência de peças antes da{" "}
            <span className="text-yellow-400">fabricação</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            O PrintFEM é uma aplicação web didática para analisar peças
            impressas em 3D usando uma aproximação inspirada no Método dos
            Elementos Finitos. Ideal para protótipos de robótica, drones,
            sensores e hardware.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#simulacao"
              className="yellow-glow rounded-xl bg-yellow-400 px-6 py-3 font-black text-black transition hover:-translate-y-1 hover:bg-yellow-300"
            >
              Iniciar simulação
            </a>

            <a
              href="#sobre"
              className="rounded-xl border border-zinc-700 bg-zinc-900/80 px-6 py-3 font-bold text-zinc-200 transition hover:-translate-y-1 hover:border-yellow-400 hover:text-yellow-300"
            >
              Entender o método
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <MiniMetric label="Análise" value="Tensão" />
            <MiniMetric label="Cálculo" value="MEF" />
            <MiniMetric label="Saída" value="Diagnóstico" />
          </div>
        </div>

        <div className="relative flex min-h-[500px] items-center justify-center">
          <div className="absolute h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />

          <div className="tech-card relative h-[410px] w-[390px] overflow-hidden rounded-[2rem] p-8">
            <div className="absolute inset-0 technical-grid opacity-40" />

            <div className="absolute left-8 top-8 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-yellow-400">
              Simulação estrutural
            </div>

            <div className="float-3d absolute left-16 top-36 h-28 w-56 skew-y-[-10deg] rounded-2xl border border-zinc-500 metal-surface shadow-2xl">
              <div className="absolute -right-9 top-4 h-28 w-9 skew-y-[35deg] rounded-r-2xl bg-zinc-800" />
              <div className="absolute -top-8 left-7 h-8 w-56 skew-x-[35deg] rounded-t-2xl bg-zinc-500" />

              <div className="absolute left-10 top-10 h-5 w-5 rounded-full border border-yellow-300 bg-yellow-400 shadow-lg shadow-yellow-400/30" />
              <div className="absolute right-12 top-10 h-5 w-5 rounded-full border border-yellow-300 bg-yellow-400 shadow-lg shadow-yellow-400/30" />

              <div className="critical-pulse absolute right-8 top-16 h-5 w-5 rounded-full bg-red-500" />
            </div>

            <div className="force-motion absolute right-16 top-20 z-20 flex flex-col items-center">
              <span className="mb-2 rounded-full border border-yellow-400/40 bg-black px-3 py-1 text-xs font-black text-yellow-300">
                FORÇA
              </span>

              <div className="h-28 w-2 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50" />
              <div className="h-0 w-0 border-l-[18px] border-r-[18px] border-t-[30px] border-l-transparent border-r-transparent border-t-yellow-400" />
            </div>

            <div className="absolute bottom-24 left-14 right-14 h-8 rounded-full bg-black/80 blur-xl" />

            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-zinc-700 bg-black/70 p-4 backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-400">
                  PrintFEM Engine
                </p>

                <p className="rounded-full bg-yellow-400 px-2 py-1 text-xs font-black text-black">
                  ON
                </p>
              </div>

              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 24 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-3 rounded-sm ${
                      index > 18
                        ? "bg-red-500"
                        : index > 12
                        ? "bg-orange-400"
                        : index > 6
                        ? "bg-yellow-400"
                        : "bg-zinc-500"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-3 text-sm text-zinc-300">
                Mapa de tensão por elementos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 shadow-xl shadow-black/20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
        {label}
      </p>

      <p className="mt-2 text-xl font-black text-white">{value}</p>
    </div>
  );
}