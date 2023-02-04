// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/router';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

export function EmployeeDashView({ }){
  const wallet = useWallet();
  const { connection } = useConnection();

  //Link for company image
  const router = useRouter();
  const companyName=router.query.companyName;
  console.log(companyName);
  const imgLink="/"+companyName+"Logo.png"
  return (

    <div className="md:hero mx-auto m-10 p-5">
      {/* navigation buttons in top corners  */}
      <button className=" absolute top-20 right-10 shadow-lg bg-black text-neutral-content bg-opacity-50 rounded text-gray-100 py-2 px-2 "> My Profile</button>
      <Link href="/"> <button className=" absolute top-20 left-10 shadow-lg bg-black text-neutral-content bg-opacity-50 rounded text-gray-100 py-2 px-2 ">Back</button> </Link>
      {/* Main div */}
      <div className="md:hero-content flex flex-col  items-center shadow-lg bg-black text-neutral-content bg-opacity-50 rounded mt-3">
        <Image src={imgLink} alt='chronoLabsMainLogo' width={250} height={250}/>
        {/* Button div */}
        <div className="grid sm:grid-cols-1 m-1 md:grid-cols-2">
          <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-3/4 m-2 mx-10 rounded"> Clock In</button>
          <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-3/4 m-2 mx-10 rounded"> Clock Out</button>
          <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-3/4 m-2 mx-10 rounded"> Pick up Pizza</button>
          <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-3/4 m-2 mx-10 rounded"> Deliver Pizza</button>
          <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-3/4 m-2 mx-10 rounded"> Back at Restaurant</button>
          <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-3/4 m-2 mx-10 rounded"> POS Terminal</button>
        </div>
      </div>
    </div>
  );
};
export default EmployeeDashView;