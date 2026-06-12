"use client";

import { useState } from "react";
import { EngineeringDiagnosis } from "@/components/EngineeringDiagnosis";
import { FeatureCards } from "@/components/FeatureCards";
import { FEMExplanation } from "@/components/FEMExplanation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MeshVisualizer } from "@/components/MeshVisualizer";
import { PartVisualizer } from "@/components/PartVisualizer";
import { ResultsPanel } from "@/components/ResultsPanel";
import { SimulationForm } from "@/components/SimulationForm";
import { StressMap } from "@/components/StressMap";
import { UseCaseSection } from "@/components/UseCaseSection";
import type { FEMSimulationResult } from "@/lib/femSolver";
import {
  initialSimulationData,
  type SimulationFormData,
} from "@/lib/simulationTypes";

export function PrintFEMApp() {
  const [currentData, setCurrentData] =
    useState<SimulationFormData>(initialSimulationData);

  const [simulationResult, setSimulationResult] =
    useState<FEMSimulationResult | null>(null);

  function handleDataChange(data: SimulationFormData) {
    setCurrentData(data);
    setSimulationResult(null);
  }

  function handleSimulationComplete(
    data: SimulationFormData,
    result: FEMSimulationResult
  ) {
    setCurrentData(data);
    setSimulationResult(result);
  }

  return (
    <main className="industrial-bg min-h-screen text-white">
      <Header />
      <HeroSection />
      <FeatureCards />
      <UseCaseSection />

      <SimulationForm
        onDataChange={handleDataChange}
        onSimulationComplete={handleSimulationComplete}
      />

      <PartVisualizer data={currentData} />
      <MeshVisualizer data={currentData} />
      <ResultsPanel result={simulationResult} />

      {simulationResult && (
        <>
          <StressMap
            stressByElement={simulationResult.stressByElement}
            maxStress={simulationResult.maxStress}
            criticalRegion={simulationResult.criticalRegion}
          />

          <EngineeringDiagnosis result={simulationResult} />
        </>
      )}

      <FEMExplanation />
      <Footer />
    </main>
  );
}