// Next, React
import { FC, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useSearchParams } from "next/navigation";
import { userData } from "../../../../contexts/UserDataContext";

export function EmployerDashView({}) {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { nfts } = useContext(userData);
  // const [imgLink,setImgLink]=useState("");

  //Link for company image
  const router = useRouter();
  const collectionID = router.query.companyName;
  console.log(collectionID);
  var imgLink = "/" + collectionID + "Logo.png";

  const nftObject = nfts.find((nft) => nft.collectionID === collectionID);

  if (nftObject) {
    const logo = nftObject.logo;
    console.log(logo); // prints the logo of the object with the given collection ID
    imgLink = "" + logo;
  } else {
    console.log("Object not found");
  }

  return (
    <div className="md:hero mx-auto p-5 m-10">
      {/* navigation buttons in top corners  */}
      <button className=" absolute top-20 right-10 shadow-lg bg-black bg-opacity-50 rounded text-gray-100 py-2 px-2 ">
        My Employee Dashboard
      </button>
      <Link href="/homeView">
        <button className=" absolute top-20 left-10 shadow-lg bg-black bg-opacity-50 rounded text-gray-100 py-2 px-2 ">
          Back
        </button>
      </Link>
      {/* Main div */}
      <div className="md:hero-content flex flex-col  items-center shadow-lg bg-black text-neutral-content bg-opacity-50 rounded mt-3">
        <Image src={imgLink} alt="Logo" width={250} height={250} />
        {/* Button div */}
        <div className="grid grid-cols-2 m-1">
          <div>
            <Link href={`${collectionID}/salesReport`}>
              <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-2/3 m-2 mx-10 rounded">
                Daily Reports
              </button>
            </Link>
          </div>
          <div>
            <Link href={`${collectionID}/employeeActivity`}>
              <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-2/3 m-2 mx-10 rounded">
                Employee Activity
              </button>
            </Link>
          </div>
          <div>
            <Link href={`${collectionID}/taxReport`}>
              <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-2/3 m-2 mx-10 rounded">
                Tax Reports
              </button>
            </Link>
          </div>
          <div>
            <Link href={`${collectionID}/dailyReport`}>
              <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-2/3 m-2 mx-10 rounded">
                Daily Activity
              </button>
            </Link>
          </div>
          <div>
            <Link href={`${collectionID}/manageEmployee`}>
              <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-2/3 m-2 mx-10 rounded">
                Manage Employee
              </button>
            </Link>
          </div>
          <div>
            <Link href={`${collectionID}/addEmployee`}>
              <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-2/3 m-2 mx-10 rounded">
                Add Employee
              </button>
            </Link>
          </div>
          <div>
            <Link href={`${collectionID}/employeeOverview`}>
              <button className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-2/3 m-2 mx-10 rounded">
                Employee Overview
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmployerDashView;
