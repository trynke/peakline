using Peakline.Domain;

namespace Peakline.Application;

public interface IGpxParser
{
    Task<RouteTrack> ParseAsync(Stream stream, CancellationToken cancellationToken = default);
}