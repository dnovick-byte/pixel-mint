"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config'
import { WalletProvider } from '../lib/WalletContext'

const queryClient = new QueryClient()

export function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <WalletProvider>
                {children}
            </WalletProvider>
        </QueryClientProvider>
    </WagmiProvider>
  )
}