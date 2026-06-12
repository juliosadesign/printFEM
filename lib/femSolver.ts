import { getMaterialByName } from "@/lib/materials";

export type FEMSimulationInput = {
  partType: string;
  material: string;
  length: number;
  width: number;
  thickness: number;
  force: number;
  elements: number;
  fixedPoint: string;
  forceDirection: string;
};

export type FEMStatus = "Seguro" | "Atenção" | "Crítico";

export type FEMSimulationResult = {
  maxDisplacement: number;
  maxStress: number;
  safetyFactor: number;
  criticalRegion: string;
  status: FEMStatus;
  recommendation: string;
  stressByElement: number[];
};

/*
  IMPORTANTE:
  Este arquivo implementa uma simulação educacional inspirada no Método dos
  Elementos Finitos e em conceitos básicos de resistência dos materiais.

  Ele NÃO substitui um software profissional de engenharia.

  A ideia aqui é aproximar o comportamento da peça usando:
  - área da seção transversal;
  - momento de inércia aproximado;
  - tensão aproximada;
  - deslocamento aproximado;
  - fator de segurança;
  - distribuição simplificada de tensão por elemento.
*/

export function runFEMSimulation(
  input: FEMSimulationInput
): FEMSimulationResult {
  const material = getMaterialByName(input.material);

  if (!material) {
    throw new Error(`Material não encontrado: ${input.material}`);
  }

  const length = Math.max(input.length, 1);
  const width = Math.max(input.width, 1);
  const thickness = Math.max(input.thickness, 1);
  const force = Math.max(input.force, 0.1);
  const elements = Math.max(Math.round(input.elements), 1);

  /*
    Unidades usadas:
    - comprimento, largura e espessura em mm;
    - força em N;
    - módulo de elasticidade em MPa;
    - tensão em MPa.

    Como 1 MPa = 1 N/mm², podemos usar as dimensões em milímetros.
  */

  const area = width * thickness;

  const inertia = (width * Math.pow(thickness, 3)) / 12;

  const c = thickness / 2;

  const geometryFactor = getGeometryFactor(input.partType);

  const forceDirectionFactor = getForceDirectionFactor(input.forceDirection);

  /*
    Momento fletor simplificado:
    M = F * L

    A geometria da peça e a direção da força alteram esse valor por meio de
    fatores didáticos. Isso ajuda a diferenciar os modelos sem tornar o código
    excessivamente complexo.
  */
  const bendingMoment = force * length * geometryFactor * forceDirectionFactor;

  /*
    Tensão aproximada por flexão:
    sigma = M * c / I

    Também somamos uma pequena parcela axial:
    sigma_axial = F / A
  */
  const bendingStress = (bendingMoment * c) / inertia;
  const axialStress = force / area;

  const maxStress = bendingStress + axialStress;

  /*
    Deslocamento aproximado para uma peça semelhante a uma viga em balanço:
    delta = F * L³ / (3 * E * I)

    O fator geométrico aumenta ou reduz a deformação conforme o tipo de peça.
  */
  const maxDisplacement =
    (force * Math.pow(length, 3) * geometryFactor * forceDirectionFactor) /
    (3 * material.elasticModulus * inertia);

  /*
    Fator de segurança:
    FS = tensão limite do material / tensão máxima calculada
  */
  const safetyFactor = material.yieldStrength / maxStress;

  const status = getStatus(safetyFactor);

  const criticalRegion = getCriticalRegion(input.partType, input.fixedPoint);

  const recommendation = getRecommendation({
    status,
    safetyFactor,
    partType: input.partType,
    material: input.material,
    thickness,
    criticalRegion,
  });

  const stressByElement = generateStressByElement({
    elements,
    maxStress,
    fixedPoint: input.fixedPoint,
  });

  return {
    maxDisplacement: roundValue(maxDisplacement, 3),
    maxStress: roundValue(maxStress, 2),
    safetyFactor: roundValue(safetyFactor, 2),
    criticalRegion,
    status,
    recommendation,
    stressByElement,
  };
}

