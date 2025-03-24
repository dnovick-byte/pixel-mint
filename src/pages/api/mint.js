import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const api_key = process.env.API_KEY;
  const wallet = process.env.WALLET_ADDRESS;

  // Get the data from the request body
  const { filePathRelative, name, description } = req.body;

  // Check if path is provided in the request
  if (!filePathRelative) {
    return res.status(400).json({ error: 'File path is required' });
  }
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  // Construct the full file path from the relative path
  const filePath = path.join(process.cwd(), 'public', filePathRelative.replace(/^\/+/, ''));

  console.log('Resolved file path:', filePath); // Log the resolved path for debugging

  // Check if the file exists before attempting to read it
  if (!fs.existsSync(filePath)) {
    return res.status(400).json({ error: "File not found" });
  }

  // Create a read stream for the file
  const fileStream = fs.createReadStream(filePath);

  // Create a FormData instance
  const formData = new FormData();
  formData.append("filePath", fileStream, name);  // Append the file to FormData
  formData.append("name", name);  // Append name
  formData.append("description", description);  // Append description
  formData.append("recipientAddress", wallet);  // Append wallet address
  formData.append("allowPlatformToOperateToken", "true");  // Add additional data
  formData.append("data", ""); // attributes
  formData.append("chain", "sepolia");  // Chain info

  // Use axios.post with .then() to handle the response
  axios.post('https://api.verbwire.com/v1/nft/mint/quickMintFromFile', formData, {
    headers: {
      'X-API-Key': api_key,
      ...formData.getHeaders()  // Add the correct content-type headers for multipart/form-data
    }
  })
    .then((response) => {
      // Handle the success response from Verbwire
      if (response && response.data) {
        console.log('Verbwire Response:', response.data); // can delete this
        return res.status(200).json({
          success: true,
          mintData: response.data
        });
      } else { // should not happen
        return res.status(500).json({
          error: 'No data returned from API'
        });
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Minting error:', error);

      // Check if the error has a response object
      if (error.response) {
        console.error('Error response:', error.response);
        return res.status(500).json({
          error: 'Failed to mint NFT',
          details: error.response.data || error.message
        });
      } else {
        return res.status(500).json({
          error: 'Failed to mint NFT',
          details: error.message
        });
      }
    });
}