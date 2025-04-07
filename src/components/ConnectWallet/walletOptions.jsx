"use client"
import * as React from 'react'
import { Connector, useConnect } from 'wagmi'
import { useState, useEffect } from 'react'
import styles from './WalletOptions.module.css'

export function WalletOptions() {
  const { connectors, connect } = useConnect()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className={styles.loadingText}>Loading wallet options...</div>

  return (
    <div className={styles.walletOptions}>
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </div>
  )
}

function WalletOption({ connector, onClick }) {
    const [ready, setReady] = useState(false)

    useEffect(() => {
      (async () => {
        try {
            const provider = await connector.getProvider()
            setReady(!!provider)
        } catch (e) {
            console.error(`Error getting provider for ${connector.name}:`, e)
            setReady(false)
        }
      })()
    }, [connector])

    // Get wallet icon based on connector name
    const getWalletIcon = (name) => {
      const lowerName = name.toLowerCase()
      if (lowerName.includes('metamask')) return '🦊'
      if (lowerName.includes('coinbase')) return '🔵'
      if (lowerName.includes('wallet connect')) return '🔗'
      if (lowerName.includes('injected')) return '🔌'
      return '👛'
    }

    return (
      <button 
        className={styles.walletOptionButton}
        disabled={!ready} 
        onClick={onClick}
      >
        <span className={styles.walletIcon}>{getWalletIcon(connector.name)}</span>
        {connector.name}
      </button>
    )
}