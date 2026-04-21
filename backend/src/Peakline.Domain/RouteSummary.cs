namespace Peakline.Domain;
public sealed record RouteSummary(
    double DistanceKm,
    double ElevationGainM,
    double ElevationLossM,
    int PointCount
);
