"use client"

import { useState } from "react"
import { Header } from "../components/Header/Header"
import { Footer }from "../components/Footer/Footer"
import { GalleryHeader } from "../components/Gallery/GalleryHeader"
import { GalleryTabs, TabPanel } from "../components/Gallery/GalleryTabs"
import { ArtworkGrid } from "../components/Gallery/ArtworkGrid"
import styles from "./gallery.module.css"
import axios from "axios"



export default function GalleryPage({ initialNfts }) {
  const [nfts, setNfts] = useState(initialNfts); // Initialize NFTs with the fetched data
  const [limit, setLimit] = useState(8); // Initial limit for fetching


  const onLoadMore = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/fetch_nfts`, {
        params: { limit: limit + 8, orderBy: "id" } // Increase limit by 8 each time
      });
      setNfts(response.data); // Update the nfts state with the new data
      setLimit(limit + 8); // Increase the limit state by 8
    } catch (error) {
      console.error("Error loading more NFTs:", error);
    }
  };
  const [searchQuery, setSearchQuery] = useState("")
  
  return (
    <div className={styles.container}>
        <Header />
        <main className={styles.main}>
            <div className={styles.content}>
                <GalleryHeader onSearch={setSearchQuery} />

                <GalleryTabs tabs={["Trending", "Recent", "Featured"]} defaultTab="Recent">
                  <TabPanel value="Trending">
                    <ArtworkGrid
                        artworks={nfts}
                        onLoadMore={onLoadMore}
                    />   
                  </TabPanel>
                  <TabPanel value="Recent">
                    <ArtworkGrid
                      artworks={nfts}
                      onLoadMore={onLoadMore}
                    />       
                  </TabPanel>
                  <TabPanel value="Featured">
                    <ArtworkGrid
                        artworks={nfts}
                        onLoadMore={onLoadMore}
                    />   
                  </TabPanel>

                </GalleryTabs>

               
               
            </div>
        </main>


        <Footer />
    </div>
  )
}



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
    const initialNfts = response.data;

    return { props: { initialNfts } };
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return { props: { initialNfts: [] } }; // Provide empty array if there's an error
  }
}