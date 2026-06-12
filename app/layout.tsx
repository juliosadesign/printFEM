import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrintFEM",
  description:
    "Simulador Web de Resistência para Peças Impressas em 3D usando Método dos Elementos Finitos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}