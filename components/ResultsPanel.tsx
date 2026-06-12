"use client";

import type { FEMSimulationResult } from "@/lib/femSolver";

type ResultsPanelProps = {
  result: FEMSimulationResult | null;
};

export function ResultsPanel({ result }: ResultsPanelProps) {
  if (!result) {
    return (
      <section
        id="resultados"
        className="border-t border-zinc-900 bg-black px-6 py-20 md:px-16 lg:px-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Resultados da simulação
            </p>

            <h2 className="text-3xl font-black text-white md:text-5xl">
              Os resultados aparecerão após a simulação.
            </h2>

            <p className="mt-6 leading-8 text-zinc-400">
              Preencha os dados da peça e clique em “Simular peça” para gerar o
              deslocamento máximo, tensão máxima, fator de segurança, região
              crítica e recomendação automática.
            </p>
          </div>

          <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-900/60 p-10 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-yellow-400/40 bg-yellow-400/10 text-4xl font-black text-yellow-400">
              ∑
            </div>

            <h3 className="text-2xl font-black text-white">
              Nenhum resultado calculado ainda
            </h3>

            <p className="mx-auto mt-3 max-w-2xl leading-7 text-zinc-400">
              O painel será atualizado automaticamente quando o motor de cálculo
              simplificado do Método dos Elementos Finitos for executado.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const statusClasses = getStatusClasses(result.status);

  return (
    <section
      id="resultados"
      className="border-t border-zinc-900 bg-black px-6 py-20 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
            Resultados da simulação
          </p>

          <h2 className="text-3xl font-black text-white md:text-5xl">
            Análise numérica simplificada da peça.
          </h2>

          <p className="mt-6 leading-8 text-zinc-400">
            Os valores abaixo são estimativas didáticas baseadas em conceitos de
            resistência dos materiais e no Método dos Elementos Finitos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ResultCard
            title="Deslocamento máximo"
            value={`${result.maxDisplacement} mm`}
            description="Estimativa de quanto a peça pode se deformar na região mais solicitada."
          />

          <ResultCard
            title="Tensão máxima"
            value={`${result.maxStress} MPa`}
            description="Maior concentração aproximada de tensão encontrada na peça."
          />

          <ResultCard
            title="Fator de segurança"
            value={`${result.safetyFactor}`}
            description="Relação entre a resistência limite do material e a tensão máxima calculada."
          />

          <ResultCard
            title="Região crítica"
            value={result.criticalRegion}
            description="Área da peça com maior chance de concentração de esforço."
            wide
          />

          <div
            className={`rounded-3xl border p-6 shadow-xl shadow-black/30 ${statusClasses.card}`}
          >
            <p className="text-sm font-bold uppercase tracking-[0.25em]">
              Status da peça
            </p>

            <h3 className="mt-4 text-4xl font-black">{result.status}</h3>

            <p className="mt-4 text-sm leading-7">
              {getStatusText(result.status)}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/40 md:p-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Recomendação automática
            </p>

            <h3 className="text-2xl font-black text-white">
              Diagnóstico técnico
            </h3>

            <p className="mt-5 leading-8 text-zinc-300">
              {result.recommendation}
            </p>
          </div>

          <div className="rounded-3xl border border-yellow-400/30 bg-yellow-400/10 p-6 shadow-2xl shadow-black/40 md:p-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Interpretação do resultado
            </p>

            <h3 className="text-2xl font-black text-white">
              Como entender a análise?
            </h3>

            <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-300">
              <p>
                Quanto maior a tensão máxima, maior o risco de falha da peça. A
                tensão representa o esforço interno que surge quando uma força é
                aplicada sobre o material.
              </p>

              <p>
                O fator de segurança indica quantas vezes o material suporta a
                carga antes de atingir seu limite aproximado.
              </p>

              <p>
                O deslocamento máximo mostra a deformação estimada. Mesmo que a
                peça não quebre, um deslocamento muito alto pode prejudicar o
                funcionamento em aplicações como drones, sensores e suportes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultCard({
  title,
  value,
  description,
  wide = false,
}: {
  title: string;
  value: string;
  description: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl shadow-black/30 ${
        wide ? "xl:col-span-2" : ""
      }`}
    >
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
        {title}
      </p>

      <h3 className="mt-4 text-3xl font-black text-white">{value}</h3>

      <p className="mt-4 text-sm leading-7 text-zinc-400">{description}</p>
    </div>
  );
}

function getStatusClasses(status: FEMSimulationResult["status"]) {
  if (status === "Seguro") {
    return {
      card: "border-green-400/40 bg-green-400/10 text-green-300",
    };
  }

  if (status === "Atenção") {
    return {
      card: "border-yellow-400/40 bg-yellow-400/10 text-yellow-300",
    };
  }

  return {
    card: "border-red-400/40 bg-red-400/10 text-red-300",
  };
}

function getStatusText(status: FEMSimulationResult["status"]) {
  if (status === "Seguro") {
    return "A peça apresenta boa margem de segurança para a carga informada nesta simulação.";
  }

  if (status === "Atenção") {
    return "A peça está próxima do limite recomendado e pode precisar de ajustes de espessura, material ou geometria.";
  }

  return "A peça apresenta risco elevado de falha para as condições informadas e precisa ser redesenhada ou reforçada.";
}