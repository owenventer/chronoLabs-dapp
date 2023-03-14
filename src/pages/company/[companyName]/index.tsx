// Next, React
import { FC, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { PerformAction } from "components/performAction";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { userData } from "../../../contexts/UserDataContext";

export function EmployeeDashView({}) {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { nfts } = useContext(userData);

  //Link for company image
  const router = useRouter();
  const collectionID = router.query.companyName;
  console.log(collectionID);
  var imgLink = "/fullLogo.png";

  const nftObject = nfts.find((nft) => nft.collectionID === collectionID);

  if (nftObject) {
    const logo = nftObject.logo;
    console.log(logo); // prints the logo of the object with the given collection ID
    imgLink = "" + logo;
  } else {
    console.log("Object not found");
  }

  return (
    <div className="md:hero mx-auto m-10 p-5">
      {/* navigation buttons in top corners  */}
      <button className=" absolute top-20 right-10 shadow-lg bg-black bg-opacity-50 rounded text-gray-100 py-2 px-2 ">
        My Profile
      </button>
      <Link href="/homeView">
        <button className=" absolute top-20 left-10 shadow-lg bg-black bg-opacity-50 rounded text-gray-100 py-2 px-2 ">
          Back
        </button>{" "}
      </Link>
      {/* Main div */}
      <div className="md:hero-content flex flex-col  items-center shadow-lg bg-black text-neutral-content bg-opacity-50 rounded mt-3">
        <Image
          src={imgLink}
          alt="chronoLabsMainLogo"
          width={250}
          height={250}
        />
        {/* Button div */}
        <div className="grid sm:grid-cols-1 m-1 md:grid-cols-2">
          <PerformAction message={'Clock In'}></PerformAction> 
          <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-3/4 m-2 mx-10 rounded">
            {" "}
            Clock Out
          </button>
          <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-3/4 m-2 mx-10 rounded">
            {" "}
            Pick up Pizza
          </button>
          <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-3/4 m-2 mx-10 rounded">
            {" "}
            Deliver Pizza
          </button>
          <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-3/4 m-2 mx-10 rounded">
            {" "}
            Back at Restaurant
          </button>
          <Link href={`${collectionID}/POS`}>
            <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-3/4 m-2 mx-10 rounded">
              {" "}
              POS Terminal
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default EmployeeDashView;
