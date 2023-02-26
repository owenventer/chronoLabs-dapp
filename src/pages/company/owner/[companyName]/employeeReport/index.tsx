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
        <div className="grid grid-cols-1 m-1">
          <p className="block m-2 text-center text-lg font-la text-gray-900 dark:text-white">Employee Report</p>
          <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th>Employee Name</th>
                <th>Wallet</th>
                <th>Hours Worked (D)</th>
                <th>Hours Worked (W)</th>
                <th>Sales</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Sol Ana
                </th>
                <td>afkjhafkhfdjdjhf38hkah39h</td>
                <td>7</td>
                <td>27</td>
                <td>$309</td>
                <td>$1200</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Sol Ana
                </th>
                <td>afkjhafkhfdjdjhf38hkah39h</td>
                <td>7</td>
                <td>27</td>
                <td>$309</td>
                <td>$1200</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Sol Ana
                </th>
                <td>afkjhafkhfdjdjhf38hkah39h</td>
                <td>7</td>
                <td>27</td>
                <td>$309</td>
                <td>$1200</td>
              </tr>
            </tbody>
          </table>
          </div>
        
        </div>
      </div>
    </div>
  );
};
export default SalesReport;