using Peakline.Application;
using Peakline.Domain;

namespace Peakline.Infrastructure;

public sealed class RouteAnalyzer : IRouteAnalyzer
{
    public RouteSummary CalculateSummary(RouteTrack track)
    {
        if (track.Points.Count == 0)
            return new RouteSummary(0, 0, 0, 0);

        double distanceKm = 0;
        double elevationGainM = 0;
        double elevationLossM = 0;

        for (var i = 1; i < track.Points.Count; i++)
        {
            var previous = track.Points[i - 1];
            var current = track.Points[i];

            distanceKm += HaversineDistanceKm(
                previous.Latitude, previous.Longitude,
                current.Latitude, current.Longitude);

            if (previous.Elevation.HasValue && current.Elevation.HasValue)
            {
                var delta = current.Elevation.Value - previous.Elevation.Value;

                if (delta > 0)
                    elevationGainM += delta;
                else
                    elevationLossM += Math.Abs(delta);
            }
        }

        return new RouteSummary(
            Math.Round(distanceKm, 2),
            Math.Round(elevationGainM, 0),
            Math.Round(elevationLossM, 0),
            track.Points.Count);
    }

    public IReadOnlyList<ElevationPoint> BuildElevationProfile(RouteTrack track)
    {
        var result = new List<ElevationPoint>();

        if (track.Points.Count == 0)
            return result;

        double distanceKm = 0;

        var firstPoint = track.Points[0];
        result.Add(new ElevationPoint(0, firstPoint.Elevation ?? 0));

        for (var i = 1; i < track.Points.Count; i++)
        {
            var previous = track.Points[i - 1];
            var current = track.Points[i];

            distanceKm += HaversineDistanceKm(
                previous.Latitude, previous.Longitude,
                current.Latitude, current.Longitude);

            result.Add(new ElevationPoint(
                Math.Round(distanceKm, 3),
                current.Elevation ?? 0));
        }

        return result;
    }

    private static double HaversineDistanceKm(
        double lat1, double lon1,
        double lat2, double lon2)
    {
        const double earthRadiusKm = 6371.0;

        var dLat = DegreesToRadians(lat2 - lat1);
        var dLon = DegreesToRadians(lon2 - lon1);

        var a =
            Math.Pow(Math.Sin(dLat / 2), 2) +
            Math.Cos(DegreesToRadians(lat1)) *
            Math.Cos(DegreesToRadians(lat2)) *
            Math.Pow(Math.Sin(dLon / 2), 2);

        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

        return earthRadiusKm * c;
    }

    private static double DegreesToRadians(double degrees)
        => degrees * Math.PI / 180.0;
}