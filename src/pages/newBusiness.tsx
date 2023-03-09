// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { Connection, clusterApiUrl, Keypair, Signer, PublicKey } from "@solana/web3.js";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { count } from "console";

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

export const NewBusiness: FC = ({}) => {
  // NFT attribute variables
  const [businessName, setBusinessName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [EINNumber, setEINNumber] = useState("");
  //handling the image
  const [imageUrl, setImageUrl] = useState("");
  function processImage(event) {
    const imgFile = event.target.files[0];
    const imgUrl = URL.createObjectURL(imgFile);
    setImageUrl(imgUrl);
  }
  const CLPrivateKey= JSON.parse(process.env.NEXT_PUBLIC_ChronoPK ?? "") as number[]
  const CLPubKey= Keypair.fromSecretKey(Uint8Array.from(CLPrivateKey)).publicKey
  //console.log("OUR PUBK: "+CLPubKey)
  //Metaplex connection
  const { publicKey, sendTransaction } = useWallet();
  const wallet = useWallet();
  console.log("connected wallet: "+wallet.publicKey);

  //NFT information
  const nftData = {
    name: businessName,
    symbol: businessName[0] + businessName[businessName.length-1],
    description: "The master NFT for " + businessName + " on ChronoLabs.",
   
    sellerFeeBasisPoints: 0,
    imageFile: imageUrl,
    isCollection: true,
    collectionAuthority: wallet.publicKey,
    
  };

  //Solana connection
  const connection = new Connection(process.env.NEXT_PUBLIC_RPC);

  
  //Metaplex Set up(should this be us or the user?)
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

  //Manage the button click
  function showValues() {
    console.log(businessName + country + state + businessType + EINNumber);
  }

  //helper function for uploading assets
  async function uploadMetadata(
    metaplex: Metaplex,
    nftData: NftData
  ): Promise<string> {
    //get image buffer from user input

    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "utf-8");

    // buffer to metaplex file (maybe error with Logo.png)
    const file = toMetaplexFile(buffer, nftData.imageFile);

    // upload image and get image uri
    const imageUri = await metaplex.storage().upload(file);
    console.log("Image URI:", imageUri);

    // upload metadata and get metadata uri (off chain metadata)
    const { uri } = await metaplex.nfts().uploadMetadata({
      name: nftData.name,
      symbol: nftData.symbol,
      description: nftData.description,
      image: imageUri,
      attributes:[
        {
          trait_type: "Business Name",
          value: businessName
        },
        {
          trait_type: "Country",
          value: country
        },
        {
          trait_type: "State",
          value: state
        },
        {
          trait_type: "Business Type",
          value: businessType
        },
        {
          trait_type: "EIN Number",
          value: EINNumber
        },
  
      ],
    });

    console.log("Metadata Uri:", uri);
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
        creators: [ {
          
          address: CLPubKey,
          authority: {
            //B5N3Q9Fw3zijTA3ih87cNDbst7bJ7AfTri7XJPX9wTNg
            publicKey: CLPubKey,
            secretKey:Uint8Array.from(CLPrivateKey)
        },
          share: 0,
        },{
          address: wallet.publicKey,
          authority: wallet,
          share: 100,
        }],
        symbol: nftData.symbol,
        isCollection: true,
        
      },
      { commitment: "finalized" }
    );

    console.log(
      `Collection Mint: https://solscan.io/token/${nft.address.toString()}`
    );

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
              onChange={(event) => setBusinessName(event.target.value)}
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
              onChange={(event) => setCountry(event.target.value)}
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
              onChange={(event) => setState(event.target.value)}
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
              onChange={(event) => setBusinessType(event.target.value)}
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
              onChange={(event) => setEINNumber(event.target.value)}
            />
          </div>
          <div className="m-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Upload Logo
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex rounded-lg flex-col w-full h-10 border-2 border bg-[#744f90] border-gray-600">
                <div className="flex flex-col items-center justify-center mx-auto">
                  {imageUrl ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="pt-1 w-8 h-8 text-[#14F195] group-hover:text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                      />
                    </svg>
                  ) : (
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
                  )}
                </div>
                <input
                  type="file"
                  className="opacity-0 w-10"
                  accept="image/*"
                  onChange={processImage}
                />
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={mintNFT}
          className="bg-[#14F195] hover:hover:scale-105 text-black font-bold py-2 px-2 m-2 rounded"
        >
          Create Business
        </button>
      </div>
      <Image src={imageUrl} width="250" height="250" alt="test"></Image>
    </div>
  );
};
export default NewBusiness;
