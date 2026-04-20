import type { RouteSummary } from '../../types/route'
import styles from './RouteSummaryCard.module.css'

interface RouteSummaryCardProps {
  summary: RouteSummary
  name?: string
}

export function RouteSummaryCard({ summary, name }: RouteSummaryCardProps) {
  return (
    <section className={styles.card}>
      {name && <h2 className={styles.title}>{name}</h2>}
      <dl className={styles.stats}>
        <div className={styles.stat}>
          <dt>Distance</dt>
          <dd>{summary.distanceKm.toFixed(1)} km</dd>
        </div>
        <div className={styles.stat}>
          <dt>Ascent</dt>
          <dd>{Math.round(summary.ascentM)} m</dd>
        </div>
        <div className={styles.stat}>
          <dt>Descent</dt>
          <dd>{Math.round(summary.descentM)} m</dd>
        </div>
        {summary.durationMin !== undefined && (
          <div className={styles.stat}>
            <dt>Duration</dt>
            <dd>{Math.round(summary.durationMin)} min</dd>
          </div>
        )}
      </dl>
    </section>
  )
}
