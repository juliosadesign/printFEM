const useCases = [
    {
      title: "Robótica",
      text: "Análise de suportes, garras, bases e conexões usadas em robôs educacionais ou industriais.",
    },
    {
      title: "Impressão 3D",
      text: "Teste virtual de peças antes da fabricação, reduzindo desperdício de material e tempo de produção.",
    },
    {
      title: "Drones",
      text: "Avaliação de braços, suportes e estruturas leves que precisam resistir à vibração e impacto.",
    },
    {
      title: "Suporte de sensores",
      text: "Verificação de peças usadas para fixar sensores em projetos de IoT, automação e monitoramento.",
    },
    {
      title: "Protótipos de hardware",
      text: "Apoio no desenvolvimento de bases e carcaças para placas eletrônicas, módulos e dispositivos.",
    },
  ];
  
  export function UseCaseSection() {
    return (
      <section id="sobre" className="px-6 py-20 md:px-16 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Aplicações reais
            </p>
  
            <h2 className="text-3xl font-black text-white md:text-5xl">
              Pensado para empresas que criam, testam e fabricam protótipos.
            </h2>
  
            <p className="mt-6 leading-8 text-zinc-400">
              No cotidiano de empresas de tecnologia, muitas peças são criadas
              rapidamente em impressoras 3D. Porém, antes de usar essas peças em
              drones, robôs, sensores ou dispositivos eletrônicos, é importante
              avaliar se elas resistem à carga aplicada.
            </p>
  
            <p className="mt-4 leading-8 text-zinc-400">
              O PrintFEM apresenta esse processo de forma visual: o usuário define
              o material, a geometria, a força aplicada e recebe uma análise
              simplificada da peça.
            </p>
          </div>
  
          <div className="grid gap-5">
            {useCases.map((item) => (
              <article
                key={item.title}
                className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-yellow-400/70"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-yellow-400/10 blur-2xl" />
  
                <div className="relative">
                  <div className="mb-4 h-3 w-20 rounded-full bg-yellow-400" />
  
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
  
                  <p className="mt-3 leading-7 text-zinc-400">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }