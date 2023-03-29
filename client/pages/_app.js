import '@/styles/globals.css'
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Toaster } from 'react-hot-toast';
import { Mumbai, Polygon } from "@thirdweb-dev/chains";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={Mumbai}
      chains={[Polygon, Mumbai]}>
      <Component {...pageProps} />
      <Toaster />
    </ThirdwebProvider>
  )
}
