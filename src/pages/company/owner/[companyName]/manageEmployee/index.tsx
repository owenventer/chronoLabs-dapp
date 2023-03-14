// Next, React
import { FC, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { userData } from "../../../../../contexts/UserDataContext";

export const ManageEmployee: FC = ({}) => {
  //Link for company image
  const { nfts } = useContext(userData);
  const router = useRouter();
  const collectionID = router.query.collectionID;
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
    <div className="md:hero mx-auto p-5 m-10">
      {/* <div className="md:hero mx-auto grid h-full place-items-center "> */}
      <Link href={`../${collectionID}`}>
        {" "}
        <button className=" absolute top-20 left-10 shadow-lg bg-black  bg-opacity-50 rounded text-gray-100 py-2 px-2 ">
          Back
        </button>{" "}
      </Link>
      <div className="md:hero-content flex flex-col  items-center shadow-lg bg-black text-neutral-content bg-opacity-50 rounded mt-6">
        <Image
          src={imgLink}
          alt="chronoLabsMainLogo"
          width={250}
          height={250}
        />

        <div className="grid sm:grid-cols-1 m-1 md:grid-cols-4">
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Employee Name
            </label>
            <input
              type="text"
              id="businessName"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="Sol Ana"
              required
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Employee Type
            </label>
            <input
              type="text"
              id="country"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="Developer"
              required
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Pay
            </label>
            <input
              type="text"
              id="state"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="$4000"
              required
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Social Security #
            </label>
            <input
              type="text"
              id="businessType"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="xxx.xxx.xxx"
              required
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              State
            </label>
            <input
              type="text"
              id="EINNumber"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="CA"
              required
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Country
            </label>
            <input
              type="text"
              id="EINNumber"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="USA"
              required
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Start Date
            </label>
            <input
              type="text"
              id="EINNumber"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="06/01/2023"
              required
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Employee Status
            </label>
            <input
              type="text"
              id="EINNumber"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="Employed"
              required
            />
          </div>
        </div>

        <button className="bg-[#14F195] hover:hover:scale-105 text-black font-bold py-2 px-2 m-2 rounded">
          Update Employee
        </button>
      </div>
    </div>
  );
};
export default ManageEmployee;
