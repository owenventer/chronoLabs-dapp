// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/router';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../../components/RequestAirdrop';
import pkg from '../../../../package.json';

// Store
import useUserSOLBalanceStore from '../../../stores/useUserSOLBalanceStore';

export function EmployerDashView({ }){
  const wallet = useWallet();
  const { connection } = useConnection();

  //Link for company image
  const router = useRouter();
  const companyName=router.query.companyName;
  console.log(companyName);
  const imgLink="/"+companyName+"Logo.png"
  return (

    <div className="md:hero mx-auto p-5 m-10">
      {/* navigation buttons in top corners  */}
      <button className=" absolute top-20 right-10 shadow-lg bg-black text-neutral-content bg-opacity-50 rounded text-gray-100 py-2 px-2 "> My Employee Dashboard</button>
      <Link href="/"> <button className=" absolute top-20 left-10 shadow-lg bg-black text-neutral-content bg-opacity-50 rounded text-gray-100 py-2 px-2 ">Back</button> </Link>
      {/* Main div */}
      <div className="md:hero-content flex flex-col  items-center shadow-lg bg-black text-neutral-content bg-opacity-50 rounded mt-3">
        <Image src={imgLink} alt='chronoLabsMainLogo' width={250} height={250}/>
        {/* Button div */}
        <div className="grid grid-cols-2 m-1">
        <div><Link href="salesReport"><button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-2/3 m-2 mx-10 rounded"> Daily Reports</button></Link></div>
        <div><button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-2/3 m-2 mx-10 rounded"> Employee Reports</button></div>
        <div><button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-2/3 m-2 mx-10 rounded"> Tax Reports</button></div>
        <div><button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-2/3 m-2 mx-10 rounded"> Daily Activity</button></div>
        <div><button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-2/3 m-2 mx-10 rounded"> Manage Employee</button></div>

        </div>
      </div>
    </div>
  );
};
export default EmployerDashView;