"use client";

type PartVisualizerData = {
  partType: string;
  material: string;
  fixedPoint: string;
  forceDirection: string;
};

type PartVisualizerProps = {
  data: PartVisualizerData | null;
};

export function PartVisualizer({ data }: PartVisualizerProps) {
  const partType = data?.partType ?? "Suporte em L";
  const material = data?.material ?? "PLA";
  const fixedPoint = data?.fixedPoint ?? "Esquerda";
  const forceDirection = data?.forceDirection ?? "Para baixo";

  const supportPosition = getSupportPosition(fixedPoint);
  const forcePosition = getForcePosition(forceDirection);
  const criticalPosition = getCriticalPosition(partType, fixedPoint);

  return (
    <section className="border-t border-zinc-900 bg-black px-6 py-20 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
            Visualização da peça
          </p>

          <h2 className="text-3xl font-black text-white md:text-5xl">
            Representação técnica da peça analisada.
          </h2>

          <p className="mt-6 leading-8 text-zinc-400">
            A visualização abaixo representa a peça selecionada, a região de
            apoio e a força aplicada. O objetivo é deixar o processo do Método
            dos Elementos Finitos mais didático e visual.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl shadow-black/60 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,204,21,0.14),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(113,113,122,0.22),_transparent_36%)]" />

            <svg
              viewBox="0 0 720 460"
              className="relative z-10 h-full min-h-[450px] w-full"
              role="img"
              aria-label="Visualização técnica da peça"
            >
              <defs>
                <linearGradient id="metalMain" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e4e4e7" />
                  <stop offset="45%" stopColor="#71717a" />
                  <stop offset="100%" stopColor="#18181b" />
                </linearGradient>

                <linearGradient id="metalSide" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a1a1aa" />
                  <stop offset="100%" stopColor="#27272a" />
                </linearGradient>

                <filter id="partShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow
                    dx="10"
                    dy="18"
                    stdDeviation="12"
                    floodColor="#000000"
                    floodOpacity="0.65"
                  />
                </filter>

                <filter id="yellowGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="6"
                    floodColor="#facc15"
                    floodOpacity="0.8"
                  />
                </filter>

                <marker
                  id="arrowHead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="5"
                  refY="5"
                  orient="auto"
                >
                  <path d="M0 0 L10 5 L0 10 Z" fill="#facc15" />
                </marker>
              </defs>

              <ellipse
                cx="360"
                cy="360"
                rx="220"
                ry="36"
                fill="#000000"
                opacity="0.55"
              />

              <g filter="url(#partShadow)">
                <PartShape partType={partType} />
              </g>

              <SupportMarker
                x={supportPosition.x}
                y={supportPosition.y}
                label={fixedPoint}
              />

              <ForceArrow
                x1={forcePosition.x1}
                y1={forcePosition.y1}
                x2={forcePosition.x2}
                y2={forcePosition.y2}
                labelX={forcePosition.labelX}
                labelY={forcePosition.labelY}
              />

              <CriticalPoint
                x={criticalPosition.x}
                y={criticalPosition.y}
              />
            </svg>
          </div>

          <aside className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/40 md:p-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Dados visuais
            </p>

            <h3 className="text-2xl font-black text-white">
              Peça configurada
            </h3>

            <div className="mt-6 space-y-3">
              <InfoItem label="Tipo da peça" value={partType} />
              <InfoItem label="Material" value={material} />
              <InfoItem label="Ponto de fixação" value={fixedPoint} />
              <InfoItem label="Direção da força" value={forceDirection} />
            </div>

            <div className="mt-8 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
                Interpretação
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-300">
                A peça em cinza representa o objeto físico que será analisado. A
                seta amarela representa a força aplicada. A marcação de apoio
                indica a região de fixação, onde geralmente ocorre concentração
                de tensão.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-800 bg-black/40 p-5">
              <p className="text-sm font-bold text-white">
                Próxima etapa do projeto
              </p>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                Depois desta visualização, a aplicação gera a malha de elementos
                finitos e calcula os resultados aproximados da peça.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function PartShape({ partType }: { partType: string }) {
  if (partType === "Barra retangular") {
    return (
      <g>
        <path d="M160 225 H545 L590 260 H205 Z" fill="url(#metalSide)" />
        <rect
          x="150"
          y="185"
          width="400"
          height="80"
          rx="18"
          fill="url(#metalMain)"
          stroke="#a1a1aa"
          strokeWidth="2"
        />
        <path d="M550 185 L590 220 V260 L550 265 Z" fill="#3f3f46" />
        <circle cx="230" cy="225" r="8" fill="#facc15" />
        <circle cx="470" cy="225" r="8" fill="#facc15" />
      </g>
    );
  }

  if (partType === "Placa com furo") {
    return (
      <g>
        <path d="M210 105 H510 L560 150 V330 H250 L210 285 Z" fill="url(#metalSide)" />
        <rect
          x="180"
          y="95"
          width="330"
          height="230"
          rx="26"
          fill="url(#metalMain)"
          stroke="#a1a1aa"
          strokeWidth="2"
        />
        <circle cx="345" cy="210" r="54" fill="#050505" stroke="#facc15" strokeWidth="4" />
        <circle cx="235" cy="145" r="7" fill="#facc15" />
        <circle cx="455" cy="145" r="7" fill="#facc15" />
        <circle cx="235" cy="275" r="7" fill="#facc15" />
        <circle cx="455" cy="275" r="7" fill="#facc15" />
      </g>
    );
  }

  if (partType === "Suporte de sensor") {
    return (
      <g>
        <path d="M170 270 H505 L550 305 H215 Z" fill="url(#metalSide)" />
        <rect
          x="150"
          y="230"
          width="360"
          height="85"
          rx="18"
          fill="url(#metalMain)"
          stroke="#a1a1aa"
          strokeWidth="2"
        />

        <path d="M320 120 H410 L435 150 V235 H345 L320 205 Z" fill="#3f3f46" />
        <rect
          x="285"
          y="115"
          width="105"
          height="130"
          rx="18"
          fill="url(#metalMain)"
          stroke="#a1a1aa"
          strokeWidth="2"
        />

        <rect
          x="260"
          y="80"
          width="165"
          height="55"
          rx="14"
          fill="url(#metalSide)"
          stroke="#a1a1aa"
          strokeWidth="2"
        />

        <circle cx="220" cy="275" r="8" fill="#facc15" />
        <circle cx="440" cy="275" r="8" fill="#facc15" />
      </g>
    );
  }

  if (partType === "Braço de drone") {
    return (
      <g>
        <rect
          x="170"
          y="185"
          width="380"
          height="70"
          rx="35"
          fill="url(#metalMain)"
          stroke="#a1a1aa"
          strokeWidth="2"
        />

        <circle
          cx="170"
          cy="220"
          r="70"
          fill="url(#metalSide)"
          stroke="#a1a1aa"
          strokeWidth="2"
        />

        <circle
          cx="550"
          cy="220"
          r="70"
          fill="url(#metalSide)"
          stroke="#a1a1aa"
          strokeWidth="2"
        />

        <circle cx="170" cy="220" r="32" fill="#050505" stroke="#facc15" strokeWidth="4" />
        <circle cx="550" cy="220" r="32" fill="#050505" stroke="#facc15" strokeWidth="4" />
      </g>
    );
  }

  return (
    <g>
      <path d="M170 275 H520 L565 315 H215 Z" fill="url(#metalSide)" />
      <rect
        x="150"
        y="235"
        width="370"
        height="80"
        rx="18"
        fill="url(#metalMain)"
        stroke="#a1a1aa"
        strokeWidth="2"
      />

      <path d="M170 120 H260 L300 160 V315 H210 L170 275 Z" fill="url(#metalSide)" />
      <rect
        x="145"
        y="110"
        width="105"
        height="205"
        rx="18"
        fill="url(#metalMain)"
        stroke="#a1a1aa"
        strokeWidth="2"
      />

      <circle cx="220" cy="275" r="8" fill="#facc15" />
      <circle cx="420" cy="275" r="8" fill="#facc15" />
    </g>
  );
}

