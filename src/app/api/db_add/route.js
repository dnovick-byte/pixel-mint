import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Handle POST requests
export async function POST(req) {
    try {
        const body = await req.json();
        const { name, description, image } = body;


        if (!name || !description || !image) {
            console.error("Missing required fields");
            return NextResponse.json(
                { message: 'Name, description, and image are required' }, 
                { status: 400 }
            );
        }

        const nft = await prisma.NFT.create({
            data: { name, description, image },
        });

        return NextResponse.json(nft, { status: 201 });

    } catch (error) {
        console.error("Error creating NFT:", error);
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message }, 
            { status: 500 }
        );
    }
}