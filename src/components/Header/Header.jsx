import Link from "next/link"
import { Sparkles } from "lucide-react"
import styles from "./Header.module.css"
import { ConnectWallet } from "../ConnectWallet/ConnectWallet";

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
          <Link href="/my-collection" className={styles.navLink}>
            My Collection
          </Link>
          <Link href="/gallery" className={styles.navLink}>
            Gallery
          </Link>
          <Link href="how-it-works" className={styles.navLink}>
            How It Works
          </Link>
          <ConnectWallet />
        </nav>
      </div>
    </header>
  )
}

