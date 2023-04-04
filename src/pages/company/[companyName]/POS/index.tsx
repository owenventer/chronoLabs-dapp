// Next, React
import { FC, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { userData } from "../../../../contexts/UserDataContext";
// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// Components
import { GenerateSolPay } from "../../../../components/GenerateSolPay";
import { useRouter } from "next/router";
import { Connection } from "@solana/web3.js";

export const PointOfSale: FC = ({}) => {
  const wallet = useWallet();
  console.log(wallet);
  const connection = new Connection(process.env.NEXT_PUBLIC_RPC);

  //Link for company image
  const { nfts } = useContext(userData);
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
      <Link href={`../${collectionID}`}>
        <button className=" absolute top-20 left-10 shadow-lg bg-black bg-opacity-50 rounded text-gray-100 py-2 px-2 ">
          Back
        </button>
      </Link>
      {/* Main div */}
      <div className="md:hero-content flex flex-col  items-center shadow-lg bg-black text-neutral-content bg-opacity-50 rounded mt-3 md:px-10">
        <Image
          src={imgLink}
          alt="chronoLabsMainLogo"
          width={250}
          height={250}
        />
        <div className="text-center px-12">
          <GenerateSolPay />
        </div>
      </div>
    </div>
  );
};
export default PointOfSale;
