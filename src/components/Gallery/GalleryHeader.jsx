"use client"
import { Search, Brush } from "lucide-react"
import styles from "./GalleryHeader.module.css"

export const GalleryHeader = ({ onSearch }) => {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>Digital Art Gallery</h1>
        <p className={styles.description}>Discover unique digital collectibles created by our community</p>
      </div>
      <div className={styles.actions}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Search artwork..."
            className={styles.searchInput}
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>
        <a href="/draw" className={styles.createButton}>
          <Brush className={styles.buttonIcon} />
          Create Your Own
        </a>
      </div>
    </div>
  )
}
