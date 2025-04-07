import { Footer } from '../components/Footer/Footer';
//import { WalletProvider } from "../lib/wagmiConfig"; // wrapped innerbody with WalletProvider
import { Providers } from './providers'; // We'll create this


export const metadata = {
  title: 'PixelMint',
  description: 'PixelMint Application',
}


export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
        <body>
          <Providers>
              {children}
              <Footer />
          </Providers>
        </body>   
    </html>
  )
}
