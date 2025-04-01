
import { fetchNfts } from "../lib/fetchNfts";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Hero } from "../components/Home/Hero";
import { Features } from "../components/Home/Features";
import { GalleryPreview } from "../components/Home/GalleryPreview";

export default async function HomePage() {
  try {
    // Fetch NFTs with revalidation every 1 hour (3600 seconds)
    const nfts = await fetchNfts(8, 3600); 

    return (
      <div>
        <Header />
        <main>
          <Hero />
          <Features />
          <GalleryPreview nfts={nfts} />
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return <div>Error fetching data</div>;
  }
}