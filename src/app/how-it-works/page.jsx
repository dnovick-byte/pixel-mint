"use client"
import { Header } from "../../components/Header/Header"
import styles from "./page.module.css"

export default function HowItWorks() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>How It Works</h1>
          
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Understanding Blockchain & Crypto</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>What is Blockchain?</h3>
                <p>Blockchain is a decentralized digital ledger that records transactions across many computers. It ensures security, transparency, and immutability of data without needing a central authority.</p>
              </div>
              <div className={styles.card}>
                <h3>What is Cryptocurrency?</h3>
                <p>Cryptocurrency is digital money that uses cryptography for security. It operates independently of a central bank and enables secure, peer-to-peer transactions on the blockchain.</p>
              </div>
              <div className={styles.card}>
                <h3>What are NFTs?</h3>
                <p>Non-Fungible Tokens (NFTs) are unique digital assets that represent ownership of specific items or content on the blockchain. Each NFT has distinct properties and cannot be exchanged on a one-to-one basis like cryptocurrencies.</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>About Our Platform</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3>Connect Your Wallet</h3>
                  <p>Start by connecting your crypto wallet to our platform. This allows you to create and mint your pixel art NFTs on the blockchain.</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3>Create Pixel Art</h3>
                  <p>Use our intuitive pixel art editor to design your unique artwork. Choose colors, draw patterns, and create something truly one-of-a-kind.</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3>Mint Your NFT</h3>
                  <p>Once you're happy with your creation, mint it as an NFT directly to your connected wallet. Your artwork will be permanently recorded on the blockchain.</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3>Explore the Gallery</h3>
                  <p>Browse through the gallery to see all NFTs created on our platform. Discover unique pixel art creations from our community of artists.</p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <div className={styles.mission}>
              <p>Our goal is to make pixel art creation and NFT minting accessible to everyone. We provide a simple, user-friendly platform for creating unique digital art and bringing it to life on the blockchain.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
} 