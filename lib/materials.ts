export type Material = {
    name: string;
    elasticModulus: number;
    yieldStrength: number;
    density: number;
    description: string;
    recommendation: string;
  };
  
  export const materials: Material[] = [
    {
      name: "PLA",
      elasticModulus: 3500,
      yieldStrength: 60,
      density: 1.24,
      description:
        "Material rígido, fácil de imprimir e muito usado em protótipos visuais e peças simples.",
      recommendation:
        "Indicado para protótipos rígidos, peças de baixa carga e modelos de validação rápida.",
    },
    {
      name: "PETG",
      elasticModulus: 2100,
      yieldStrength: 50,
      density: 1.27,
      description:
        "Material com boa resistência ao impacto, maior flexibilidade que o PLA e boa durabilidade.",
      recommendation:
        "Indicado para peças funcionais, suportes e componentes que precisam resistir melhor a impactos.",
    },
    {
      name: "ABS",
      elasticModulus: 2000,
      yieldStrength: 40,
      density: 1.04,
      description:
        "Material técnico, resistente ao calor e usado em peças que exigem maior durabilidade.",
      recommendation:
        "Indicado para peças técnicas, carcaças, suportes e componentes expostos a temperaturas maiores.",
    },
    {
      name: "Nylon",
      elasticModulus: 1700,
      yieldStrength: 70,
      density: 1.15,
      description:
        "Material resistente, flexível e adequado para peças submetidas a esforço contínuo.",
      recommendation:
        "Indicado para peças mecânicas, encaixes, articulações e componentes que precisam de resistência e flexibilidade.",
    },
    {
      name: "Alumínio",
      elasticModulus: 69000,
      yieldStrength: 250,
      density: 2.7,
      description:
        "Material metálico leve, rígido e muito usado em aplicações estruturais e de engenharia.",
      recommendation:
        "Indicado para peças estruturais leves, suportes metálicos, drones, robótica e aplicações com maior carga.",
    },
  ];
  
  export function getMaterialByName(name: string) {
    return materials.find((material) => material.name === name);
  }