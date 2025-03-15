import axios from "axios";
import FormData from "form-data";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

    const api_key = 'pk_live_54fec082-bbe6-4d26-9440-7b324e0ad10e';
    const wallet = '0xE5508FD606D6306a316A68a3218873eA9A91517c';
  
    try {
        const { fullPath, name, description } = req.body; // Get image file path and NFT metadata


        const formData = new FormData();
        formData.append("filePath", fullPath);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("recipientAddress", wallet);
        formData.append("chain", "sepolia");
        formData.append("allowPlatformToOperateToken", "true");

        const verbwireResponse = await axios({
          method: 'post',
          url: 'https://api.verbwire.com/v1/nft/mint/quickMintFromFile',
          headers: {
            'X-API-Key':api_key,
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        });

        // Return success response
        return res.status(200).json({
          success: true,
          mintData: verbwireResponse.data
        });

        

    } catch (error) {
      console.error('Minting error:', error.response?.data || error.message);
      return res.status(500).json({
          error: 'Failed to mint NFT',
          details: error.response?.data || error.message
      });    
    }
  }
  