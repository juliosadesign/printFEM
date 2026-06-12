export function Footer() {
    return (
      <footer className="border-t border-zinc-800 bg-black px-6 py-10 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-black">
              Print<span className="text-yellow-400">FEM</span>
            </p>
  
            <p className="mt-2 text-sm text-zinc-500">
              Projeto acadêmico de Cálculo Numérico Avançado
            </p>
          </div>
  
          <p className="max-w-xl text-sm leading-6 text-zinc-500 md:text-right">
            Simulador educacional para análise simplificada de resistência em
            peças impressas em 3D usando conceitos do Método dos Elementos
            Finitos.
          </p>
        </div>
      </footer>
    );
  }