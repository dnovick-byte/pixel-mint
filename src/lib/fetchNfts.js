export async function fetchNfts(limit = 8, revalidateTime = 0) {
  try {
    const fetchOptions = revalidateTime
      ? { next: { revalidate: revalidateTime } } // For HomePage, use revalidation
      : { cache: "no-store" }; // For GalleryPage, always fetch fresh data


    const url = limit
      ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/fetch_nfts?limit=${limit}&orderBy=id`
      : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/fetch_nfts`;


    const res = await fetch(url, fetchOptions);

    if (!res.ok) throw new Error("Failed to fetch NFTs");

    return await res.json();
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
}
