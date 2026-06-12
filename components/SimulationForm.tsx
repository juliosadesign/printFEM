"use client";

import { useState } from "react";
import { runFEMSimulation, type FEMSimulationResult } from "@/lib/femSolver";
import { getMaterialByName, materials } from "@/lib/materials";
import {
  initialSimulationData,
  type SimulationFormData,
} from "@/lib/simulationTypes";

type SimulationFormProps = {
  onDataChange: (data: SimulationFormData) => void;
  onSimulationComplete: (
    data: SimulationFormData,
    result: FEMSimulationResult
  ) => void;
};

const partTypes = [
  "Suporte em L",
  "Barra retangular",
  "Placa com furo",
  "Suporte de sensor",
  "Braço de drone",
];

const materialOptions = materials.map((material) => material.name);

const fixedPoints = ["Esquerda", "Direita", "Base"];

const forceDirections = ["Para baixo", "Para cima", "Horizontal"];

export function SimulationForm({
  onDataChange,
  onSimulationComplete,
}: SimulationFormProps) {
  const [formData, setFormData] =
    useState<SimulationFormData>(initialSimulationData);

  const [error, setError] = useState("");
  const [submittedData, setSubmittedData] =
    useState<SimulationFormData | null>(null);

  const selectedMaterial = getMaterialByName(formData.material);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const name = event.target.name as keyof SimulationFormData;
    const value = event.target.value;

    setFormData((previousData) => {
      const nextData = {
        ...previousData,
        [name]: value,
      };

      onDataChange(nextData);

      return nextData;
    });
  }

  function validateForm() {
    const numericFields = [
      {
        key: "length",
        label: "Comprimento",
      },
      {
        key: "width",
        label: "Largura",
      },
      {
        key: "thickness",
        label: "Espessura",
      },
      {
        key: "force",
        label: "Força aplicada",
      },
      {
        key: "elements",
        label: "Quantidade de elementos",
      },
    ] as const;

    for (const field of numericFields) {
      const value = formData[field.key];

      if (value.trim() === "") {
        return `O campo "${field.label}" não pode ficar vazio.`;
      }

      const numericValue = Number(value);

      if (Number.isNaN(numericValue)) {
        return `O campo "${field.label}" precisa ser um número válido.`;
      }

      if (numericValue <= 0) {
        return `O campo "${field.label}" precisa ser maior que zero.`;
      }
    }

    if (!Number.isInteger(Number(formData.elements))) {
      return "A quantidade de elementos da malha precisa ser um número inteiro.";
    }

    return "";
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      setSubmittedData(null);
      return;
    }

    const result = runFEMSimulation({
      partType: formData.partType,
      material: formData.material,
      length: Number(formData.length),
      width: Number(formData.width),
      thickness: Number(formData.thickness),
      force: Number(formData.force),
      elements: Number(formData.elements),
      fixedPoint: formData.fixedPoint,
      forceDirection: formData.forceDirection,
    });

    setError("");
    setSubmittedData(formData);
    onSimulationComplete(formData, result);
  }

  return (
    <section
      id="simulacao"
      className="border-t border-zinc-900 bg-zinc-950 px-6 py-20 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
            Configuração da peça
          </p>

          <h2 className="text-3xl font-black text-white md:text-5xl">
            Insira os dados para preparar a simulação.
          </h2>

          <p className="mt-6 leading-8 text-zinc-400">
            Nesta etapa, o usuário informa o tipo da peça, o material, as
            dimensões, a força aplicada e a quantidade de elementos da malha. Em
            seguida, esses dados serão usados para gerar a visualização, a malha,
            o cálculo numérico e o diagnóstico final.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/40 md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <SelectField
                label="Tipo da peça"
                name="partType"
                value={formData.partType}
                options={partTypes}
                onChange={handleChange}
              />

              <SelectField
                label="Material"
                name="material"
                value={formData.material}
                options={materialOptions}
                onChange={handleChange}
              />

              <InputField
                label="Comprimento"
                name="length"
                value={formData.length}
                placeholder="Ex: 120"
                unit="mm"
                onChange={handleChange}
              />

              <InputField
                label="Largura"
                name="width"
                value={formData.width}
                placeholder="Ex: 30"
                unit="mm"
                onChange={handleChange}
              />

              <InputField
                label="Espessura"
                name="thickness"
                value={formData.thickness}
                placeholder="Ex: 5"
                unit="mm"
                onChange={handleChange}
              />

              <InputField
                label="Força aplicada"
                name="force"
                value={formData.force}
                placeholder="Ex: 40"
                unit="N"
                onChange={handleChange}
              />

              <InputField
                label="Quantidade de elementos"
                name="elements"
                value={formData.elements}
                placeholder="Ex: 12"
                unit="elementos"
                onChange={handleChange}
              />

              <SelectField
                label="Ponto de fixação"
                name="fixedPoint"
                value={formData.fixedPoint}
                options={fixedPoints}
                onChange={handleChange}
              />

              <div className="md:col-span-2">
                <SelectField
                  label="Direção da força"
                  name="forceDirection"
                  value={formData.forceDirection}
                  options={forceDirections}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="mt-8 w-full rounded-2xl bg-yellow-400 px-6 py-4 text-base font-black text-black shadow-lg shadow-yellow-400/20 transition hover:-translate-y-1 hover:bg-yellow-300"
            >
              Simular peça
            </button>
          </form>

          <aside className="rounded-3xl border border-zinc-800 bg-black/50 p-6 shadow-2xl shadow-black/40 md:p-8">
            <div className="mb-6">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
                Resumo
              </p>

              <h3 className="text-2xl font-black text-white">
                Dados da simulação
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Depois de clicar em simular, os dados serão enviados para a peça
                3D, a malha, o painel de resultados, o mapa de tensão e o
                diagnóstico empresarial.
              </p>
            </div>

            {selectedMaterial && (
              <div className="mb-6 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-400">
                      Material selecionado
                    </p>

                    <h4 className="mt-2 text-2xl font-black text-white">
                      {selectedMaterial.name}
                    </h4>
                  </div>

                  <div className="rounded-xl bg-yellow-400 px-3 py-2 text-sm font-black text-black">
                    {selectedMaterial.elasticModulus} MPa
                  </div>
                </div>

                <p className="text-sm leading-7 text-zinc-300">
                  {selectedMaterial.description}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <MaterialMiniCard
                    label="Módulo E"
                    value={`${selectedMaterial.elasticModulus} MPa`}
                  />

                  <MaterialMiniCard
                    label="Tensão limite"
                    value={`${selectedMaterial.yieldStrength} MPa`}
                  />

                  <MaterialMiniCard
                    label="Densidade"
                    value={`${selectedMaterial.density} g/cm³`}
                  />
                </div>

                <div className="mt-4 rounded-xl border border-zinc-700 bg-black/40 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
                    Recomendação
                  </p>

                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {selectedMaterial.recommendation}
                  </p>
                </div>
              </div>
            )}

            {submittedData ? (
              <div className="space-y-3">
                <SummaryItem
                  label="Tipo da peça"
                  value={submittedData.partType}
                />
                <SummaryItem label="Material" value={submittedData.material} />
                <SummaryItem
                  label="Comprimento"
                  value={`${submittedData.length} mm`}
                />
                <SummaryItem
                  label="Largura"
                  value={`${submittedData.width} mm`}
                />
                <SummaryItem
                  label="Espessura"
                  value={`${submittedData.thickness} mm`}
                />
                <SummaryItem
                  label="Força aplicada"
                  value={`${submittedData.force} N`}
                />
                <SummaryItem
                  label="Elementos da malha"
                  value={submittedData.elements}
                />
                <SummaryItem
                  label="Ponto de fixação"
                  value={submittedData.fixedPoint}
                />
                <SummaryItem
                  label="Direção da força"
                  value={submittedData.forceDirection}
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/60 p-6 text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-2xl border border-yellow-400/40 bg-yellow-400/10 text-3xl leading-[64px] text-yellow-400">
                  +
                </div>

                <p className="font-semibold text-zinc-300">
                  Nenhuma simulação configurada ainda.
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Preencha os campos ao lado para gerar o primeiro resumo da
                  análise.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: keyof SimulationFormData;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

type InputFieldProps = FieldProps & {
  placeholder: string;
  unit: string;
};

function InputField({
  label,
  name,
  value,
  placeholder,
  unit,
  onChange,
}: InputFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-zinc-200">{label}</span>

      <div className="flex overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800 transition focus-within:border-yellow-400">
        <input
          type="number"
          min="0"
          step="any"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full bg-transparent px-4 py-3 text-white outline-none placeholder:text-zinc-500"
        />

        <span className="flex items-center border-l border-zinc-700 bg-zinc-900 px-4 text-sm font-bold text-yellow-400">
          {unit}
        </span>
      </div>
    </label>
  );
}

type SelectFieldProps = FieldProps & {
  options: string[];
};

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-zinc-200">{label}</span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-yellow-400"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-zinc-900">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
      <span className="text-sm text-zinc-400">{label}</span>
      <span className="text-right text-sm font-bold text-white">{value}</span>
    </div>
  );
}

function MaterialMiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 font-black text-white">{value}</p>
    </div>
  );
}