// Next, React
import { FC, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  toMetaplexFile,
  toBigNumber,
  walletAdapterIdentity,
  NftWithToken,
} from "@metaplex-foundation/js";
import * as fs from "fs";
import {
  Connection,
  clusterApiUrl,
  Keypair,
  Signer,
  PublicKey,
} from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { userData } from "../../../../../contexts/UserDataContext";

export const AddEmployee: FC = ({}) => {
  //Link for company image
  const { nfts } = useContext(userData);
  const router = useRouter();
  const collectionID = router.query.companyName;
  // console.log(collectionID);
  var imgLink = "/fullLogo.png";
  var companyName="";

  const nftObject = nfts.find((nft) => nft.collectionID === collectionID);

  if (nftObject) {
    const logo = nftObject.logo;
    const cName=nftObject.companyName;
    //console.log(logo); // prints the logo of the object with the given collection ID
    imgLink = "" + logo;
    companyName=cName;
  } else {
    console.log("Object not found");
  }

  //interfaces
  interface NftData {
    name: string;
    symbol: string;
    description: string;
    sellerFeeBasisPoints: number;
    imageFile: string;
  }

  interface CollectionNftData {
    name: string;
    symbol: string;
    description: string;
    sellerFeeBasisPoints: number;
    imageFile: string;
    isCollection: boolean;
    collectionAuthority: Signer;
  }

  //NFT variables
  const [employeeName, setEmployeeName] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [employeePay, setEmployeePay] = useState("");
  const [SSNum, setSSNum] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");

  const CLPrivateKey = JSON.parse(
    process.env.NEXT_PUBLIC_ChronoPK ?? ""
  ) as number[];
  const CLPubKey = Keypair.fromSecretKey(
    Uint8Array.from(CLPrivateKey)
  ).publicKey;
  //Metaplex connection
  const { publicKey, sendTransaction } = useWallet();
  const wallet = useWallet();

  //NFT information
  const nftData = {
    name: employeeName,
    symbol: employeeName[0] + employeeName[employeeName.length - 1],
    description:
      "The NFT for employee: " + employeeName + ". Powered by ChronoLabs.",

    sellerFeeBasisPoints: 0,
    imageFile:imgLink,
    
  };

  //Solana connection
  const connection = new Connection(process.env.NEXT_PUBLIC_RPC);

  //Metaplex Set up(User)
  const metaplexAdmin = Metaplex.make(connection)
    .use(keypairIdentity(Keypair.fromSecretKey(Uint8Array.from(CLPrivateKey))))
    .use(
      bundlrStorage({
        //mainnet right now, maybe devnet?
        address: "https://node1.bundlr.network",
        providerUrl: process.env.NEXT_PUBLIC_RPC,
        timeout: 60000,
      })
    );
      //admin metaplex instance
    const metaplex = Metaplex.make(connection)
    .use(walletAdapterIdentity(wallet))
    .use(
      bundlrStorage({
        //mainnet right now, maybe devnet?
        address: "https://node1.bundlr.network",
        providerUrl: process.env.NEXT_PUBLIC_RPC,
        timeout: 60000,
      })
    );

  async function uploadMetadata(
    metaplex: Metaplex,
    nftData: NftData
  ): Promise<string> {
   
    const { uri } = await metaplex.nfts().uploadMetadata({
      name: nftData.name,
      symbol: nftData.symbol,
      description: nftData.description,
      image: nftData.imageFile,
      attributes: [
        {
          trait_type: "Company Name",
          value: companyName,
        },
        {
          trait_type: "Employee Name",
          value: employeeName,
        },
        {
          trait_type: "Employee Type",
          value: employeeType,
        },
        {
          trait_type: "Pay",
          value: employeePay,
        },
        {
          trait_type: "Social Security #",
          value: SSNum,
        },
        {
          trait_type: "State",
          value: state,
        },
        {
          trait_type: "Country",
          value: country,
        },
        {
          trait_type: "Start Date",
          value: startDate,
        },
        {
          trait_type: "Employee Status",
          value: employeeStatus,
        },
      ],
    });

    // console.log("Metadata Uri:", uri);
    return uri;
  }

  //helper function to create an NFT (collection NFT)
  async function createCollectionNFT(
    metaplex: Metaplex,
    uri: string,
    nftData: NftData
  ): Promise<NftWithToken> {
    const { nft } = await metaplex.nfts().create(
      {
        uri: uri, // Metadata URI
        name: nftData.name,
        sellerFeeBasisPoints: nftData.sellerFeeBasisPoints,
        creators: [
          {
            address: CLPubKey,
            authority: {
              //B5N3Q9Fw3zijTA3ih87cNDbst7bJ7AfTri7XJPX9wTNg
              publicKey: CLPubKey,
              secretKey: Uint8Array.from(CLPrivateKey),
            },
            share: 0,
          },
          {
            address: wallet.publicKey,
            authority: wallet,
            share: 100,
          },
        ],
        symbol: nftData.symbol,
        collection: new PublicKey(collectionID),
        collectionAuthority:{
           publicKey: CLPubKey,
           secretKey: Uint8Array.from(CLPrivateKey),
        }
        
      },
      { commitment: "finalized" }
    );
    console.log(
      `Collection Mint: https://solscan.io/token/${nft.address.toString()}`
    );
    // await metaplexAdmin.nfts().verifyCollection({
    //   mintAddress:new PublicKey(nft.address),
    //   collectionMintAddress: new PublicKey(collectionID),
    //   isSizedCollection: true,
      
    // },{payer:wallet});
   

    return nft;
  }

  async function mintNFT() {
    // upload the NFT data and get the URI for the metadata
    const uri = await uploadMetadata(metaplex, nftData);

    // create an NFT using the helper function and the URI from the metadata
    const nft = await createCollectionNFT(metaplex, uri, nftData);
  }

  return (
    <div className="md:hero mx-auto p-5 m-10">
      <Link href={`../${collectionID}`}>
        <button className=" absolute top-20 left-10 shadow-lg bg-black  bg-opacity-50 rounded text-gray-100 py-2 px-2 ">
          Back
        </button>
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
              id="employeeName"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="Sol Ana"
              required
              onChange={(event) => setEmployeeName(event.target.value)}
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
              onChange={(event) => setEmployeeType(event.target.value)}
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Pay
            </label>
            <input
              type="text"
              id="Pay"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="$4000"
              required
              onChange={(event) => setEmployeePay(event.target.value)}
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
              onChange={(event) => setSSNum(event.target.value)}
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              State
            </label>
            <input
              type="text"
              id="State"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="CA"
              required
              onChange={(event) => setState(event.target.value)}
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Country
            </label>
            <input
              type="text"
              id="Country"
              className=" border text-sm rounded-lg block w-full p-2.5 bg-[#744f90] border-gray-600  text-white"
              placeholder="USA"
              required
              onChange={(event) => setCountry(event.target.value)}
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
              onChange={(event) => setStartDate(event.target.value)}
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
              onChange={(event) => setEmployeeStatus(event.target.value)}
            />
          </div>
        </div>

        <button
          className="bg-[#14F195] hover:hover:scale-105 text-black font-bold py-2 px-2 m-2 rounded"
          onClick={mintNFT}
        >
          Add Employee
        </button>
      </div>
    </div>
  );
};
export default AddEmployee;
