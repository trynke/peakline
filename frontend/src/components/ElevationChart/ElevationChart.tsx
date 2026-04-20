import type { RoutePoint } from '../../types/route'
import styles from './ElevationChart.module.css'

interface ElevationChartProps {
  points: RoutePoint[]
  height?: number
}

export function ElevationChart({ points, height = 160 }: ElevationChartProps) {
  if (points.length < 2) {
    return <div className={styles.empty}>No elevation data</div>
  }

  const elevations = points.map((p) => p.elevation ?? 0)
  const min = Math.min(...elevations)
  const max = Math.max(...elevations)
  const range = Math.max(max - min, 1)

  const width = 600
  const step = width / (points.length - 1)

  const path = elevations
    .map((e, i) => {
      const x = i * step
      const y = height - ((e - min) / range) * height
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <div className={styles.wrapper}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className={styles.svg}
      >
        <path d={path} className={styles.line} />
      </svg>
      <div className={styles.labels}>
        <span>{Math.round(min)} m</span>
        <span>{Math.round(max)} m</span>
      </div>
    </div>
  )
}
