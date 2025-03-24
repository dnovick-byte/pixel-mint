import axios from 'axios';
/* API route to view the details of an NFT, used to get image of NFT to show image 
 * (might not be needed for gallery to avoid cost of calling API each time, 
 * should look at cost of holding a database vs calling API each time)
 */
export default async function handler(req, res) {

    if (req.method != "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    const key = process.env.API_KEY;
    const options = {
        method: 'GET',
        url: 'https://api.verbwire.com/v1/nft/data/nftDetails',
        params: {
            contractAddress: /* */ add,
            tokenID: /* */ add,
            chain: 'sepolia',
            populateMetadata: false /* defaults to false*/
        },
        headers: {
            accept: 'application/json',
            'X-API-Key': key
        }
    };

    try {
        const response = await axios.request(options);
        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(500).json({ error: err.message});
    }
}