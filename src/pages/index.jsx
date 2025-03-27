import React from 'react'; // delete usestate after styling
import styles from './index.module.css';
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Hero } from "../components/Home/Hero";
import { Features } from "../components/Home/Features";
import {GalleryPreview} from "../components/Home/GalleryPreview";
import axios from "axios";

// The function will be executed at build time to fetch data
export async function getStaticProps() {
  try {
    // Make the API call to your backend (assumed to be 'api/fetch_nfts')
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    //console.log(`${BASE_URL}/api/fetch_nfts`)
    const response = await axios.get(`${BASE_URL}/api/fetch_nfts`); // Adjust the URL if necessary
    const nfts = response.data; // Assume it returns the list of NFTs
    console.log(nfts);
    // Return the fetched data as props to the page component
    return {
      props: { nfts }, // Will be passed to the page component as a prop
      revalidate: 10, // Optional: Revalidate this page every 10 seconds (Incremental Static Regeneration)
    };
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    // In case of an error, return empty data
    return {
      props: { nfts: [] }, // Fallback to empty array if error occurs
    };
  }
};

export default function HomePage({ nfts }) {
  return (
    <div className={styles.container}>
        <Header />

      
      <main className={styles.main}>
        <Hero />
        <Features />
        <GalleryPreview nfts={nfts}/>
        
      </main>
      

      <Footer />
    </div>
  );
}
