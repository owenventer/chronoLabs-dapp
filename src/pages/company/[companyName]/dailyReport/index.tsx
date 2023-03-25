// Next, React
import { FC, useEffect, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { userData } from "../../../../contexts/UserDataContext";
import moment from 'moment';

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";

export function DailyReport({}) {
  const wallet = useWallet();
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




  if (nftObject) {
    const logo = nftObject.logo;
    //console.log(logo); // prints the logo of the object with the given collection ID
    imgLink = "" + logo;
  } else {
    console.log("Object not found");
  }
  const [msgs,setMsgs]=useState([]);
  const [validMsgs,setValidMsgs]=useState([]);
  const [tableVisible,setTableVisible]=useState(false);
  

  async function fetchMemo() {
    
    const walletPubKey = wallet.publicKey;
    let userSignatures = await connection.getSignaturesForAddress(walletPubKey);
    let adminSignatures = await connection.getSignaturesForAddress(new PublicKey("B5N3Q9Fw3zijTA3ih87cNDbst7bJ7AfTri7XJPX9wTNg"));
    const validSigs= userSignatures.filter(item1 => adminSignatures.some(item2 => item1.signature === item2.signature));

    // const newMsgs=[];
    // for (let i = 0; i < userSignatures.length; i++) {
    //   const signers=await (await connection.getParsedTransaction(userSignatures[i].signature)).transaction.message.accountKeys.filter(a => a.signer).map(a => a.pubkey.toBase58());
    //    if(signers.includes("B5N3Q9Fw3zijTA3ih87cNDbst7bJ7AfTri7XJPX9wTNg")){
    //     console.log("VALID SIGNER")
    //     newMsgs.push(userSignatures[i]);
    //   }
    // }
    //await (await connection.getParsedTransaction(userSignatures[0].signature)).transaction.message.accountKeys.filter(a => a.signer).map(a => a.pubkey.toBase58())
    
    setValidMsgs(validSigs.filter((msg) => (msg.memo ?? "").includes(String(collectionID))))
    for (let i = 0; i < validMsgs.length; i++) {
      console.log(validMsgs[i]);
    }
    setTableVisible(true);

    //TO DO:
    //1. Get all the transactions for the user
    //2. Filter out the transactions that are not for the company
    //3. Get the messages from the memo and map them to a list
    //4. Display all the messages
}

  return (
    <>
    <Link href={`../${collectionID}`}>
        {" "}
        <button className=" relative top-5 left-5 shadow-lg bg-black  bg-opacity-50 rounded text-gray-100 p-2 ">
          Back
        </button>{" "}
      </Link>
    
    <div className="md:hero mx-auto p-5 m-5">
      {/* navigation buttons in top corners  */}

      
      {/* Main div */}
      <div className="md:hero-content flex flex-col  items-center shadow-lg bg-black text-neutral-content bg-opacity-50 rounded mt-3 ">
        <Image
          src={imgLink}
          alt="chronoLabsMainLogo"
          width={250}
          height={250}
        />
        {/* Button div */}
        <div className="grid grid-cols-1 m-1">
          
          <p className="block text-center text-2xl font-la text-white-200">
            Activity Log
          </p>
          <section className="container mx-auto p-6 font-mono">
            <div className="w-full mb-8 overflow-hidden  shadow-lg">
              <div className=" flex justify-center overflow-x-auto table-fixed"> 
              {tableVisible ?(
              <table className="text-center table-fixed">
                  <thead>
                    <tr className="text-md font-semibold tracking-wide text-left text-white-200 bg-[#1B161D] bg-opacity-60 uppercase">
                      <th className="px-4 py-3 border-[#9477B7] border text-center">Date</th>
                      <th className="px-4 py-3 border-[#9477B7] border text-center">Activity</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-700 bg-opacity-60">
                  {validMsgs.map((str, i) => (
                    <tr key={i}>
                       <td className="px-4 py-3 border border-[#9477B7]">{moment.unix(str.blockTime).format("YYYY-MM-DD HH:mm:ss")}</td>
                       <td className="px-4 py-3 border border-[#9477B7]">{str.memo.split("#")[1]}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>)
                :null}              
                
              </div>
            </div>
          </section>
          <div className="flex justify-center items-center">
          <button onClick={fetchMemo} className=" bg-[#14F195] hover:scale-105 text-black font-bold p-2 rounded"> Get Activity Log</button>
          </div>
          


        </div>
      </div>
    </div>
    </>
  );
}
export default DailyReport;





