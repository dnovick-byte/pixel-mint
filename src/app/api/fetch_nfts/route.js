import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : 8;
  const orderByField = searchParams.get('orderBy') || 'id';

  try {
    const nfts = await prisma.nFT.findMany({
      take: limit,
      orderBy: {
        [orderByField]: 'desc',
      },
    });

    return NextResponse.json(nfts, { status: 200 });
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}