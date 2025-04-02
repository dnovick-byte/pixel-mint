"use client"
import { useAccount } from 'wagmi'
import { Profile } from '../Profile/Profile'
import { WalletOptions } from './walletOptions'

export const ConnectWallet = () => {
  const { isConnected } = useAccount()
  // Make sure this component is wrapped in WalletProvider
  return (
    <>
      {isConnected ? <Profile /> : <WalletOptions />}
    </>
  )
};