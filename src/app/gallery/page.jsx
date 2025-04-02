"use client";

import { useState, useEffect } from "react";
import { GalleryHeader } from "../../components/Gallery/GalleryHeader";
import { GalleryTabs, TabPanel } from "../../components/Gallery/GalleryTabs";
import { ArtworkGrid } from "../../components/Gallery/ArtworkGrid";
import styles from "./gallery.module.css";
import {fetchNfts} from "../../lib/fetchNfts"
import { Header } from "../../components/Header/Header";
import { ConnectWallet } from "../../components/ConnectWallet/ConnectWallet";

export default function GalleryPage() {
  const [nfts, setNfts] = useState([]);
  const [limit, setLimit] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNfts(limit).then(setNfts);
  }, [limit]);

  const onLoadMore = async () => {
    setLimit((prev) => prev + 8);
  };

  return (
    <div className={styles.container}>
      <Header ConnectWallet={ConnectWallet}/>
      <main className={styles.main}>
        <div className={styles.content}>
          <GalleryHeader onSearch={setSearchQuery} />
          <GalleryTabs tabs={["Trending", "Recent", "Featured"]} defaultTab="Recent">
            <TabPanel value="Trending">
              <ArtworkGrid artworks={nfts} onLoadMore={onLoadMore} />
            </TabPanel>
            <TabPanel value="Recent">
              <ArtworkGrid artworks={nfts} onLoadMore={onLoadMore} />
            </TabPanel>
            <TabPanel value="Featured">
              <ArtworkGrid artworks={nfts} onLoadMore={onLoadMore} />
            </TabPanel>
          </GalleryTabs>
        </div>
      </main>
    </div>
  );
}