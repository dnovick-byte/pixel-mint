"use client"

import { useState } from "react"
import { Header } from "../components/Header/Header"
import { Footer }from "../components/Footer/Footer"
import { GalleryHeader } from "../components/Gallery/GalleryHeader"
import { GalleryTabs, TabPanel } from "../components/Gallery/GalleryTabs"
import ArtworkGrid from "../components/gallery/ArtworkGrid"
import styles from "./gallery.module.css"

// Mock data for the gallery
const generateArtworks = (count, prefix) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${prefix}-${i + 1}`,
    title: `${prefix} Creation #${i + 1}`,
    artist: `${prefix}Artist${i + 1}`,
    date: prefix === "Featured" ? "Staff Pick" : prefix === "Recent" ? "Created today" : "Created 2 days ago",
    imageUrl: `/placeholder.svg?height=300&width=300&text=${prefix} ${i + 1}`,
  }))
}

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const trendingArtworks = generateArtworks(8, "Trending")
  const recentArtworks = generateArtworks(8, "Recent")
  const featuredArtworks = generateArtworks(4, "Featured")

  return (
    <div className={styles.container}>
        <Header />

        <main className={styles.main}>
            <div className={styles.content}>
                <GalleryHeader onSearch={setSearchQuery} />

                <GalleryTabs tabs={["Trending", "Recent", "Featured"]} defaultTab="Trending">
                    <TabPanel value="Trending">
                    <ArtworkGrid
                        artworks={trendingArtworks.filter((art) =>
                        searchQuery ? art.title.toLowerCase().includes(searchQuery.toLowerCase()) : true,
                        )}
                        onLoadMore={() => console.log("Load more trending")}
                    />
                    </TabPanel>

                    <TabPanel value="Recent">
                    <ArtworkGrid
                        artworks={recentArtworks.filter((art) =>
                        searchQuery ? art.title.toLowerCase().includes(searchQuery.toLowerCase()) : true,
                        )}
                        onLoadMore={() => console.log("Load more recent")}
                    />
                    </TabPanel>

                    <TabPanel value="Featured">
                    <ArtworkGrid
                        artworks={featuredArtworks.filter((art) =>
                        searchQuery ? art.title.toLowerCase().includes(searchQuery.toLowerCase()) : true,
                        )}
                    />
                    </TabPanel>
                </GalleryTabs>
            </div>
        </main>


        <Footer />
    </div>
  )
}

