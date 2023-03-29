import Head from 'next/head'
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import Header from './components/Header';
import Complaint from './components/Complaint';

export default function FIRPortal() {
  const address = useAddress();
  return (
    <>
      <Head>
        <title>FIR Portal Web3.0</title>
        <meta name="description" content="Decentralized FIR Portal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Complaint />
    </>
  )
}
