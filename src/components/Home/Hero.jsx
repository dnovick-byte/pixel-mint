import Link from "next/link"
import { ArrowRight, Brush } from "lucide-react"
import styles from "./Hero.module.css"


export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Create, Share & Own Your Digital Art</h1>
        <p className={styles.heroSubtitle}>
          Draw anything you can imagine and turn it into a unique digital collectible that only you own. No technical
          knowledge required.
        </p>
        <div className={styles.heroButtons}>
          <Link href="/draw" className={styles.primaryButton}>
            <Brush className={styles.buttonIcon} />
            Start Drawing
            <ArrowRight className={styles.buttonIcon} />
          </Link>
          <Link href="/gallery" className={styles.secondaryButton}>
            Explore Gallery
          </Link>
        </div>
      </div>
    </section>
  )
};
