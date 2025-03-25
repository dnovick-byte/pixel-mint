import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, description, image } = req.body;

        console.log("Received request:", req.body);

        if (!name || !description || !image) {
            console.error("Missing required fields");
            return res.status(400).json({ message: 'Name, description, and image are required' });
        }

        try {
            console.log("Connecting to DB...");
            const nft = await prisma.nFT.create({
                data: { name, description, image },
            });
            console.log("NFT Created:", nft);
            return res.status(201).json(nft);
        } catch (error) {
            console.error("Error creating NFT:", error); 
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
    return res.status(405).json({ message: 'Method Not Allowed' });
}