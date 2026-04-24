import { useState } from "react";
import { FileUpload } from "../components/FileUpload/FileUpload";
import { RouteMap } from "../components/RouteMap/RouteMap";
import { RouteSummaryCard } from "../components/RouteSummaryCard/RouteSummaryCard";
import { ElevationChart } from "../components/ElevationChart/ElevationChart";
import { analyzeRoute } from "../services/routeApi";
import type { AnalyzeRouteResponse } from "../types/route";

export function HomePage() {
  const [route, setRoute] = useState<AnalyzeRouteResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await analyzeRoute(file);
      setRoute(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unexpected error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <h1>Peakline</h1>

      <FileUpload onFileSelected={handleFileSelected} isLoading={isLoading} />

      {isLoading && <p>Analyzing route...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {route && <RouteSummaryCard summary={route.summary} routeName={route.name} />}

      <div style={{ marginTop: 16 }}>
        <RouteMap track={route?.track ?? []} />
      </div>

      {route && (
        <div style={{ marginTop: 16 }}>
          <ElevationChart data={route.elevationProfile} />
        </div>
      )}
    </main>
  );
}