import { useEffect, useRef } from "react";
import maplibregl, { LngLatBounds } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { TrackPoint } from "../../types/route";
import styles from "./RouteMap.module.css";

type Props = {
  track: TrackPoint[];
};

export function RouteMap({ track }: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return;
    }

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          opentopomap: {
            type: "raster",
            tiles: [
              "https://a.tile.opentopomap.org/{z}/{x}/{y}.png",
              "https://b.tile.opentopomap.org/{z}/{x}/{y}.png",
              "https://c.tile.opentopomap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            maxzoom: 17,
            attribution:
              'Map data: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
              'SRTM | Map style: © <a href="https://opentopomap.org">OpenTopoMap</a> ' +
              '(<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
          },
        },
        layers: [
          {
            id: "opentopomap",
            type: "raster",
            source: "opentopomap",
          },
        ],
      },
      center: [37.6173, 55.7558],
      zoom: 4,
      maxZoom: 17,
    });

    mapRef.current.addControl(new maplibregl.NavigationControl(), "top-right");

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || track.length === 0) {
      return;
    }

    const sourceId = "route-source";
    const layerId = "route-line";

    const geoJson = {
      type: "Feature" as const,
      geometry: {
        type: "LineString" as const,
        coordinates: track.map((p) => [p.longitude, p.latitude]),
      },
      properties: {},
    };

    const renderRoute = () => {
      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: "geojson",
          data: geoJson,
        });

        map.addLayer({
          id: layerId,
          type: "line",
          source: sourceId,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#ff5a36",
            "line-width": 4,
          },
        });
      } else {
        const source = map.getSource(sourceId) as maplibregl.GeoJSONSource;
        source.setData(geoJson);
      }

      const bounds = new LngLatBounds();

      for (const point of track) {
        bounds.extend([point.longitude, point.latitude]);
      }

      map.fitBounds(bounds, {
        padding: 40,
        duration: 500,
      });
    };

    if (map.isStyleLoaded()) {
      renderRoute();
    } else {
      map.once("load", renderRoute);
    }
  }, [track]);

  return <div ref={mapContainerRef} className={styles.map} />;
}