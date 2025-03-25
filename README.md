# PixelMint - Create and Own Your NFT

Welcome to **PixelMint**, a user-friendly application designed to help anyone—whether you're a beginner or experienced—create and mint your very own NFT (Non-Fungible Token). Our goal is to make blockchain technology and NFT creation accessible to everyone. With PixelMint, you can easily design your own digital collectible and mint it onto the blockchain with just a few clicks!

## Purpose

PixelMint aims to lower the barrier for people with no technical experience to get hands-on with blockchain technology. You can create your own unique digital collectible (NFT) and own it, all without needing to understand complex code or the technicalities of blockchain.

## Features

- **Create Digital Art**: Design your own artwork directly in the app.
- **Mint to Blockchain**: Mint your artwork as an NFT on the blockchain. <!-- - **Download and Share**: Once minted, you can download your NFT or share it with others.   - **Wallet Integration**: Easily connect your wallet to mint NFTs. -->
- **NFT Ownership**: You own your created NFT on the blockchain, making it unique and valuable.
- **Database Integration**: Prisma handles database interactions for artwork metadata and minting records.

## Technologies Used

PixelMint is built using the following technologies and tools:

- **Next.js**: A React framework used to build and serve the app with SSR (Server-Side Rendering) for optimal performance.
- **React**: The JavaScript library for building user interfaces. We use React components for a dynamic and interactive experience.
- **Lucide React Icons**: A collection of modern SVG icons used throughout the app for better UI/UX design.
- **HTML2Canvas**: A tool that allows us to capture the user's artwork as a canvas and convert it into an image that can be minted as an NFT.
- **Axios**: A promise-based HTTP client used to interact with external APIs, particularly for interacting with the VerbWire API.
- **VerbWire API**: This API helps us mint NFTs by uploading the artwork to the blockchain and managing the minting process.
- **Prisma**: Prisma is used as our database ORM (Object-Relational Mapping) tool. It helps us interact with the database efficiently and store information artwork metadata and minting records.

## How to Use

### Step 1: Create Your Artwork
- Start by designing your digital artwork using the tools provided in the app. You can draw, upload images, or modify existing artwork to fit your style.

### Step 2: Customize Your NFT
- Add a name and description that will make your NFT stand out.

### Step 3: Mint Your NFT
- Once you're satisfied with your artwork, click the **"Create My Digital Collectible"** button to mint it to the blockchain.
<!--
- You’ll need to connect your wallet to complete the minting process. If you don’t have a wallet yet, follow the instructions to set one up (e.g., MetaMask). -->

### Step 4: Own and Share Your NFT
- You’ll be the proud owner of a unique digital collectible on the blockchain!

## Demo
The app is live! You can try it out here: [Demo Link](https://pixel-mint.vercel.app/)

Note:
Some features are still in progress.

Feel free to provide feedback or report issues.

## Running the App Locally

To run PixelMint on your own local machine, follow these steps:

### Prerequisites
- **Node.js** (version 14 or higher)
- **npm** or **yarn** (package managers)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/pixel-mint.git
cd pixel-mint
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory and add the following:

```env
# VerbWire API Key
NEXT_PUBLIC_API_KEY=your_verbwire_api_key

# Prisma Database URL
DATABASE_URL=postgresql://yourusername:yourpassword@localhost:5432/yourdatabase?schema=public

# (Optional) Wallet Address
NEXT_PUBLIC_WALLET_ADDRESS=your_wallet_address
```

- Replace `your_verbwire_api_key` and `your_wallet_address` with your own details.
- Replace `yourusername`, `yourpassword`, and `yourdatabase` with the appropriate details for your Prisma database.

### 4. Set up the database
Prisma uses a schema to define the structure of your database. To set up your Prisma database, run the following commands:  
1. Generate the Prisma client:
```bash
npx prisma generate
```
2. Apply the migrations to your database:

```bash
npx prisma migrate dev
```

### 4. Run the app

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

You can now open the app in your browser at [http://localhost:3000](http://localhost:3000).

<!-- ## Contributing

We welcome contributions! If you want to contribute to PixelMint, feel free to open an issue or submit a pull request. Here's how you can contribute:

1. Fork the repository
2. Clone your forked repository
3. Create a new branch for your feature or bugfix
4. Commit your changes
5. Push your branch and open a pull request -->

## FAQ

### What is an NFT?

A **Non-Fungible Token (NFT)** is a type of digital asset that represents ownership or proof of authenticity of a unique item or artwork on the blockchain. NFTs can represent anything from digital artwork to collectibles, music, and more.

### Do I need to know anything about blockchain to use PixelMint?

No, PixelMint is designed to be easy to use with no prior knowledge of blockchain required. The app handles all the complex backend processes for you, and you only need to connect your wallet to mint your NFT.

### Which blockchain does PixelMint use?

PixelMint uses the **Sepolia** testnet for minting NFTs. This is a testing network for Ethereum and allows users to mint NFTs without spending real cryptocurrency. 

<!--
### How do I connect my wallet?

You can use a crypto wallet like **MetaMask** to connect to the app. After connecting your wallet, you’ll be able to mint your artwork as an NFT.
-->

<!--
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
-->

## Contributors
PixelMint is developed and maintained by:
- Daniel Novick
    - [Linkedin](https://www.linkedin.com/in/danielbnovick/)
    - [Portfolio](https://portfolio-sage-rho-14.vercel.app/)

## Next Steps
- Wallet Integration
    - Integrate crypto wallets such as Verbwire, Metamask, Coinbase, etc. 
    - To create a more fluid user experience
        - User does not have to manually input recipient address
    - To allow for more interactivity
        - Users can view all NFTs in wallet on the app
    - To create signed up users, community
        - Users who sign in with their wallet will be registered as users
        - Signed in users can have a username that can be used for an NFT "author"

- Mainnet integration
    - Allow for NFTS to be minted on real mainnets
    - Dropdown menu of chain that you can mint to

- Home page
    - more interactivity, animations as you scroll
    - More interesting hero
        - pixel colors background, interactive drawing rainbow colors?

- Gallery page
    - click on bottom right for more information
    - different filtering options: trending, recent(current default), etc.

- Wallet page
    - for signed in users, can view all nfts in wallet
    - can view all nfts owned that were minted on the site

- Database
    - Might want to store more properties for each nft, like an address, tokenID etc.

- Minting process
    - error handling for erroneous mint attempts
    - error warnings for entering blank name and descriptions
    - fix minting with no grid lines, for some reasons the picture still captures some
    - more and better error handling for when api fails

- How it works page
    - explain basics about blockchain, crypto, NFTs, our application, etc.