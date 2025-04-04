import Link from "next/link"
import { Sparkles } from "lucide-react"
import styles from "./Header.module.css"

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Sparkles className={styles.logoIcon} />
            <span>PixelMint</span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/gallery" className={styles.navLink}>
            Gallery
          </Link>
          <Link href="#" className={styles.navLink}>
            How It Works
          </Link>
          <button className={styles.signInButton}>Sign In</button>
        </nav>
      </div>
    </header>
  )
}

