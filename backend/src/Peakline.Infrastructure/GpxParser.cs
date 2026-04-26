using Peakline.Application;
using Peakline.Domain;
using System.Xml.Linq;

namespace Peakline.Infrastructure;

public sealed class GpxParser : IGpxParser
{
    public async Task<RouteTrack> ParseAsync(Stream stream, CancellationToken cancellationToken = default)
    {
        var document = await XDocument.LoadAsync(stream, LoadOptions.None, cancellationToken);

        XNamespace ns = document.Root?.Name.Namespace ?? XNamespace.None;

        var trackName =
            document.Descendants(ns + "trk")
                .Elements(ns + "name")
                .Select(x => x.Value.Trim())
                .FirstOrDefault();

        var points = document.Descendants(ns + "trkpt")
            .Select(trkpt =>
            {
                var lat = ParseRequiredDouble(trkpt.Attribute("lat")?.Value, "lat");
                var lon = ParseRequiredDouble(trkpt.Attribute("lon")?.Value, "lon");

                var elevationValue = trkpt.Element(ns + "ele")?.Value;
                var timeValue = trkpt.Element(ns + "time")?.Value;

                double? elevation = TryParseNullableDouble(elevationValue);
                DateTimeOffset? timestamp = TryParseNullableDateTimeOffset(timeValue);

                return new TrackPoint(lat, lon, elevation, timestamp);
            })
            .ToList();

        if (points.Count == 0)
            throw new InvalidOperationException("No track points found in GPX.");

        return new RouteTrack(
            string.IsNullOrWhiteSpace(trackName) ? "Unnamed route" : trackName,
            points);
    }

    private static double ParseRequiredDouble(string? value, string fieldName)
    {
        if (!double.TryParse(value, System.Globalization.NumberStyles.Float,
                System.Globalization.CultureInfo.InvariantCulture, out var result))
            throw new InvalidOperationException($"Invalid or missing '{fieldName}' value in GPX.");

        return result;
    }

    private static double? TryParseNullableDouble(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return null;

        return double.TryParse(value, System.Globalization.NumberStyles.Float,
            System.Globalization.CultureInfo.InvariantCulture, out var result)
            ? result
            : null;
    }

    private static DateTimeOffset? TryParseNullableDateTimeOffset(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return null;

        return DateTimeOffset.TryParse(value, out var result)
            ? result
            : null;
    }
}