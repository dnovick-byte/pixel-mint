import Link from "next/link"
import { Sparkles } from "lucide-react"
import styles from "./Footer.module.css"

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logo}>
          <img src="/favicon.png" alt="logo" className={styles.logoIcon} />
          <span>PixelMint</span>
        </div>
        <p className={styles.copyright}>© 2025 PixelMint. All rights reserved.</p>
        <nav className={styles.footerNav}>
          <Link href="#" className={styles.footerLink}>
            Terms
          </Link>
          <Link href="#" className={styles.footerLink}>
            Privacy
          </Link>
          <Link href="#" className={styles.footerLink}>
            Help
          </Link>
        </nav>
      </div>
    </footer>
  )
};

