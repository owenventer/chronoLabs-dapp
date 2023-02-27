// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

export const NewBusiness: FC = ({}) => {
  return (
    <div className="md:hero mx-auto p-5 m-10">
      <Link href="/">
        <button className=" absolute top-20 left-10 shadow-lg bg-black text-neutral-content bg-opacity-50 rounded py-2 px-2 ">
          Back
        </button>
      </Link>
      <div className="md:hero-content flex flex-col  items-center shadow-lg bg-black text-neutral-content bg-opacity-50 rounded mt-6">
        <Image
          src="/fullLogo.png"
          alt="chronoLabsMainLogo"
          width={250}
          height={250}
        />

        <div className="grid sm:grid-cols-1 m-1 md:grid-cols-3">
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="Magic Eden"
              required
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Country
            </label>
            <input
              type="text"
              id="country"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="USA"
              required
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              State
            </label>
            <input
              type="text"
              id="state"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="CA"
              required
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Business Type
            </label>
            <input
              type="text"
              id="businessType"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="NFT Marketplace"
              required
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              EIN Number
            </label>
            <input
              type="text"
              id="EINNumber"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="xxx.xxx.xxx"
              required
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Upload Logo
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex rounded-lg flex-col w-full h-10 border-2 border bg-[#744f90] border-gray-600">
                <div className="flex flex-col items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="pt-1 w-8 h-8 text-gray-400 group-hover:text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input type="file" className="opacity-0 w-10" />
              </label>
            </div>
          </div>
        </div>

        <Link href={`/`}>
          <button className="bg-[#14F195] hover:hover:scale-105 text-black font-bold py-2 px-2 m-2 rounded">
            Create Business
          </button>
        </Link>
      </div>
    </div>
  );
};
export default NewBusiness;
