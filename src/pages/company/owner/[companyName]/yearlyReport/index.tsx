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
          <p className="block m-2 text-center text-2xl font-la text-white-200">Yearly Report</p>
          <section className="container mx-auto p-6 font-mono">
            <div className="w-full mb-8 overflow-hidden  shadow-lg">
              <div className="w-full overflow-x-auto table-fixed">
                <table className="w-full">
                  <thead>
                    <tr className="text-md font-semibold tracking-wide text-left text-white-200 bg-gray-500 uppercase">
                      <th className="px-4 py-3 border">Employee Name</th>
                      <th className="px-4 py-3 border">Payroll Taxes</th>
                      <th className="px-4 py-3 border">Local Taxes</th>
                      <th className="px-4 py-3 border">State Taxes</th>
                      <th className="px-4 py-3 border">Federal Taxes</th>
                      
                    </tr>
                  </thead>
                  <tbody className="bg-gray-700">
                    <tr className="text-gray-100">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          {/* We can add images if we want to:
                           <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                          </div> */}
                          <div>
                            <p className="font-semibold text-gray-100">Sol Ana</p>
                            
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3  border">$104</td>
                      <td className="px-4 py-3  border">$104</td>
                      <td className="px-4 py-3  border">$104</td>
                      <td className="px-4 py-3  border">$104</td>
                      
                    </tr>
                    <tr className="text-gray-100">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          {/* We can add images if we want to:
                           <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1$1040" alt="" loading="lazy" />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                          </div> */}
                          <div>
                            <p className="font-semibold text-gray-100">Sol Ana</p>
                            
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3  border">$104</td>
                      <td className="px-4 py-3  border">$104</td>
                      <td className="px-4 py-3  border">$104</td>
                      <td className="px-4 py-3  border">$104</td>
                      
                    </tr>
                    <tr className="text-gray-100">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          {/* We can add images if we want to:
                           <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1$1040" alt="" loading="lazy" />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                          </div> */}
                          <div>
                            <p className="font-semibold text-gray-100">Sol Ana</p>
                            
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3  border">$104</td>
                      <td className="px-4 py-3  border">$104</td>
                      <td className="px-4 py-3 border">$104</td>
                      <td className="px-4 py-3 border">$104</td>
                      
                    </tr>
                   
                    
                    
                   
                   
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        
        </div>
      </div>
    </div>
  );
};
export default SalesReport;