import { convertIpfsUrl } from './ipfsurl';
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
};

export async function fetchNftsCached(limit = 8/*, revalidateTime = 0*/) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/fetch_nfts?limit=${limit}&orderBy=id`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!res.ok) throw new Error("Failed to fetch NFTs");

    return await res.json();
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
}

// Helper function for retrying with exponential backoff
async function fetchWithRetry(url, options, maxRetries = 3) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res;
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        // Exponential backoff: wait 2^i seconds
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }
  throw lastError;
}

export async function fetchOwnNFTS(address) {
  if (!address) {
    console.log("No wallet address provided");
    return [];
  }

  const baseUrl = 'https://api.verbwire.com/v1/nft/data/owned';
  const params = new URLSearchParams({
    walletAddress: address,
    chain: 'sepolia',
    tokenType: 'nft721',
    sortDirection: 'ASC',
    limit: '1000',
    page: '1'
  });

  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY
    }
  };

  try {    
    const res = await fetchWithRetry(`${baseUrl}?${params}`, options);
    const data = await res.json();
    
    if (!data.nfts || !Array.isArray(data.nfts)) {
      console.error('Invalid response format:', data);
      return [];
    }

    // Process NFTs in batches to avoid overwhelming the RPC
    const batchSize = 5;
    const nfts = data.nfts;
    const processedNfts = [];

    for (let i = 0; i < nfts.length; i += batchSize) {
      const batch = nfts.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(async (nft) => {
          try {
            const nftData = await fetchNFTData(nft.contractAddress, nft.tokenID);
            if (!nftData?.tokenURI) {
              console.warn(`Skipping NFT ${nft.tokenID} - invalid data`);
              return null;
            }

            const nftURI = nftData.tokenURI;
            const metadataRes = await fetchWithRetry(nftURI);
            const metadata = await metadataRes.json();

            return {
              ...nft,
              ...metadata,
              image: metadata.image ? convertIpfsUrl(metadata.image) : null
            };
          } catch (error) {
            console.error(`Error processing NFT ${nft.tokenID}:`, error);
            return null;
          }
        })
      );

      processedNfts.push(...batchResults.filter(Boolean));
    }

    return processedNfts;
  } catch (error) {
    console.error("Failed to fetch NFTs:", error);
    return [];
  }
}

export async function fetchNFTData(contractAddress, tokenId) {
  if (!contractAddress || !tokenId) {
    console.log("Need contract address and token id");
    return [];
  }

  const baseUrl = 'https://api.verbwire.com/v1/nft/data/nftDetails';
  const params = new URLSearchParams({
    contractAddress,
    chain: 'sepolia',
    tokenId,
  });

  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY
    }
  };

  try {
    
    const res = await fetch(`${baseUrl}?${params}`, options);
    
    if (!res.ok) {
      // For non-200 responses, try to get error details
      try {
        const errorData = await res.json();
        console.error('API error response:', errorData);
        throw new Error(errorData.message || `Failed with status: ${res.status}`);
      } catch (parseError) {
        throw new Error(`Failed with status: ${res.status}`);
      }
    }
    
    const data = await res.json();
    
    // Check different possible response formats
    if (data.nft_details) return data.nft_details;

    
    // If nothing matched, return the whole response and log it
    console.log('Unexpected data structure:', data);
    return data;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
}

