namespace Peakline.Domain;

public sealed record RouteTrack(
    string Name,
    IReadOnlyList<TrackPoint> Points
);