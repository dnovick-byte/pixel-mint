import prisma from '@/lib/prisma';


export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { limit, orderBy } = req.query

        try {
            // Set the number of NFTs to fetch (default to 8 if no limit is provided)
            const nftsLimit = limit ? parseInt(limit) : 8
            // Set the field to order by (default to 'createdAt' if no orderBy is provided)
            const orderByField = orderBy || 'id'

            // Fetch NFTs ordered by a specific field and limited to the specified number
            const nfts = await prisma.nFT.findMany({
                take: nftsLimit, // Limit the number of results
                orderBy: {
                    [orderByField]: 'desc', // Change to 'asc' if you want ascending order
                },
            })
            
            return res.status(200).json(nfts)
        } catch (error) {
            console.error('Error fetching NFTs:', error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    // Handle other HTTP methods
    return res.status(405).json({ message: 'Method Not Allowed' })
}