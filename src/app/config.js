import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors'

//const projectId = '6c1559f241df70585f03feeb13617ce9'

// Use a reliable RPC provider for Sepolia
const sepoliaRpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/demo'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    coinbaseWallet(),
    metaMask(),
//    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(sepoliaRpcUrl, {
      retryCount: 3, // Add retry logic
      retryDelay: 1000, // 1 second between retries
    }),
  },
})

