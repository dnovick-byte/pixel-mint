import React from 'react';
import styles from './index.module.css';
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Hero } from "../components/Home/Hero";
import { Features } from "../components/Home/Features";
import { GalleryPreview } from "../components/Home/GalleryPreview";

export default function HomePage() {
  return (
    <div className={styles.container}>
        <Header />

      
      <main className={styles.main}>
        <Hero />
        <Features />
        <GalleryPreview />
        
      </main>
      

      <Footer />
    </div>
  );
}
