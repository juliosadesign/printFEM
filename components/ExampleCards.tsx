const examples = [
    {
      title: "Suporte de sensor",
      description:
        "Peça usada para fixar sensores em robôs, bancadas de teste e equipamentos inteligentes.",
    },
    {
      title: "Suporte de câmera",
      description:
        "Estrutura impressa em 3D para câmeras pequenas, sistemas de visão computacional e monitoramento.",
    },
    {
      title: "Peça de drone",
      description:
        "Braços, bases e conexões que precisam resistir a vibração, peso e impacto.",
    },
    {
      title: "Base de placa eletrônica",
      description:
        "Suporte para placas, módulos e circuitos usados em protótipos de hardware.",
    },
  ];
  
  export function ExampleCards() {
    return (
      <section id="simulacao" className="px-6 py-20 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Exemplos de peças
            </p>
  
            <h2 className="text-3xl font-black text-white md:text-5xl">
              Modelos que poderão ser analisados na simulação.
            </h2>
  
            <p className="mt-6 leading-8 text-zinc-400">
              Nesta primeira etapa, a aplicação ainda não executa os cálculos. A
              base visual já está preparada para receber o formulário, a malha, o
              mapa de tensão e o diagnóstico técnico.
            </p>
          </div>
  
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {examples.map((example) => (
              <article
                key={example.title}
                className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl shadow-black/30 transition hover:-translate-y-2 hover:border-yellow-400/70"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-yellow-400/10 blur-2xl transition group-hover:bg-yellow-400/20" />
  
                <div className="mb-8 h-32 rounded-2xl border border-zinc-700 bg-gradient-to-br from-zinc-700 to-zinc-950 p-4">
                  <div className="relative mx-auto mt-6 h-14 w-24 skew-y-[-12deg] rounded-lg bg-zinc-500 shadow-xl">
                    <div className="absolute -right-4 top-3 h-14 w-5 skew-y-[35deg] rounded-r-lg bg-zinc-700" />
                    <div className="absolute -top-4 left-3 h-5 w-24 skew-x-[35deg] rounded-t-lg bg-zinc-400" />
                    <div className="absolute left-8 top-4 h-3 w-3 rounded-full bg-yellow-400" />
                  </div>
                </div>
  
                <h3 className="text-xl font-black text-white">
                  {example.title}
                </h3>
  
                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {example.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }