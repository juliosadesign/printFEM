"use client";

import { useMemo, useState } from "react";

type MeshVisualizerData = {
  partType: string;
  elements: string;
  fixedPoint: string;
  forceDirection: string;
};

type MeshVisualizerProps = {
  data: MeshVisualizerData | null;
};

type ViewMode = "part" | "mesh" | "result";

export function MeshVisualizer({ data }: MeshVisualizerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("mesh");

  const partType = data?.partType ?? "Suporte em L";
  const fixedPoint = data?.fixedPoint ?? "Esquerda";
  const forceDirection = data?.forceDirection ?? "Para baixo";

  const elementCount = Number(data?.elements) > 0 ? Number(data?.elements) : 12;

  const meshConfig = useMemo(() => {
    const columns = Math.min(18, Math.max(4, Math.round(Math.sqrt(elementCount * 2))));
    const rows = Math.min(10, Math.max(3, Math.round(elementCount / columns) + 2));

    return {
      columns,
      rows,
    };
  }, [elementCount]);

  return (
    <section className="border-t border-zinc-900 bg-zinc-950 px-6 py-20 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
            Malha de elementos finitos
          </p>

          <h2 className="text-3xl font-black text-white md:text-5xl">
            Divisão da peça em pequenos elementos.
          </h2>

          <p className="mt-6 leading-8 text-zinc-400">
            A peça é dividida em pequenos elementos para que o comportamento
            mecânico seja aproximado numericamente. Cada região da malha ajuda a
            estimar como a força aplicada influencia tensão, deformação e pontos
            críticos.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-black p-6 shadow-2xl shadow-black/60 md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,204,21,0.14),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(113,113,122,0.22),_transparent_36%)]" />

            <div className="relative mb-6 flex flex-wrap gap-3">
              <ViewButton
                active={viewMode === "part"}
                onClick={() => setViewMode("part")}
              >
                Ver peça
              </ViewButton>

              <ViewButton
                active={viewMode === "mesh"}
                onClick={() => setViewMode("mesh")}
              >
                Ver malha
              </ViewButton>

              <ViewButton
                active={viewMode === "result"}
                onClick={() => setViewMode("result")}
              >
                Ver resultado
              </ViewButton>
            </div>

            <div className="relative flex min-h-[500px] items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-950/80 p-4">
              <div className="absolute bottom-16 h-12 w-80 rounded-full bg-black/80 blur-xl" />

              <ForceArrow direction={forceDirection} />
              <SupportMarker fixedPoint={fixedPoint} />

              <svg
                viewBox="0 0 700 430"
                className="relative z-10 h-full w-full max-w-[760px]"
                role="img"
                aria-label="Visualização da malha de elementos finitos"
              >
                <defs>
                  <linearGradient id="partGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#d4d4d8" />
                    <stop offset="45%" stopColor="#71717a" />
                    <stop offset="100%" stopColor="#18181b" />
                  </linearGradient>

                  <linearGradient id="stressGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#71717a" />
                    <stop offset="45%" stopColor="#facc15" />
                    <stop offset="75%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>

                  <clipPath id="partClip">
                    <PartShape partType={partType} />
                  </clipPath>

                  <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow
                      dx="12"
                      dy="18"
                      stdDeviation="12"
                      floodColor="#000000"
                      floodOpacity="0.65"
                    />
                  </filter>
                </defs>

                {viewMode === "result" && (
                  <g clipPath="url(#partClip)" filter="url(#softShadow)">
                    <ResultCells
                      columns={meshConfig.columns}
                      rows={meshConfig.rows}
                    />
                  </g>
                )}

                {viewMode !== "result" && (
                  <g filter="url(#softShadow)">
                    <PartShape partType={partType} fill="url(#partGradient)" />
                  </g>
                )}

                {viewMode === "part" && (
                  <g>
                    <PartHighlights partType={partType} />
                  </g>
                )}

                {(viewMode === "mesh" || viewMode === "result") && (
                  <g clipPath="url(#partClip)">
                    <MeshLines
                      columns={meshConfig.columns}
                      rows={meshConfig.rows}
                    />
                    <MeshNodes
                      columns={meshConfig.columns}
                      rows={meshConfig.rows}
                    />
                  </g>
                )}

                <PartOutline partType={partType} />

                {viewMode === "result" && (
  <CriticalRegion
    partType={partType}
    fixedPoint={fixedPoint}
    forceDirection={forceDirection}
  />
)}
              </svg>
            </div>
          </div>

          <aside className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/40 md:p-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Informações da malha
            </p>

            <h3 className="text-2xl font-black text-white">
              Configuração FEM
            </h3>

            <div className="mt-6 space-y-3">
              <InfoItem label="Peça analisada" value={partType} />
              <InfoItem label="Elementos informados" value={`${elementCount}`} />
              <InfoItem label="Divisões horizontais" value={`${meshConfig.columns}`} />
              <InfoItem label="Divisões verticais" value={`${meshConfig.rows}`} />
              <InfoItem label="Ponto de fixação" value={fixedPoint} />
              <InfoItem label="Força aplicada" value={forceDirection} />
            </div>

            <div className="mt-8 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
                Explicação
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-300">
                A malha representa a divisão da peça em partes menores. No MEF,
                cada elemento contribui para aproximar numericamente o
                comportamento da estrutura quando uma carga é aplicada.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-800 bg-black/40 p-5">
              <p className="text-sm font-bold text-white">Legenda</p>

              <div className="mt-4 space-y-3">
                <LegendItem color="bg-yellow-400" label="Nós" />
                <LegendItem color="bg-zinc-300" label="Elementos" />
                <LegendItem color="bg-yellow-400/30" label="Região fixa" />
                <LegendItem color="bg-yellow-400" label="Força aplicada" />
                <LegendItem color="bg-red-500" label="Região crítica futura" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function PartShape({
  partType,
  fill = "#71717a",
}: {
  partType: string;
  fill?: string;
}) {
  if (partType === "Suporte em L") {
    return (
      <path
        d="M160 95 H300 V245 H520 V335 H160 Z"
        fill={fill}
        stroke="none"
      />
    );
  }

  if (partType === "Barra retangular") {
    return <rect x="110" y="165" width="480" height="100" rx="24" fill={fill} />;
  }

  if (partType === "Placa com furo") {
    return (
      <path
        d="M190 90 H510 Q540 90 540 120 V310 Q540 340 510 340 H190 Q160 340 160 310 V120 Q160 90 190 90 Z
           M350 170
           A55 55 0 1 0 350 280
           A55 55 0 1 0 350 170"
        fill={fill}
        fillRule="evenodd"
      />
    );
  }

  if (partType === "Suporte de sensor") {
    return (
      <path
        d="M150 260 H550 V340 H150 Z
           M300 120 H400 V260 H300 Z
           M265 85 H435 V140 H265 Z"
        fill={fill}
        fillRule="evenodd"
      />
    );
  }

  return (
    <path
      d="M120 180
         Q120 145 155 145
         H545
         Q580 145 580 180
         Q580 215 545 215
         H155
         Q120 215 120 180
         Z
         M90 180
         A70 70 0 1 0 230 180
         A70 70 0 1 0 90 180
         M470 180
         A70 70 0 1 0 610 180
         A70 70 0 1 0 470 180"
      fill={fill}
      fillRule="evenodd"
    />
  );
}

function PartOutline({ partType }: { partType: string }) {
  return (
    <PartShape
      partType={partType}
      fill="transparent"
    />
  );
}

function PartHighlights({ partType }: { partType: string }) {
  if (partType === "Placa com furo") {
    return (
      <circle
        cx="350"
        cy="225"
        r="60"
        fill="transparent"
        stroke="#facc15"
        strokeWidth="5"
        strokeDasharray="10 8"
      />
    );
  }

  if (partType === "Braço de drone") {
    return (
      <>
        <circle
          cx="160"
          cy="180"
          r="38"
          fill="transparent"
          stroke="#facc15"
          strokeWidth="5"
          strokeDasharray="10 8"
        />
        <circle
          cx="540"
          cy="180"
          r="38"
          fill="transparent"
          stroke="#facc15"
          strokeWidth="5"
          strokeDasharray="10 8"
        />
      </>
    );
  }

  return (
    <circle
      cx="350"
      cy="215"
      r="32"
      fill="#facc15"
      opacity="0.25"
      stroke="#facc15"
      strokeWidth="4"
    />
  );
}

function MeshLines({
  columns,
  rows,
}: {
  columns: number;
  rows: number;
}) {
  const xStart = 90;
  const xEnd = 610;
  const yStart = 80;
  const yEnd = 350;

  const verticalLines = Array.from({ length: columns + 1 }, (_, index) => {
    const x = xStart + ((xEnd - xStart) / columns) * index;

    return (
      <line
        key={`v-${index}`}
        x1={x}
        y1={yStart}
        x2={x}
        y2={yEnd}
        stroke="#d4d4d8"
        strokeWidth="1.2"
        opacity="0.55"
      />
    );
  });

  const horizontalLines = Array.from({ length: rows + 1 }, (_, index) => {
    const y = yStart + ((yEnd - yStart) / rows) * index;

    return (
      <line
        key={`h-${index}`}
        x1={xStart}
        y1={y}
        x2={xEnd}
        y2={y}
        stroke="#d4d4d8"
        strokeWidth="1.2"
        opacity="0.55"
      />
    );
  });

  return (
    <g>
      {verticalLines}
      {horizontalLines}
    </g>
  );
}

function MeshNodes({
  columns,
  rows,
}: {
  columns: number;
  rows: number;
}) {
  const xStart = 90;
  const xEnd = 610;
  const yStart = 80;
  const yEnd = 350;

  const nodes = [];

  for (let row = 0; row <= rows; row += 1) {
    for (let column = 0; column <= columns; column += 1) {
      const x = xStart + ((xEnd - xStart) / columns) * column;
      const y = yStart + ((yEnd - yStart) / rows) * row;

      nodes.push(
        <circle
          key={`node-${row}-${column}`}
          cx={x}
          cy={y}
          r="3.2"
          fill="#facc15"
          opacity="0.9"
        />
      );
    }
  }

  return <g>{nodes}</g>;
}

function ResultCells({
  columns,
  rows,
}: {
  columns: number;
  rows: number;
}) {
  const xStart = 90;
  const xEnd = 610;
  const yStart = 80;
  const yEnd = 350;

  const cellWidth = (xEnd - xStart) / columns;
  const cellHeight = (yEnd - yStart) / rows;

  const cells = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const intensity = column / Math.max(columns - 1, 1);

      let fill = "#71717a";

      if (intensity > 0.75) {
        fill = "#ef4444";
      } else if (intensity > 0.55) {
        fill = "#fb923c";
      } else if (intensity > 0.32) {
        fill = "#facc15";
      }

      cells.push(
        <rect
          key={`cell-${row}-${column}`}
          x={xStart + column * cellWidth}
          y={yStart + row * cellHeight}
          width={cellWidth}
          height={cellHeight}
          fill={fill}
          opacity="0.78"
        />
      );
    }
  }

  return <g>{cells}</g>;
}

function CriticalRegion({
  partType,
  fixedPoint,
  forceDirection,
}: {
  partType: string;
  fixedPoint: string;
  forceDirection: string;
}) {
  const position = getCriticalRegionPosition(
    partType,
    fixedPoint,
    forceDirection
  );

  return (
    <g>
      <circle
        cx={position.x}
        cy={position.y}
        r="28"
        fill="#ef4444"
        opacity="0.85"
      />

      <circle
        cx={position.x}
        cy={position.y}
        r="40"
        fill="none"
        stroke="#ef4444"
        strokeWidth="4"
        strokeDasharray="8 8"
      />

      <circle
        cx={position.x}
        cy={position.y}
        r="52"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        opacity="0.45"
      />

      <text
        x={position.labelX}
        y={position.labelY}
        fill="#fecaca"
        fontSize="18"
        fontWeight="700"
      >
        Região crítica
      </text>
    </g>
  );
}

function getCriticalRegionPosition(
  partType: string,
  fixedPoint: string,
  forceDirection: string
) {
  if (partType === "Suporte em L") {
    if (fixedPoint === "Base") {
      return {
        x: 235,
        y: 250,
        labelX: 185,
        labelY: 310,
      };
    }

    if (fixedPoint === "Direita") {
      return {
        x: 500,
        y: 285,
        labelX: 430,
        labelY: 345,
      };
    }

    return {
      x: 175,
      y: 250,
      labelX: 125,
      labelY: 310,
    };
  }

  if (partType === "Barra retangular") {
    if (fixedPoint === "Direita") {
      return {
        x: 510,
        y: 215,
        labelX: 440,
        labelY: 285,
      };
    }

    if (fixedPoint === "Base") {
      return {
        x: 350,
        y: 255,
        labelX: 285,
        labelY: 320,
      };
    }

    return {
      x: 185,
      y: 215,
      labelX: 125,
      labelY: 285,
    };
  }

  if (partType === "Placa com furo") {
    return {
      x: 350,
      y: 225,
      labelX: 285,
      labelY: 310,
    };
  }

  if (partType === "Suporte de sensor") {
    if (fixedPoint === "Base") {
      return {
        x: 350,
        y: 260,
        labelX: 285,
        labelY: 325,
      };
    }

    if (forceDirection === "Para cima") {
      return {
        x: 350,
        y: 140,
        labelX: 285,
        labelY: 105,
      };
    }

    return {
      x: 350,
      y: 245,
      labelX: 285,
      labelY: 315,
    };
  }

  if (partType === "Braço de drone") {
    if (fixedPoint === "Direita") {
      return {
        x: 500,
        y: 180,
        labelX: 425,
        labelY: 260,
      };
    }

    if (fixedPoint === "Base") {
      return {
        x: 350,
        y: 180,
        labelX: 285,
        labelY: 260,
      };
    }

    return {
      x: 200,
      y: 180,
      labelX: 130,
      labelY: 260,
    };
  }

  return {
    x: 350,
    y: 225,
    labelX: 285,
    labelY: 295,
  };
}

function ViewButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "yellow-glow rounded-xl bg-yellow-400 px-5 py-3 text-sm font-black text-black transition hover:-translate-y-0.5 hover:bg-yellow-300"
          : "rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-bold text-zinc-300 transition hover:-translate-y-0.5 hover:border-yellow-400 hover:text-yellow-300"
      }
    >
      {children}
    </button>
  );
}

function ForceArrow({ direction }: { direction: string }) {
  const rotation =
    direction === "Para cima"
      ? "rotate-180"
      : direction === "Horizontal"
      ? "-rotate-90"
      : "rotate-0";

  const position =
    direction === "Horizontal"
      ? "right-16 top-1/2 -translate-y-1/2"
      : "right-24 top-16";

  return (
    <div
      className={`absolute z-20 flex flex-col items-center ${position} ${rotation}`}
    >
      <span className="mb-2 rounded-full border border-yellow-400/40 bg-black px-3 py-1 text-xs font-black text-yellow-300">
        FORÇA
      </span>

      <div className="h-24 w-2 animate-pulse rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50" />

      <div className="h-0 w-0 border-l-[16px] border-r-[16px] border-t-[26px] border-l-transparent border-r-transparent border-t-yellow-400" />
    </div>
  );
}

function SupportMarker({ fixedPoint }: { fixedPoint: string }) {
  const position =
    fixedPoint === "Direita"
      ? "right-16 bottom-24"
      : fixedPoint === "Base"
      ? "left-1/2 bottom-20 -translate-x-1/2"
      : "left-16 bottom-24";

  return (
    <div
      className={`absolute z-20 ${position} rounded-2xl border border-yellow-400/50 bg-yellow-400/10 px-4 py-3 shadow-lg shadow-yellow-400/10`}
    >
      <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-400">
        Apoio
      </p>

      <p className="mt-1 text-sm font-bold text-white">{fixedPoint}</p>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-4 w-4 rounded-full ${color}`} />
      <span className="text-sm text-zinc-300">{label}</span>
    </div>
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