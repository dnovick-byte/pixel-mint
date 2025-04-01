import { Footer } from '../components/Footer/Footer';

export const metadata = {
  title: 'PixelMint',
  description: 'PixelMint Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}
