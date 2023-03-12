// Next, React
import { FC, useEffect, useState,useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import {userData} from "../contexts/UserDataContext"
import { useRouter } from "next/router";


// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

export const SignIn: FC = ({}) => {
  const { publicKey, wallet } = useWallet();
  const { connection } = useConnection();

  const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
  );
  const router = useRouter();
  const {nfts,setNFTs}=useContext(userData);

  function getNFTs(){
    setNFTs(prevNFTs=>[...prevNFTs,{
    companyName: "solBeach",
    logo: "Test",
    numTasks:0,
    tasks: "Test[]",
    employeeName:"Test",
    employeeType:"Test",
    pay:"Test",
    ssNum:"Test",
    state:"Test",
    country:"Test",
    startDate:"Test",
    employeeStatus:"Test",
    }])
    router.push("/homeView")
  }

  return (
    <>
      
        <>
          <div className="md:hero mx-auto p-5 m-10">
            <div className="md:hero-content flex flex-col  items-center shadow-lg bg-black text-neutral-content bg-opacity-50 rounded mt-6">
              <Image
                src="/fullLogo.png"
                alt="chronoLabsMainLogo"
                width={250}
                height={250}
              />

              <div className="flex flex-col  items-center">
              {publicKey && (
               
                <button className="bg-[#14F195] hover:hover:scale-105 text-black font-bold py-2 px-2 m-2 rounded" onClick={getNFTs}> Sign In</button>
                
              )}
              {!publicKey && (
                <WalletMultiButtonDynamic className="btn-ghost btn-sm rounded-btn md:text-lg sm:text-xs " />
              )}
              </div>
            </div>
          </div>
        </>
      
    </>
  );
};
export default SignIn;
