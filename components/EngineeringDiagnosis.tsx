"use client";

import type { FEMSimulationResult } from "@/lib/femSolver";

type EngineeringDiagnosisProps = {
  result: FEMSimulationResult | null;
};

export function EngineeringDiagnosis({ result }: EngineeringDiagnosisProps) {
  if (!result) {
    return null;
  }

  const safetyMessage = getSafetyMessage(result.status);
  const improvementMessage = getImprovementMessage(result);
  const materialMessage = getMaterialMessage(result.status);
  const thicknessMessage = getThicknessMessage(result.status);
  const forceMessage = getForceMessage(result.status);
  const academicMessage = getAcademicMessage(result);

  return (
    <section className="mt-8 rounded-3xl border border-yellow-400/30 bg-zinc-900 p-6 shadow-2xl shadow-black/40 md:p-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
            Diagnóstico empresarial
          </p>

          <h3 className="text-2xl font-black text-white md:text-3xl">
            Recomendação técnica para tomada de decisão.
          </h3>

          <p className="mt-4 leading-8 text-zinc-400">
            Este relatório resume a condição da peça simulada e apresenta
            recomendações práticas para uma empresa de tecnologia decidir se a
            peça pode ser usada, reforçada, redesenhada ou fabricada com outro
            material.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-black/40 p-5">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
            Status geral
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <StatusBadge status={result.status} />

            <div>
              <p className="text-sm text-zinc-500">Fator de segurança</p>
              <p className="text-2xl font-black text-white">
                {result.safetyFactor}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-zinc-300">
            {safetyMessage}
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <DiagnosisCard
          icon="✓"
          title="Uso da peça"
          text={safetyMessage}
          status={result.status}
        />

        <DiagnosisCard
          icon="⚠"
          title="Região que merece atenção"
          text={`A região que merece maior atenção é: ${result.criticalRegion}. Essa área concentra maior esforço e deve ser analisada antes da fabricação.`}
          status="Atenção"
        />

        <DiagnosisCard
          icon="↗"
          title="Melhoria recomendada"
          text={improvementMessage}
          status={result.status}
        />

        <DiagnosisCard
          icon="M"
          title="Troca de material"
          text={materialMessage}
          status={result.status}
        />

        <DiagnosisCard
          icon="+"
          title="Aumento de espessura"
          text={thicknessMessage}
          status={result.status}
        />

        <DiagnosisCard
          icon="F"
          title="Redução da força aplicada"
          text={forceMessage}
          status={result.status}
        />
      </div>

      <div className="mt-8 rounded-3xl border border-zinc-700 bg-black/40 p-6 md:p-8">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
          Explicação para apresentação acadêmica
        </p>

        <h4 className="text-2xl font-black text-white">
          Como explicar este resultado?
        </h4>

        <p className="mt-5 leading-8 text-zinc-300">
          {academicMessage}
        </p>
      </div>
    </section>
  );
}

function DiagnosisCard({
  icon,
  title,
  text,
  status,
}: {
  icon: string;
  title: string;
  text: string;
  status: FEMSimulationResult["status"];
}) {
  return (
    <article className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl shadow-black/30 transition hover:-translate-y-1 hover:border-yellow-400/50">
      <div className="mb-5 flex items-center gap-4">
        <div className={getIconClass(status)}>
          {icon}
        </div>

        <h4 className="text-lg font-black text-white">
          {title}
        </h4>
      </div>

      <p className="text-sm leading-7 text-zinc-400">
        {text}
      </p>
    </article>
  );
}

function StatusBadge({ status }: { status: FEMSimulationResult["status"] }) {
  const className =
    status === "Seguro"
      ? "border-green-400/40 bg-green-400/10 text-green-300"
      : status === "Atenção"
      ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-300"
      : "border-red-400/40 bg-red-400/10 text-red-300";

  return (
    <span
      className={`rounded-full border px-5 py-3 text-sm font-black uppercase tracking-[0.2em] ${className}`}
    >
      {status}
    </span>
  );
}

