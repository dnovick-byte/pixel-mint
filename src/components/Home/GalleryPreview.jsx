import Link from "next/link"
import styles from "./GalleryPreview.module.css"

export const GalleryPreview = () => {
  return (
    <section className={styles.gallery}>
      <div className={styles.galleryContent}>
        <h2 className={styles.galleryTitle}>Recently Created Artwork</h2>
        <p className={styles.galleryDescription}>
          Check out what others have created and turned into digital collectibles
        </p>
        <div className={styles.artworkGrid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={styles.artworkCard}>
              <img
                src={`/placeholder.svg?height=300&width=300&text=Artwork ${i}`}
                alt={`Community artwork ${i}`}
                className={styles.artworkImage}
              />
              <div className={styles.artworkInfo}>
                <h3 className={styles.artworkTitle}>Awesome Creation #{i}</h3>
                <p className={styles.artworkArtist}>By Artist{i}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.galleryAction}>
          <Link href="/gallery" className={styles.secondaryButton}>
            View Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}