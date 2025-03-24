import axios from 'axios';

// API route to view NFTs in user's wallet
// right now it is passing sepolia as a parameter, should create user input dropdown to dictate what chain it is
export default async function handler(req, res) {

    if (req.method != "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    const key = process.env.API_KEY;
    const wallet = process.env.WALLET_ADDRESS;
    const options = {
        method: 'GET',
        url: 'https://api.verbwire.com/v1/nft/data/owned',
        params: {
            walletAddress: wallet,
            chain: 'sepolia',
            tokenType: 'nft721',
            sortDirection: 'ASC',
            limit: '1000',
            page: '1'
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