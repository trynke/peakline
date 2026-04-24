using Peakline.Application;
using Peakline.Domain;

namespace Peakline.Infrastructure;

public class GpxParser : IGpxParser
{
    public Task<RouteTrack> ParseAsync(Stream stream, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
