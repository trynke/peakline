export type RouteSummary = {
  distanceKm: number;
  elevationGainM: number;
  elevationLossM: number;
  pointCount: number;
};

export type TrackPoint = {
  latitude: number;
  longitude: number;
  elevation?: number | null;
  timestamp?: string | null;
};

export type ElevationPoint = {
  distanceKmFromStart: number;
  elevationM: number;
};

export type AnalyzeRouteResponse = {
  name: string;
  summary: RouteSummary;
  track: TrackPoint[];
  elevationProfile: ElevationPoint[];
};