export type SimulationFormData = {
    partType: string;
    material: string;
    length: string;
    width: string;
    thickness: string;
    force: string;
    elements: string;
    fixedPoint: string;
    forceDirection: string;
  };
  
  export const initialSimulationData: SimulationFormData = {
    partType: "Suporte em L",
    material: "PLA",
    length: "",
    width: "",
    thickness: "",
    force: "",
    elements: "",
    fixedPoint: "Esquerda",
    forceDirection: "Para baixo",
  };