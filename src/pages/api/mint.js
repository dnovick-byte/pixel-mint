import axios from 'axios';
import FormData from 'form-data';


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const api_key = process.env.API_KEY;
  //const wallet = process.env.WALLET_ADDRESS;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const this_chain = 'sepolia';

  // Get the data from the request body
  const { filePath, name, description, recipientAddress } = req.body;

  // Check if path is provided in the request
  if (!filePath) {
    return res.status(400).json({ error: 'File path is required' });
  }
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  try {
    let formData = new FormData(); // Create a FormData instance

    formData.append("imageUrl", filePath);
    formData.append("name", name);  // Append name
    formData.append("description", description);  // Append description
    formData.append("recipientAddress", recipientAddress);  // Append wallet address
    formData.append("data", `[{"trait_type":"Created_On","value":"PixelMint"}]`); // attributes
    formData.append("chain", this_chain);  // Chain info

    // Step 2: Mint NFT
    const mintResponse = await axios.post('https://api.verbwire.com/v1/nft/mint/quickMintFromMetadata', formData, {
      headers: {
        'X-API-Key': api_key,
        ...formData.getHeaders()  // Add the correct content-type headers for multipart/form-data  
      } 
    });
    if (!mintResponse || !mintResponse.data) {
      return res.status(500).json({ error: 'No data returned from minting API' });
    }

    // Step 3: Store NFT info in database
    await axios.post(`${BASE_URL}/api/db_add`, {
      name: name,
      description: description,
      image: filePath    
    });

    // Return successful response
    return res.status(200).json({
      success: true,
      mintData: mintResponse.data
    });

  } catch (error) {
    console.error('Minting error:', error);
    return res.status(500).json({
      error: 'Failed to mint NFT',
      details: error.response?.data || error.message
    });
  }
}