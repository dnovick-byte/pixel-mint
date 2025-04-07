"use client"
import { createContext, useContext } from "react"
import { useAccount } from "wagmi"

const WalletContext = createContext()

export function WalletProvider({ children }) {
    const { address, isConnected } = useAccount()

    return (
        <WalletContext.Provider value={{ address, isConnected }}>
            {children}
        </WalletContext.Provider>
    )
}

export function useWallet() {
    return useContext(WalletContext)
}