// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CompanyCard from 'components/CompanyCard';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../components/RequestAirdrop';
import pkg from '../../package.json';

// Store
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore';

export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  return (

    <div className="md:hero mx-auto p-2 m-5">
      <button className=" absolute top-20 right-10 shadow-lg bg-black text-neutral-content bg-opacity-50 rounded text-gray-100 py-2 px-2 "> New Business</button>
      <div className="md:hero-content flex flex-col  items-center shadow-lg bg-black text-neutral-content bg-opacity-50 rounded mt-3">
        <Image src='/fullLogo.png' alt='chronoLabsMainLogo' width={250} height={250}/>
          
        
        <div className="flex items-center justify-center pb-6">
          <CompanyCard
          companyName={"solBeach"}/>
           <CompanyCard
          companyName={"solStoreIt"}/>
          
       
        </div>
        
       
      </div>
    </div>
  );
};
export default HomeView;
