// I think here you would upload that image to ipfs
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataApiSecret = process.env.PINATA_API_SECRET;

export const pinFileToIPFS = async (imageUrl) => {
  const form = new FormData();
  const imageStream = fs.createReadStream(imageUrl); // Local file stream

  form.append('file', imageStream);

  try {
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form, {
      headers: {
        ...form.getHeaders(),
        'pinata_api_key': pinataApiKey,
        'pinata_secret_api_key': pinataApiSecret,
      },
    });

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Failed to upload image to IPFS');
  }
};

export const pinMetadataToIPFS = async (metadata) => {
  const form = new FormData();
  const metadataJson = JSON.stringify(metadata);

  form.append('file', Buffer.from(metadataJson)); // Buffer to convert JSON

  try {
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form, {
      headers: {
        ...form.getHeaders(),
        'pinata_api_key': pinataApiKey,
        'pinata_secret_api_key': pinataApiSecret,
      },
    });

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading metadata to IPFS:', error);
    throw new Error('Failed to upload metadata to IPFS');
  }
};