function ForceArrow({
  x1,
  y1,
  x2,
  y2,
  labelX,
  labelY,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  labelX: number;
  labelY: number;
}) {
  return (
    <g filter="url(#yellowGlow)">
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#facc15"
        strokeWidth="8"
        strokeLinecap="round"
        markerEnd="url(#arrowHead)"
      />

      <rect
        x={labelX - 42}
        y={labelY - 18}
        width="84"
        height="30"
        rx="15"
        fill="#050505"
        stroke="#facc15"
        strokeWidth="2"
      />

      <text
        x={labelX}
        y={labelY + 3}
        fill="#facc15"
        fontSize="13"
        fontWeight="900"
        textAnchor="middle"
      >
        FORÇA
      </text>
    </g>
  );
}

function SupportMarker({
  x,
  y,
  label,
}: {
  x: number;
  y: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x - 55}
        y={y - 25}
        width="110"
        height="58"
        rx="14"
        fill="rgba(250,204,21,0.12)"
        stroke="#facc15"
        strokeWidth="2"
      />

      <text
        x={x}
        y={y - 2}
        fill="#facc15"
        fontSize="14"
        fontWeight="900"
        textAnchor="middle"
        letterSpacing="3"
      >
        APOIO
      </text>

      <text
        x={x}
        y={y + 20}
        fill="#ffffff"
        fontSize="13"
        fontWeight="700"
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
}

