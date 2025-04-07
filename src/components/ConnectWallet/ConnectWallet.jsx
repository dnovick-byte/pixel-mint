"use client"
import { useWallet } from '../../lib/WalletContext'
import { Profile } from './Profile'
import { WalletOptions } from './walletOptions'
import { useState, useEffect } from 'react'
import styles from './ConnectWallet.module.css'

export const ConnectWallet = () => {
  const { isConnected } = useWallet()
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Prevent hydration errors by only rendering after mounting
  useEffect(() => setMounted(true), [])
  
  // Close modal when connected
  useEffect(() => {
    if (isConnected) {
      setIsModalOpen(false)
    }
  }, [isConnected])
  
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  
  if (!mounted) {
    return <div className={styles.container}>Loading...</div>
  }
  
  return (
    <div className={styles.container}>
      {isConnected ? (
        <Profile />
      ) : (
        <button 
          className={styles.signInButton} 
          onClick={openModal}
        >
          Connect Wallet
        </button>
      )}
      
      {isModalOpen && !isConnected && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Connect Wallet</h3>
              <button className={styles.closeButton} onClick={closeModal}>×</button>
            </div>
            <WalletOptions />
          </div>
        </div>
      )}
    </div>
  )
};