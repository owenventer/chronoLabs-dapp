// Next, React
import { FC, useEffect, useState,useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import {userData} from "../contexts/UserDataContext"
import { useRouter } from "next/router";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey, type ParsedAccountData } from '@solana/web3.js';
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";


// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { GetProgramAccountsFilter } from "@solana/web3.js";

export const SignIn: FC = ({}) => {
  const { publicKey, wallet } = useWallet();
  const  connection = new Connection(process.env.NEXT_PUBLIC_RPC);
  //for helius
  const axios = require('axios')
  const url = "https://api.helius.xyz/v0/token-metadata?api-key="+process.env.NEXT_PUBLIC_APIKEY

  const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
  );
  const router = useRouter();
  const {nfts,setNFTs}=useContext(userData);

  async function getNFTs(){
   //code to get which NFTs are inside the wallet

  let NFTList=new Array()
  let companyList=new Array()
  await getUserNFT();
  async function getUserNFT(){
    
    console.log("Get NFT:"+publicKey);
    try {
        const filters:GetProgramAccountsFilter[] = [
          {
            dataSize: 165,    //size of account (bytes)
          },
          {
            memcmp: {
              offset: 32,     //location of our query in the account (bytes)
              bytes: ""+publicKey,  //our search criteria, a base58 encoded string
            }            
          }
       ];
       const accounts = await connection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID,   //SPL Token Program, new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
        {filters: filters}
      );
      console.log(`Found ${accounts.length} token account(s) for wallet ${publicKey}.`);
      //forLoop to go through all accounts 
      accounts.forEach((account, i) => {
        //Parse the account data
        const parsedAccountInfo:any = account.account.data;
        
        const mintAddress:string = parsedAccountInfo["parsed"]["info"]["mint"];
        
        //console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
        console.log(`--Token Mint: ${mintAddress}`);
        //console.log(`--Token Balance: ${tokenBalance}`);
        
        NFTList.push(mintAddress)
    });

    } catch (e) {
      console.log(`error getting NFTList: `, e);
    }

      console.log(`NFTList updated, `, NFTList);
      const getMetadata = async () => {
        const { data } = await axios.post(url, {
            mintAccounts: NFTList,
            includeOffChain: true,
        });
        console.log("metadata: ", data);
        
        data.forEach((nft,i)=>{
          
          if(data[i]["onChainMetadata"]["metadata"]["data"]["creators"][0]["address"]=="B5N3Q9Fw3zijTA3ih87cNDbst7bJ7AfTri7XJPX9wTNg" 
          && data[i]["onChainMetadata"]["metadata"]["data"]["creators"][0]["verified"]==true 
          //&& data[i]
          ){
          companyList=data[i]["account"]
          console.log(data[i]["account"])
          //add to the NFT List
          setNFTs(prevNFTs=>[...prevNFTs,{
            companyName: "solBeach",
            logo: "https://arweave.net/RXdY8D_qEEJis3s3DWAJ_OPWVhT6JS32W2wj3tS5W60",
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
            isCollection:true,
            }])


          }
        })
      };
      getMetadata();


  }



    
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
