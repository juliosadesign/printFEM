const menuItems = [
  {
    label: "Início",
    href: "#inicio",
  },
  {
    label: "Simulação",
    href: "#simulacao",
  },
  {
    label: "Resultados",
    href: "#resultados",
  },
  {
    label: "Sobre",
    href: "#sobre",
  },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-yellow-400/10 bg-black/80 px-6 py-4 backdrop-blur-xl md:px-16 lg:px-24">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-400/40 bg-yellow-400/10 text-sm font-black text-yellow-400 shadow-lg shadow-yellow-400/10">
            PF
          </div>

          <span className="text-2xl font-black tracking-tight">
            Print<span className="text-yellow-400">FEM</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-sm font-medium text-zinc-300 transition hover:text-yellow-400"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#simulacao"
          className="yellow-glow rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-black text-black transition hover:-translate-y-0.5 hover:bg-yellow-300"
        >
          Começar
        </a>
      </nav>
    </header>
  );
}