function CriticalPoint({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="16" fill="#ef4444" opacity="0.9" />
      <circle
        cx={x}
        cy={y}
        r="28"
        fill="none"
        stroke="#ef4444"
        strokeWidth="3"
        strokeDasharray="7 7"
      />
    </g>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-black/40 px-4 py-3">
      <span className="text-sm text-zinc-400">{label}</span>
      <span className="text-right text-sm font-bold text-white">{value}</span>
    </div>
  );
}

function getSupportPosition(fixedPoint: string) {
  if (fixedPoint === "Direita") {
    return { x: 555, y: 360 };
  }

  if (fixedPoint === "Base") {
    return { x: 360, y: 370 };
  }

  return { x: 165, y: 360 };
}

function getForcePosition(forceDirection: string) {
  if (forceDirection === "Para cima") {
    return {
      x1: 500,
      y1: 240,
      x2: 500,
      y2: 120,
      labelX: 500,
      labelY: 270,
    };
  }

  if (forceDirection === "Horizontal") {
    return {
      x1: 560,
      y1: 170,
      x2: 430,
      y2: 170,
      labelX: 590,
      labelY: 170,
    };
  }

  return {
    x1: 500,
    y1: 90,
    x2: 500,
    y2: 220,
    labelX: 500,
    labelY: 65,
  };
}

function getCriticalPosition(partType: string, fixedPoint: string) {
  if (partType === "Placa com furo") {
    return { x: 345, y: 210 };
  }

  if (partType === "Braço de drone") {
    if (fixedPoint === "Direita") {
      return { x: 480, y: 220 };
    }

    if (fixedPoint === "Base") {
      return { x: 360, y: 220 };
    }

    return { x: 240, y: 220 };
  }

  if (partType === "Suporte de sensor") {
    return { x: 335, y: 245 };
  }

  if (partType === "Barra retangular") {
    if (fixedPoint === "Direita") {
      return { x: 500, y: 225 };
    }

    return { x: 210, y: 225 };
  }

  return { x: 250, y: 235 };
}