function getIconClass(status: FEMSimulationResult["status"]) {
  if (status === "Seguro") {
    return "flex h-12 w-12 items-center justify-center rounded-2xl border border-green-400/40 bg-green-400/10 text-xl font-black text-green-300";
  }

  if (status === "Atenção") {
    return "flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/40 bg-yellow-400/10 text-xl font-black text-yellow-300";
  }

  return "flex h-12 w-12 items-center justify-center rounded-2xl border border-red-400/40 bg-red-400/10 text-xl font-black text-red-300";
}

function getSafetyMessage(status: FEMSimulationResult["status"]) {
  if (status === "Seguro") {
    return "A peça apresenta comportamento seguro para a carga informada. Ela pode ser considerada viável para prototipagem e testes iniciais dentro das condições simuladas.";
  }

  if (status === "Atenção") {
    return "A peça pode funcionar, mas está próxima do limite recomendado. Antes da fabricação final, é indicado revisar espessura, geometria, material ou carga aplicada.";
  }

  return "A peça apresenta condição crítica para a carga informada. Não é recomendado utilizar essa configuração sem reforço, troca de material ou alteração no projeto.";
}

function getImprovementMessage(result: FEMSimulationResult) {
  if (result.status === "Seguro") {
    return "A melhoria principal seria otimizar o uso de material, mantendo a resistência e reduzindo peso ou tempo de impressão.";
  }

  if (result.status === "Atenção") {
    return "Recomenda-se aumentar a espessura da peça, reforçar a região crítica ou suavizar cantos e furos para reduzir a concentração de tensão.";
  }

  return "Recomenda-se redesenhar a peça, reforçar a região crítica, aumentar a espessura e evitar geometrias com cantos muito fechados ou áreas frágeis.";
}

function getMaterialMessage(status: FEMSimulationResult["status"]) {
  if (status === "Seguro") {
    return "A troca de material não é obrigatória, mas pode ser considerada caso a peça seja usada em ambiente com impacto, vibração ou esforço contínuo.";
  }

  if (status === "Atenção") {
    return "Vale considerar um material mais resistente. Para protótipos funcionais, PETG, Nylon ou Alumínio podem ser mais adequados que materiais muito frágeis.";
  }

  return "A troca de material é altamente recomendada. Materiais com maior tensão limite e maior rigidez podem reduzir o risco de falha estrutural.";
}

function getThicknessMessage(status: FEMSimulationResult["status"]) {
  if (status === "Seguro") {
    return "O aumento de espessura não é necessário para a carga atual, mas pode ser usado como margem extra de segurança.";
  }

  if (status === "Atenção") {
    return "Aumentar a espessura é uma das soluções mais diretas para reduzir deslocamento e tensão máxima na peça.";
  }

  return "Aumentar a espessura é essencial nesta configuração, pois ajuda a elevar o momento de inércia e reduzir a deformação.";
}

function getForceMessage(status: FEMSimulationResult["status"]) {
  if (status === "Seguro") {
    return "A força aplicada está dentro de uma faixa aceitável para esta simulação. Não há necessidade imediata de redução.";
  }

  if (status === "Atenção") {
    return "Reduzir a força aplicada pode ajudar a manter a peça dentro de uma faixa mais segura de funcionamento.";
  }

  return "A redução da força aplicada é recomendada, pois a carga atual gera tensão elevada e aumenta o risco de falha.";
}

function getAcademicMessage(result: FEMSimulationResult) {
  return `Na apresentação, este resultado pode ser explicado dizendo que a aplicação usa uma aproximação inspirada no Método dos Elementos Finitos. A peça é dividida em elementos, a tensão é estimada em cada região e o sistema identifica a área mais crítica. Neste caso, a tensão máxima estimada foi de ${result.maxStress} MPa, o deslocamento máximo foi de ${result.maxDisplacement} mm e o fator de segurança foi ${result.safetyFactor}. Com base nesses valores, o sistema classificou a peça como "${result.status}".`;
}