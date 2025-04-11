"use client"
import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { ArtworkGrid } from "../../components/MyCollection/ArtworkGrid";
import { fetchOwnNFTS } from "../../lib/fetchNfts";
import { useWallet } from "../../lib/WalletContext";

import styles from "./page.module.css";
const onLoadMore = () => {
    console.log('loading more')
}
export default function MyCollection() {
    const [nfts, setNfts] = useState([]);
    const [error, setError] = useState(null);

    const { address } = useWallet();

    useEffect(() => {
        async function loadNFTs() {
            if (!address) return;
            try {
                const data = await fetchOwnNFTS(address).then(setNfts);
            } catch (err) {
                console.error("Failed to fetch NFTs:", err);
                setError(err.message);
                setNfts([]);
            }
        }
        loadNFTs();
      }, [address]);
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <div className={styles.content}>
                    <ArtworkGrid artworks={nfts} onLoadMore={onLoadMore} /> 
                </div>
            </main>
      </div>
    )
}