function getGeometryFactor(partType: string) {
  const factors: Record<string, number> = {
    "Suporte em L": 1.45,
    "Barra retangular": 1.0,
    "Placa com furo": 1.35,
    "Suporte de sensor": 1.2,
    "Braço de drone": 1.6,
  };

  return factors[partType] ?? 1;
}

function getForceDirectionFactor(forceDirection: string) {
  const factors: Record<string, number> = {
    "Para baixo": 1.25,
    "Para cima": 1.1,
    Horizontal: 0.85,
  };

  return factors[forceDirection] ?? 1;
}

function getStatus(safetyFactor: number): FEMStatus {
  if (safetyFactor >= 2) {
    return "Seguro";
  }

  if (safetyFactor >= 1) {
    return "Atenção";
  }

  return "Crítico";
}

function getCriticalRegion(partType: string, fixedPoint: string) {
  if (partType === "Suporte em L") {
    return `Canto interno próximo ao apoio ${fixedPoint.toLowerCase()}`;
  }

  if (partType === "Placa com furo") {
    return "Borda do furo central e região próxima ao apoio";
  }

  if (partType === "Braço de drone") {
    return "Centro do braço e extremidade próxima ao motor";
  }

  if (partType === "Suporte de sensor") {
    return "Base da haste vertical e região de fixação";
  }

  return `Região próxima ao apoio ${fixedPoint.toLowerCase()}`;
}

function getRecommendation({
  status,
  safetyFactor,
  partType,
  material,
  thickness,
  criticalRegion,
}: {
  status: FEMStatus;
  safetyFactor: number;
  partType: string;
  material: string;
  thickness: number;
  criticalRegion: string;
}) {
  if (status === "Seguro") {
    return `A peça apresenta comportamento seguro para a carga informada. A região mais sensível é: ${criticalRegion}. Mesmo assim, o fator de segurança de ${roundValue(
      safetyFactor,
      2
    )} indica boa margem para uso didático.`;
  }

  if (status === "Atenção") {
    return `A peça está próxima do limite recomendado. Considere aumentar a espessura acima de ${thickness} mm, reduzir a força aplicada ou trocar o material atual (${material}) por outro mais resistente. A região crítica estimada é: ${criticalRegion}.`;
  }

  if (partType === "Placa com furo") {
    return `A peça está em condição crítica. O furo central aumenta a concentração de tensão. Recomenda-se aumentar a espessura, arredondar melhor as bordas do furo ou usar um material com maior tensão limite.`;
  }

  if (partType === "Braço de drone") {
    return `A peça está em condição crítica. Para braços de drone, recomenda-se usar material mais resistente, aumentar a espessura e evitar regiões muito longas sem reforço estrutural.`;
  }

  return `A peça está em condição crítica. Recomenda-se aumentar a espessura, reduzir a carga aplicada, reforçar a região de apoio ou trocar o material atual (${material}) por um material mais resistente.`;
}

function generateStressByElement({
  elements,
  maxStress,
  fixedPoint,
}: {
  elements: number;
  maxStress: number;
  fixedPoint: string;
}) {
  const values = Array.from({ length: elements }, (_, index) => {
    const normalizedPosition =
      elements === 1 ? 1 : index / Math.max(elements - 1, 1);

    let concentration = normalizedPosition;

    if (fixedPoint === "Esquerda") {
      concentration = 1 - normalizedPosition;
    }

    if (fixedPoint === "Base") {
      concentration = 1 - Math.abs(0.5 - normalizedPosition) * 2;
    }

    const oscillation = Math.sin(index * 1.7) * 0.08;

    const stress = maxStress * (0.35 + concentration * 0.65 + oscillation);

    return roundValue(Math.max(stress, maxStress * 0.2), 2);
  });

  return values;
}

function roundValue(value: number, decimals: number) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}