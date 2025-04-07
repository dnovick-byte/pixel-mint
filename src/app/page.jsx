"use client" // need this
import { Header } from "../components/Header/Header";
import { Hero } from "../components/Home/Hero";
import { Features } from "../components/Home/Features";
import { GalleryPreview } from "../components/Home/GalleryPreview";


export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Features />
        <GalleryPreview />
      </main>
    </div>
  );
}