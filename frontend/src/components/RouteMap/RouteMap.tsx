import { useEffect, useRef } from 'react'
import maplibregl, { type Map as MapLibreMap } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import styles from './RouteMap.module.css'

interface RouteMapProps {
  center?: [number, number]
  zoom?: number
}

const DEFAULT_CENTER: [number, number] = [37.6173, 55.7558]
const DEFAULT_ZOOM = 4

export function RouteMap({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
}: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<MapLibreMap | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap contributors',
          },
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm',
          },
        ],
      },
      center,
      zoom,
    })

    map.addControl(new maplibregl.NavigationControl(), 'top-right')
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [center, zoom])

  return <div ref={containerRef} className={styles.map} />
}
