"use client"

import { useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { useWallet } from '../../lib/WalletContext'
import { useState, useEffect } from 'react'
import styles from './Profile.module.css'

export const Profile = () => {
    const { address } = useWallet()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ 
        name: ensName,
        chainId: 1
    })

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    
    // Format address for display
    const formatAddress = (addr) => {
        if (!addr) return "";
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.avatarContainer}>
                {mounted && ensAvatar ? (
                    <img alt="ENS Avatar" src={ensAvatar} />
                ) : (
                    <div className={styles.avatarPlaceholder}></div>
                )}
            </div>
            
            <div className={styles.addressContainer}>
                {mounted && address ? (
                    ensName ? (
                        <span className={styles.ensName}>{ensName}</span>
                    ) : (
                        formatAddress(address)
                    )
                ) : (
                    "Connecting..."
                )}
            </div>
            
            <button 
                className={styles.disconnectButton}
                onClick={() => disconnect()}
                disabled={!mounted || !address}
            >
                Disconnect
            </button>
        </div>
    )
}