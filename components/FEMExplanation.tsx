export function FEMExplanation() {
    const steps = [
      {
        number: "01",
        title: "Entrada de dados",
        description:
          "O usuário informa o tipo da peça, material, dimensões, força aplicada, ponto de fixação e quantidade de elementos da malha.",
      },
      {
        number: "02",
        title: "Geração da malha",
        description:
          "A peça é dividida em pequenas partes chamadas elementos. Essa divisão permite aproximar numericamente o comportamento da estrutura.",
      },
      {
        number: "03",
        title: "Cálculo aproximado",
        description:
          "O sistema estima área, momento de inércia, tensão máxima, deslocamento máximo e fator de segurança.",
      },
      {
        number: "04",
        title: "Mapa de tensão",
        description:
          "As tensões calculadas são distribuídas nos elementos, criando uma visualização colorida das regiões mais solicitadas.",
      },
      {
        number: "05",
        title: "Diagnóstico",
        description:
          "Com base nos resultados, o sistema informa se a peça está segura, em atenção ou em condição crítica.",
      },
    ];
  
    const concepts = [
      {
        title: "O que é o Método dos Elementos Finitos?",
        text: "O Método dos Elementos Finitos, ou MEF, é uma técnica numérica usada para estudar problemas de engenharia. Em vez de analisar uma peça inteira de uma só vez, o método divide a estrutura em partes menores e calcula uma aproximação do comportamento em cada região.",
      },
      {
        title: "Por que dividir a peça em elementos menores?",
        text: "Peças reais podem ter formatos complexos, furos, cantos, curvas e diferentes regiões de esforço. Ao dividir a peça em elementos menores, fica mais fácil estimar como cada parte reage à força aplicada.",
      },
      {
        title: "O que são nós e elementos?",
        text: "Os elementos são as pequenas partes da malha. Os nós são os pontos que conectam esses elementos. No MEF, os cálculos são feitos a partir das relações entre esses nós e elementos.",
      },
      {
        title: "Como a força gera tensão e deslocamento?",
        text: "Quando uma força é aplicada em uma peça, o material reage internamente. Essa reação gera tensão. Ao mesmo tempo, a peça pode deformar ou se deslocar. Quanto maior a força e menor a resistência da geometria ou do material, maior tende a ser a deformação.",
      },
      {
        title: "Como o sistema identifica a região crítica?",
        text: "O sistema compara os valores aproximados de tensão nos elementos. A região com maior concentração de tensão é considerada crítica, pois é a área com maior chance de falha ou deformação excessiva.",
      },
      {
        title: "Observação importante",
        text: "Esta aplicação é educacional e usa aproximações simplificadas. Ela serve para demonstrar o funcionamento do Método dos Elementos Finitos em um projeto acadêmico, mas não substitui softwares profissionais de engenharia.",
      },
    ];
  
    return (
      <section
        id="sobre"
        className="border-t border-zinc-900 bg-zinc-950 px-6 py-20 md:px-16 lg:px-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Explicação do método
            </p>
  
            <h2 className="text-3xl font-black text-white md:text-5xl">
              Como o Método dos Elementos Finitos é usado no PrintFEM?
            </h2>
  
            <p className="mt-6 leading-8 text-zinc-400">
              O PrintFEM transforma conceitos de Cálculo Numérico Avançado em uma
              aplicação visual. A ideia é mostrar, de forma didática, como uma peça
              impressa em 3D pode ser analisada a partir de uma malha, de cálculos
              aproximados e de um diagnóstico técnico.
            </p>
          </div>
  
          <div className="mb-14 rounded-3xl border border-yellow-400/30 bg-yellow-400/10 p-6 shadow-2xl shadow-black/40 md:p-8">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Fluxo da aplicação
            </p>
  
            <div className="grid gap-4 md:grid-cols-5">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-sm font-black text-black">
                      {step.number}
                    </div>
  
                    <h3 className="text-lg font-black text-white">
                      {step.title}
                    </h3>
  
                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      {step.description}
                    </p>
                  </div>
  
                  {index < steps.length - 1 && (
                    <div className="hidden md:absolute md:right-[-18px] md:top-1/2 md:z-10 md:block md:-translate-y-1/2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-yellow-400/40 bg-black text-yellow-400">
                        →
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
  
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {concepts.map((concept, index) => (
              <article
                key={concept.title}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl shadow-black/30 transition hover:-translate-y-1 hover:border-yellow-400/50"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/40 bg-yellow-400/10 text-lg font-black text-yellow-400">
                    {index + 1}
                  </div>
  
                  <h3 className="text-xl font-black text-white">
                    {concept.title}
                  </h3>
                </div>
  
                <p className="text-sm leading-7 text-zinc-400">{concept.text}</p>
              </article>
            ))}
          </div>
  
          <div className="mt-10 rounded-3xl border border-zinc-800 bg-black/50 p-6 md:p-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Resumo para apresentação
            </p>
  
            <h3 className="text-2xl font-black text-white">
              Frase simples para explicar o projeto
            </h3>
  
            <p className="mt-5 leading-8 text-zinc-300">
              O PrintFEM usa uma abordagem didática inspirada no Método dos
              Elementos Finitos para simular a resistência de peças impressas em
              3D. O sistema recebe os dados da peça, gera uma malha, calcula
              valores aproximados de tensão e deslocamento, mostra um mapa de
              tensão e entrega um diagnóstico técnico para auxiliar na tomada de
              decisão antes da fabricação.
            </p>
          </div>
        </div>
      </section>
    );
  }