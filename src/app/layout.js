import { Footer } from '../components/Footer/Footer';
import { Providers } from './providers';
import styles from'./index.module.css';

export const metadata = {
  title: 'PixelMint',
  description: 'PixelMint Application',
}


export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
        <body className={styles.container}>
          <Providers>
              {children}
              <Footer />
          </Providers>
        </body>   
    </html>
  )
}
