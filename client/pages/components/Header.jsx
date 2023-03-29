import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";

function Header() {
  return (
    <div className='header-container'>
        <h3 className='header-logo'>FIR Portal 3.0</h3>
        <ConnectWallet accentColor='blue' colorMode='light'/>

    </div>
  )
}

export default Header