import type { RouteSummary } from "../../types/route";

type Props = {
  summary: RouteSummary;
  routeName: string;
};

export function RouteSummaryCard({ summary, routeName }: Props) {
  return (
    <div
      style={{
        padding: 16,
        border: "1px solid #ddd",
        borderRadius: 12,
        background: "#fff",
        marginBottom: 16,
      }}
    >
      <h2 style={{ marginTop: 0 }}>{routeName}</h2>
      <div>distance: {summary.distanceKm} km</div>
      <div>elevation gain: {summary.elevationGainM} m</div>
      <div>elevation loss: {summary.elevationLossM} m</div>
      <div>points: {summary.pointCount}</div>
    </div>
  );
}