This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Next Steps (no particular order)
- Implement database to hold imageurl, name, description, opensea link for each nft minted, so you can list them in the gallery. Have the database hold these and not the key or ID so you do not need to make API call for each one every time
- implement mint nft api
- implement sign in with wallet(some way to know what wallet to send to when nft is minted)
- fix styling for what is around the grid on the draw page
- edit the tips
- maybe make the preview picture smalelr
- make the final page picture smaller maybe like above

## Next Steps (ordered)
- Implement the mint API
    - first manually input wallet id on sepolia
    - then log in with verbwire wallet and automatically mint it to logged in wallet on sepolia
    - dropdown menu of testnets that you can mint to
    - link to verbwire wallet to view it

- Implement Database
    - Store imageurl, name, description, author? each time an NFT is minted

- Implement gallery view (dependent on database functionality)
- Recently created artwork on home page (small gallery)
- How ir works page