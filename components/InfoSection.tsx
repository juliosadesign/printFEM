export function InfoSection() {
    return (
      <section id="sobre" className="px-6 py-20 md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Método dos Elementos Finitos
            </p>
  
            <h2 className="text-3xl font-black text-white md:text-5xl">
              A peça é dividida em pequenas partes para prever seu comportamento.
            </h2>
  
            <p className="mt-6 leading-8 text-zinc-400">
              O Método dos Elementos Finitos, conhecido como MEF, é uma técnica
              numérica usada para analisar estruturas complexas. Em vez de tentar
              calcular uma peça inteira de uma só vez, o sistema divide a geometria
              em pequenos elementos e estima como cada região reage à força
              aplicada.
            </p>
          </div>
  
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-4 h-12 w-12 rounded-xl bg-yellow-400 text-center text-2xl font-black leading-[48px] text-black">
                1
              </div>
              <h3 className="text-xl font-bold text-white">Entrada de dados</h3>
              <p className="mt-3 text-zinc-400">
                O usuário informa material, dimensões, força aplicada e quantidade
                de elementos.
              </p>
            </div>
  
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-4 h-12 w-12 rounded-xl bg-yellow-400 text-center text-2xl font-black leading-[48px] text-black">
                2
              </div>
              <h3 className="text-xl font-bold text-white">Geração da malha</h3>
              <p className="mt-3 text-zinc-400">
                A peça é representada por uma malha simplificada com nós e
                elementos.
              </p>
            </div>
  
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-4 h-12 w-12 rounded-xl bg-yellow-400 text-center text-2xl font-black leading-[48px] text-black">
                3
              </div>
              <h3 className="text-xl font-bold text-white">Resultado técnico</h3>
              <p className="mt-3 text-zinc-400">
                O sistema apresenta tensão, deslocamento, região crítica e uma
                recomendação automática.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }