import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const { file } = body; // Base64 file from client

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Convert base64 to a Blob-like buffer
        const buffer = Buffer.from(file.split(',')[1], 'base64');

        const formData = new FormData();
        formData.append('filePath', new Blob([buffer]), 'canvas-file.png');

        const response = await fetch('https://api.verbwire.com/v1/nft/store/file', {
            method: 'POST',
            headers: {
                'X-API-Key': process.env.NEXT_PUBLIC_API_KEY, // Store API key in .env
            },
            body: formData,
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to upload');

        return NextResponse.json({ ipfsUrl: data.ipfs_storage.ipfs_url }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}