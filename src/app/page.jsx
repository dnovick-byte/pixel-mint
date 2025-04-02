"use client" // need this
import { Header } from "../components/Header/Header";
import { Hero } from "../components/Home/Hero";
import { Features } from "../components/Home/Features";
import { GalleryPreview } from "../components/Home/GalleryPreview";

import { ConnectWallet } from "../components/ConnectWallet/ConnectWallet";


export default function HomePage() {
  return (
    <div>
      <Header ConnectWallet={ConnectWallet}/>
      <main>
        <Hero />
        <Features />
        <GalleryPreview />
      </main>
    </div>
  );
}