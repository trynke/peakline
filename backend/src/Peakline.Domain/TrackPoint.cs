namespace Peakline.Domain;

public sealed record TrackPoint(
    double Latitude,
    double Longitude,
    double? Elevation,
    DateTimeOffset? Timestamp
);