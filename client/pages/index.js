import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function FIRPortal() {
  return (
    <>
      <Head>
        <title>FIR Portal Web3.0</title>
        <meta name="description" content="Decentralized FIR Portal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold">
      Hello world!
    </h1>
    </>
  )
}
