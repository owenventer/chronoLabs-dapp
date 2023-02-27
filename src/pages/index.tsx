// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CompanyCard from "components/CompanyCard";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

export const HomeView: FC = ({}) => {
  const { publicKey, wallet } = useWallet();
  const { connection } = useConnection();

  return (
    <>
      {publicKey && (
        <>
          <div className="md:hero mx-auto p-5 m-10">
            <Link href="/newBusiness">
              <button className=" absolute top-20 right-10 shadow-lg bg-black bg-opacity-50 rounded text-gray-100 p-2 ">
                New Business
              </button>
            </Link>
            <div className="md:hero-content flex flex-col  items-center shadow-lg bg-black text-neutral-content bg-opacity-50 rounded mt-6">
              <Image
                src="/fullLogo.png"
                alt="chronoLabsMainLogo"
                width={250}
                height={250}
              />

              <div className="grid sm:grid-cols-1 m-1 md:grid-cols-2">
                <CompanyCard companyName={"solBeach"} />
                <CompanyCard companyName={"solStoreIt"} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default HomeView;
