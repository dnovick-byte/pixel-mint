"use client"
import Link from "next/link"
import styles from "./GalleryPreview.module.css"
import { useState } from "react"



export const GalleryPreview = ({ nfts }) => {
//  const [nfts, setNfts] = useState([]); // State to hold fetched NFTs
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State for any errors that occur during fetch

  
  return (
    <section className={styles.gallery}>
      <div className={styles.galleryContent}>
        <h2 className={styles.galleryTitle}>Recently Created Artwork</h2>
        <p className={styles.galleryDescription}>
          Check out what others have created and turned into digital collectibles
        </p>
        <div className={styles.artworkGrid}>
          {nfts.map((nft, index) => (
            <div key={index} className={styles.artworkCard}>
              <img
                src={nft.image}
                alt={nft.name}
                className={styles.artworkImage}
              />
              <div className={styles.artworkInfo}>
                <h3 className={styles.artworkTitle}>{nft.name}</h3>
                <p className={styles.artworkArtist}>{nft.description}</p>
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