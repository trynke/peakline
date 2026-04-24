import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { ElevationPoint } from "../../types/route";

type Props = {
  data: ElevationPoint[];
};

export function ElevationChart({ data }: Props) {
  return (
    <div style={{ width: "100%", height: 300, background: "#fff", borderRadius: 12, padding: 12 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="distanceKmFromStart" unit=" km" />
          <YAxis dataKey="elevationM" unit=" m" />
          <Tooltip />
          <Line type="monotone" dataKey="elevationM" stroke="#ff5a36" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}