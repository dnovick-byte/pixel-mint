import axios from 'axios';
export default async function handler(req, res) {

    if (req.method != "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    const key = 'pk_live_54fec082-bbe6-4d26-9440-7b324e0ad10e';
    const options = {
        method: 'GET',
        url: 'https://api.verbwire.com/v1/nft/data/nftDetails',
        params: {
            contractAddress: /* */ add,
            tokenID: 'sepolia',
            chain: 'nft721',
            populateMetadata: 'ASC'
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