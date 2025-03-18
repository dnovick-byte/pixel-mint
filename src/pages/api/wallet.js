import axios from 'axios';
export default async function handler(req, res) {

    if (req.method != "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    const wallet = "0xE5508FD606D6306a316A68a3218873eA9A91517c";
    const key = 'pk_live_54fec082-bbe6-4d26-9440-7b324e0ad10e';
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