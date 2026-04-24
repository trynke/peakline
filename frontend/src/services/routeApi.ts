import type { AnalyzeRouteResponse } from "../types/route";

const API_BASE_URL = "http://localhost:5115";

export async function analyzeRoute(file: File): Promise<AnalyzeRouteResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/routes/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to analyze route.");
  }

  return response.json();
}