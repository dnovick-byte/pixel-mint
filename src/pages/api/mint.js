import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

    const api_key = 'pk_live_54fec082-bbe6-4d26-9440-7b324e0ad10e';
    const wallet = '0xE5508FD606D6306a316A68a3218873eA9A91517c';
  
    try {
        const { imagePath, name, description } = req.body; // Get image file path and NFT metadata

        const formData = new FormData();
        formData.append("filePath", fs.createReadStream(imagePath));
        formData.append("name", name);
        formData.append("description", description);
        formData.append("recipientAddress", wallet);
        formData.append("chain", "sepolia");
        formData.append("allowPlatformToOperateToken", "true");

        const url = "https://api.verbwire.com/v1/nft/mint/quickMintFromFile";

/*
        formData.append()
        formData.append('allowPlatformToOperateToken', 'true');
        formData.append('chain', 'sepolia');
        formData.append('metadataUrl', 'https://ipfs.io/ipfs/bafkreigjkcafrutdcbicyr3new6aoowgbscf6wgqyty45ckd3xur7ymldm');
        const url = 'https://api.verbwire.com/v1/nft/mint/quickMintFromMetadataUrl';

*/

        const options = {
          method: 'POST',
          url: url,
          headers: {
            'X-API-Key': 'pk_live_54fec082-bbe6-4d26-9440-7b324e0ad10e',
            ...formData.getHeaders()

          },
          data: formData
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.send(JSON.stringify(response.data))
          })
          .catch(function (error) {
            console.log(error);
          });
        
        /*axios
          .request(options)
          .then(res => console.log(res.data))
          .catch(err => console.error(err));*/
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  