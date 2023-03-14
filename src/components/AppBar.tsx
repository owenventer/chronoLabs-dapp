import { FC } from 'react';
import Link from "next/link";
import dynamic from 'next/dynamic';
import React, { useState } from "react";
import { useAutoConnect } from '../contexts/AutoConnectProvider';
import NetworkSwitcher from './NetworkSwitcher';
import NavElement from './nav-element';
import Image from 'next/image';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export const AppBar: React.FC = () => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div>
      {/* NavBar / Header */}
      <div className="navbar flex h-10 flex-row md:mb-2 shadow-lg bg-black text-neutral-content bg-opacity-50">
        <div className="navbar-start align-items-center">
          <div className="sm:inline w-22 h-22 md:p-2 ml-10">
            <Link href={'/'}>
            <Image src='/miniLogo.png' alt='chronoLabsLogo' width={50} height={50}></Image>
            </Link>
          </div>
          
        </div>

        {/* Nav Links */}
        {/* Wallet & Settings */}
        <div className="navbar-end">
          <div className="md:inline-flex align-items-center justify-items gap-6 text-gray-300">
          
          <WalletMultiButtonDynamic className="btn-ghost btn-sm rounded-btn md:text-lg sm:text-xs mr-6 " />
        
        
          </div>
        
        </div>
      </div>
    </div>
  );
};
