/**
 * Converts an IPFS URL to an HTTP gateway URL
 * @param {string} ipfsUrl - The IPFS URL (e.g., 'ipfs://Qm...')
 * @param {string} gateway - Optional gateway to use (default: 'https://ipfs.io/ipfs/')
 * @returns {string} The HTTP gateway URL
 */
export function convertIpfsUrl(ipfsUrl, gateway = 'https://ipfs.io/ipfs/') {
    if (!ipfsUrl) return '';
    
    // Handle the case where the URL is already an HTTP URL
    if (ipfsUrl.startsWith('http')) {
      return ipfsUrl;
    }
    
    // Replace ipfs:// with the gateway
    if (ipfsUrl.startsWith('ipfs://')) {
      return ipfsUrl.replace('ipfs://', gateway);
    }
    
    // Handle CIDs without the ipfs:// prefix
    if (ipfsUrl.startsWith('Qm') || ipfsUrl.startsWith('baf')) {
      return `${gateway}${ipfsUrl}`;
    }
    
    // Return the original if it doesn't match any pattern
    return ipfsUrl;
  }