const features = [
    {
      title: "Simulação de tensão",
      description:
        "Estimativa das regiões onde a peça sofre maior concentração de esforço quando uma força é aplicada.",
    },
    {
      title: "Análise de deformação",
      description:
        "Visualização do deslocamento aproximado da peça para entender se ela pode entortar ou perder estabilidade.",
    },
    {
      title: "Escolha de material",
      description:
        "Comparação entre materiais como PLA, PETG, ABS, Nylon e Alumínio para avaliar resistência e aplicação.",
    },
    {
      title: "Diagnóstico automático",
      description:
        "Geração de uma recomendação simples indicando se a peça está segura, em atenção ou em estado crítico.",
    },
  ];
  
  export function FeatureCards() {
    return (
      <section
        id="resultados"
        className="border-y border-zinc-900 bg-black/30 px-6 py-20 md:px-16 lg:px-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Recursos da aplicação
            </p>
  
            <h2 className="text-3xl font-black text-white md:text-5xl">
              Uma interface para transformar cálculo numérico em decisão visual.
            </h2>
  
            <p className="mt-6 leading-8 text-zinc-400">
              O PrintFEM foi pensado para apresentar o Método dos Elementos
              Finitos de forma prática, conectando conceitos matemáticos com
              problemas reais de resistência em peças impressas em 3D.
            </p>
          </div>
  
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl shadow-black/30 transition hover:-translate-y-2 hover:border-yellow-400/70"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-2xl font-black text-black shadow-lg shadow-yellow-400/20">
                  {index + 1}
                </div>
  
                <h3 className="text-xl font-black text-white">{feature.title}</h3>
  
                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  {feature.description}
                </p>
  
                <div className="mt-6 h-1 w-16 rounded-full bg-yellow-400 transition group-hover:w-28" />
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }