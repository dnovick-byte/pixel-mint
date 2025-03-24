import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, description, image } = req.body;

        console.log(req.body);

        // Ensure the required fields are provided
        if (!name || !description || !image) {
            return res.status(400).json({ message: 'Name, description, and image are required' });
        }

        try {
            // Create a new NFT
            const nft = await prisma.nFT.create({
                data: {
                    name,
                    description,
                    image,
                },
            });
            return res.status(201).json(nft);
        } catch (error) {
            console.error('Error creating NFT:', error); // Log the error to the console
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
    // Handle any other HTTP methods (if needed)
    return res.status(405).json({ message: 'Method Not Allowed' });
}