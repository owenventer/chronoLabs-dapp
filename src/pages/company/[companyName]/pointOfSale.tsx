// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { GenerateSolPay } from '../../../components/GenerateSolPay';
import { useRouter } from 'next/router';



export const PointOfSale: FC = ({ }) => {
    
  const wallet = useWallet();
  console.log(wallet);
  const { connection } = useConnection();

  const router = useRouter();
  const companyName=router.query.companyName;
  console.log(companyName);
  const imgLink="/"+companyName+"Logo.png"


  return (

    <div className="md:hero mx-auto m-10 p-5">
      {/* navigation buttons in top corners  */}
      <button className=" absolute top-20 right-10 shadow-lg bg-black bg-opacity-50 rounded text-gray-100 py-2 px-2 "> My Profile</button>
      <Link href="/"> <button className=" absolute top-20 left-10 shadow-lg bg-black bg-opacity-50 rounded text-gray-100 py-2 px-2 ">Back</button> </Link>
      {/* Main div */}
      <div className="md:hero-content flex flex-col  items-center shadow-lg bg-black text-neutral-content bg-opacity-50 rounded mt-3 md:px-10">
        <Image src={imgLink} alt='chronoLabsMainLogo' width={250} height={250}/>
        <div className="text-center px-12">
          <GenerateSolPay/>
        </div>
      </div>
    </div>

    
  );
};
export default PointOfSale;
