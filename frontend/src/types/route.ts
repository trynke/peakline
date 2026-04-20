export interface RoutePoint {
  lat: number
  lon: number
  elevation?: number
}

export interface RouteSummary {
  distanceKm: number
  ascentM: number
  descentM: number
  durationMin?: number
}

export interface Route {
  id: string
  name: string
  points: RoutePoint[]
  summary: RouteSummary
}
