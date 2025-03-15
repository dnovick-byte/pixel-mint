import { useState } from "react";
import { Grid } from "../components/Grid/Grid";
import { Header } from "../components/Header/Header";
import styles from "./mint.module.css";
import FormData from "form-data";


export default function MintPage() {
  const [metadataUrl, setMetadataUrl] = useState(""); // New state for metadata URL
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const mintNFT = async (imagePath) => {
    try {
      const formData = new FormData();
      
      const response = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagePath,
          name: "My Pixel Art",
          description: "This is an AI-generated NFT.",
        }),
      });

  
      const data = await response.json();
      if (data.transactionHash) {
        alert(`NFT minted! Transaction: ${data.transactionHash}`);
      } else {
        alert("Minting failed. Check console for details.");
      }
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  return (
    <div className={styles.wrap}>
      <Header />
      <Grid onMint={mintNFT}/>    
    </div>
  );
}
