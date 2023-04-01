// Next, React
import { FC, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { userData } from "../../../../../contexts/UserDataContext";
import {
  PublicKey,
  Connection,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  TransactionSignature,
  TransactionMessage,
  VersionedTransaction,
  TransactionInstruction,
  Keypair,
} from "@solana/web3.js";
// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Metaplex } from "@metaplex-foundation/js";
import { notify } from "utils/notifications";
import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
} from "@solana/spl-token";
import { PayEmployee } from "components/payEmployee";

type nftType = {
  companyName: string;
  logo: string;
  numTasks: number;
  tasks: string[];
  employeeName: string;
  employeeType: string;
  pay: string;
  ssNum: string;
  state: string;
  country: string;
  startDate: string;
  employeeStatus: string;
  isCollection: boolean;
  businessType: string;
  einNumber: string;
  collectionID: string;
  nftMint: string;
};

export function EmployeeOverview({}) {
  const wallet = useWallet();
  const { publicKey, sendTransaction } = useWallet();
  const connection = new Connection(process.env.NEXT_PUBLIC_RPC);
  const metaplex = new Metaplex(connection);

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
  const [emps, setEmps] = useState<nftType[]>([]);
  const [mintList, setMintList] = useState([]);
  let NFTList = new Array();

  async function getEmployees() {
    NFTList = [];
    setEmps([]);
    const axios = require("axios");

    const url = `https://api.helius.xyz/v1/mintlist?api-key=${process.env.NEXT_PUBLIC_APIKEY}`;

    const getMintlist = async () => {
      const { data } = await axios.post(url, {
        query: {
          // ABC collection
          verifiedCollectionAddresses: [`${collectionID}`],
        },
        options: {
          limit: 10000,
        },
      });
      //console.log("Mintlist: ", data.result);
      data.result.forEach((nft, i) => {
        console.log("Inside for loop: " + nft["mint"]);
        NFTList.push(nft["mint"]);
      });
    };
    await getMintlist();

    console.log("mintlist:" + NFTList);

    //get metadata

    const url2 = `https://api.helius.xyz/v0/token-metadata?api-key=${process.env.NEXT_PUBLIC_APIKEY}`;
    //const nftAddresses = mintList
    const getMetadata = async () => {
      const { data } = await axios.post(url2, {
        mintAccounts: NFTList,
        includeOffChain: true,
        disableCache: false,
      });
      console.log("metadata: ", data);
      data.forEach((nft, i) => {
        // companyList = data[i]["account"];
        console.log(i);
        //console.log(nft["offChainMetadata"]["metadata"]["attributes"]);
        const offChainAttributes =
          nft["offChainMetadata"]["metadata"]["attributes"];
        const attributes = offChainAttributes.map((item) => ({
          type: item.trait_type,
          value: item.value,
        }));
        console.log(attributes);

        setEmps((prevEmps) => [
          ...prevEmps,
          {
            companyName: attributes?.find(
              (item) => item.type === "Company Name"
            )?.value,
            logo: nft["offChainMetadata"]["uri"]["image"],
            numTasks: attributes?.length,
            tasks: attributes?.map((item) => item.type),
            employeeName: attributes?.find(
              (item) => item.type === "Employee Name"
            )?.value,
            employeeType: attributes?.find(
              (item) => item.type === "Employee Type"
            )?.value,
            pay: attributes?.find((item) => item.type === "Pay")?.value,
            ssNum: attributes?.find((item) => item.type === "Social Security #")
              ?.value,
            state: attributes?.find((item) => item.type === "State")?.value,
            country: attributes?.find((item) => item.type === "Country")?.value,
            startDate: attributes?.find((item) => item.type === "Start Date")
              ?.value,
            employeeStatus: attributes?.find(
              (item) => item.type === "Employee Status"
            )?.value,
            isCollection: false,
            businessType: null,
            einNumber: null,
            collectionID:
              nft["onChainMetadata"]["metadata"]["collection"]["key"],
            ownerAddress: nft["onChainMetadata"]["metadata"]["owner"],
            nftMint: nft["account"],
          },
        ]);
      });
    };
    await getMetadata();
  }
  console.log(emps);

  return (
    <div className="md:hero mx-auto p-5 m-10">
      {/* navigation buttons in top corners  */}

      <Link href={`../${collectionID}`}>
        <button className=" absolute top-20 left-10 shadow-lg bg-black  bg-opacity-50 rounded text-gray-100 py-2 px-2 ">
          Back
        </button>
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
        <div className="grid grid-cols-1 m-1">
          <p className="block m-2 text-center text-2xl font-la text-white-200">
            Employee Report
          </p>
          <section className="container mx-auto p-6 font-mono">
            <div className="w-full mb-8 overflow-hidden  shadow-lg">
              <div className="w-full overflow-x-auto table-fixed">
                <table className="w-full">
                  <thead>
                    <tr className="text-md font-semibold tracking-wide text-left text-white-200 bg-[#1B161D] bg-opacity-60 uppercase">
                      <th className="px-4 py-3 border border-[#9477B7]">
                        Employee Name
                      </th>
                      <th className="px-4 py-3 border border-[#9477B7]">
                        Role
                      </th>
                      <th className="px-4 py-3 border border-[#9477B7]">Pay</th>
                      <th className="px-4 py-3 border border-[#9477B7]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-700 bg-opacity-60 overflow-auto">
                    {emps.map((emp, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3 border border-[#9477B7]">
                          {emp.employeeName}
                        </td>
                        <td className="px-4 py-3 border border-[#9477B7]">
                          {emp.employeeType}
                        </td>
                        <td className="px-4 py-3 border border-[#9477B7]">
                          {emp.pay}
                        </td>
                        <td className="px-4 py-3 text-sm border border-[#9477B7]">
                          <div className="flex">
                            <Link href={`${collectionID}/addEmployee`}>
                              <button
                                className="bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-2/3  mx-5 rounded disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                disabled
                              >
                                View
                              </button>
                            </Link>

                            <PayEmployee nft={emp} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={getEmployees}
            className=" bg-[#14F195] hover:scale-105 text-black font-bold p-2 rounded"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
export default EmployeeOverview;
