using Microsoft.AspNetCore.Mvc;
using Peakline.Application;

namespace Peakline.Api.Controllers;

[ApiController]
[Route("api/routes")]
public sealed class RoutesController : ControllerBase
{
    private readonly IGpxParser _gpxParser;
    private readonly IRouteAnalyzer _routeAnalyzer;

    public RoutesController(IGpxParser gpxParser, IRouteAnalyzer routeAnalyzer)
    {
        _gpxParser = gpxParser;
        _routeAnalyzer = routeAnalyzer;
    }

    [HttpPost("analyze")]
    [Consumes("multipart/form-data")]
    [ProducesResponseType(typeof(AnalyzeRouteResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<AnalyzeRouteResponse>> Analyze(
        [FromForm] AnalyzeRouteRequest request,
        CancellationToken cancellationToken)
    {
        if (request.File is null || request.File.Length == 0)
            return BadRequest("GPX file is required.");

        // await using var stream = request.File.OpenReadStream();

        // var track = await _gpxParser.ParseAsync(stream, cancellationToken);
        // var summary = _routeAnalyzer.CalculateSummary(track);
        // var elevationProfile = _routeAnalyzer.BuildElevationProfile(track);

        // var response = new AnalyzeRouteResponse(
        //     track.Name,
        //     new RouteSummaryDto(
        //         summary.DistanceKm,
        //         summary.ElevationGainM,
        //         summary.ElevationLossM,
        //         summary.PointCount),
        //     track.Points
        //         .Select(p => new TrackPointDto(
        //             p.Latitude,
        //             p.Longitude,
        //             p.Elevation,
        //             p.Timestamp))
        //         .ToList(),
        //     elevationProfile
        //         .Select(p => new ElevationPointDto(
        //             p.DistanceKmFromStart,
        //             p.ElevationM))
        //         .ToList());

        //return Ok(response);
        return Ok();
    }
}

public sealed record AnalyzeRouteRequest(IFormFile File);

public sealed record AnalyzeRouteResponse(
    string Name,
    RouteSummaryDto Summary,
    IReadOnlyList<TrackPointDto> Track,
    IReadOnlyList<ElevationPointDto> ElevationProfile);

public sealed record RouteSummaryDto(
    double DistanceKm,
    double ElevationGainM,
    double ElevationLossM,
    int PointCount);

public sealed record TrackPointDto(
    double Latitude,
    double Longitude,
    double? Elevation,
    DateTimeOffset? Timestamp);

public sealed record ElevationPointDto(
    double DistanceKmFromStart,
    double ElevationM);