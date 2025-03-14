import { useState } from "react";
import { Canvas } from "../Components/Canvas";
import { Grid } from "../Components/Grid";

export default function MintPage() {
  const [metadataUrl, setMetadataUrl] = useState(""); // New state for metadata URL
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const mintNFT = async (imagePath) => {
    try {
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
    <div>
      <Grid onMint={mintNFT}/>    
    </div>
  );
}
