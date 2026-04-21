using Peakline.Domain;

namespace Peakline.Application;

public interface IRouteAnalyzer
{
    RouteSummary CalculateSummary(RouteTrack track);
    IReadOnlyList<ElevationPoint> BuildElevationProfile(RouteTrack track);
}