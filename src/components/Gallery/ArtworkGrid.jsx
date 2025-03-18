"use client"
import { Sparkles } from "lucide-react"
import styles from "./ArtworkGrid.module.css"

export const ArtworkGrid = ({ artworks, onLoadMore }) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {artworks.map((artwork) => (
          <div key={artwork.id} className={styles.artworkCard}>
            <img src={artwork.imageUrl || "/placeholder.svg"} alt={artwork.title} className={styles.artworkImage} />
            <div className={styles.artworkInfo}>
              <h3 className={styles.artworkTitle}>{artwork.title}</h3>
              <p className={styles.artworkArtist}>By {artwork.artist}</p>
              <div className={styles.artworkMeta}>
                <span className={styles.artworkDate}>{artwork.date}</span>
                <button className={styles.artworkAction}>
                  <Sparkles className={styles.actionIcon} />
                  <span className={styles.srOnly}>View details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {onLoadMore && (
        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreButton} onClick={onLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
