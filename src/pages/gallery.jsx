"use client"

import { useState } from "react"
import { Header } from "../components/Header/Header"
import { Footer }from "../components/Footer/Footer"
import { GalleryHeader } from "../components/Gallery/GalleryHeader"
import { GalleryTabs, TabPanel } from "../components/Gallery/GalleryTabs"
import { ArtworkGrid } from "../components/Gallery/ArtworkGrid"
import styles from "./gallery.module.css"
import axios from "axios"


// Server-side fetching: Fetch NFTs dynamically on each request
export async function getServerSideProps(context) {
  const { query } = context;
  const limit = query.limit || 8; // Default to 8 items if not specified
  const orderBy = query.orderBy || "id"; // Default sorting

  try {
    // Fetch NFTs dynamically based on query parameters
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/fetch_nfts`, {
      params: { limit, orderBy }
    });    
    const nfts = response.data;

    return { props: { nfts } };
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return { props: { nfts: [] } }; // Provide empty array if there's an error
  }
}

export default function GalleryPage({ nfts }) {
  const [searchQuery, setSearchQuery] = useState("")
  console.log(nfts)
  
  return (
    <div className={styles.container}>
        <Header />
        <main className={styles.main}>
            <div className={styles.content}>
                <GalleryHeader onSearch={setSearchQuery} />

                <ArtworkGrid
                  artworks={nfts}
                  onLoadMore={() => console.log('loading more')}
                />
               
               
            </div>
        </main>


        <Footer />
    </div>
  )
}

/*
 <GalleryTabs tabs={["Trending", "Recent", "Featured"]} defaultTab="Recent">
                  <TabPanel value="Recent">
                    
                  </TabPanel>

                </GalleryTabs>
*/

