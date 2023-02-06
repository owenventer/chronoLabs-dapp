// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/router';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';


export function SalesReport({ }){
  const wallet = useWallet();
  const { connection } = useConnection();

  //Link for company image
  const router = useRouter();
  const companyName=router.query.companyName;
  console.log(companyName);
  const imgLink="/"+companyName+"Logo.png"
  console.log(imgLink);
  return (

    <div className="md:hero mx-auto p-5 m-10">
      {/* navigation buttons in top corners  */}
    
      <Link href={`../${companyName}`}> <button className=" absolute top-20 left-10 shadow-lg bg-black  bg-opacity-50 rounded text-gray-100 py-2 px-2 ">Back</button> </Link>
      {/* Main div */}
      <div className="md:hero-content flex flex-col  items-center shadow-lg bg-black text-neutral-content bg-opacity-50 rounded mt-3">
        <Image src={imgLink} alt='chronoLabsMainLogo' width={250} height={250}/>
        {/* Button div */}
        <div className="grid grid-cols-1 md:grid-cols-2 m-1">
          <p className="block m-2 text-lg font-la text-gray-900 dark:text-white">Daily Sales Report</p>
          <p className="block m-2 text-lg font-medium text-gray-900 dark:text-white">Monthly Sales Report</p>
        
        </div>
      </div>
    </div>
  );
};
export default SalesReport;