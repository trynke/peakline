import { FileUpload } from '../components/FileUpload/FileUpload'
import { RouteMap } from '../components/RouteMap/RouteMap'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Peakline</h1>
        <p className={styles.subtitle}>
          Upload a GPX track to explore the route on the map.
        </p>
      </header>

      <section className={styles.upload}>
        <FileUpload />
      </section>

      <section className={styles.mapSection}>
        <RouteMap />
      </section>
    </main>
  )
}
