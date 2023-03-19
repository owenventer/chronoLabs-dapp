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
    //console.log(logo); // prints the logo of the object with the given collection ID
    imgLink = "" + logo;
  } else {
    console.log("Object not found");
  }
  const [msgs,setMsgs]=useState([]);
  const [validMsgs,setValidMsgs]=useState([]);
  

  async function fetchMemo() {
    const walletPubKey = wallet.publicKey;
    let userSignatures = await connection.getSignaturesForAddress(walletPubKey);
    console.log('Fetched Memos: ',userSignatures[0].memo)
    //await (await connection.getParsedTransaction(userSignatures[0].signature)).transaction.message.accountKeys.filter(a => a.signer).map(a => a.pubkey.toBase58())
    setMsgs(userSignatures)
    setValidMsgs(userSignatures.filter((msg) => (msg.memo ?? "").includes(String(collectionID))))
    for (let i = 0; i < validMsgs.length; i++) {
      console.log(validMsgs[i]);
    }

    //TO DO:
    //1. Get all the transactions for the user
    //2. Filter out the transactions that are not for the company
    //3. Get the messages from the memo and map them to a list
    //4. Display all the messages
}

  return (
    <div className="md:hero mx-auto p-5 m-10">
      {/* navigation buttons in top corners  */}

      <Link href={`../${collectionID}`}>
        {" "}
        <button className=" absolute top-20 left-10 shadow-lg bg-black  bg-opacity-50 rounded text-gray-100 py-2 px-2 ">
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
        <div className="grid grid-cols-1 m-1">
          <p className="block m-2 text-center text-2xl font-la text-white-200">
            Daily Log
          </p>
          <section className="container mx-auto p-6 font-mono">
            <div className="w-full mb-8 overflow-hidden  shadow-lg">
              <div className="w-full overflow-x-auto table-fixed">               
                <table className=" table-fixed">
                  <thead>
                    <tr className="text-md font-semibold tracking-wide text-left text-white-200 bg-gray-500 uppercase">
                      <th className="w-3/7 px-4 py-3 border">Date</th>
                      <th className="px-4 py-3 border">Activity</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-700">
                  {validMsgs.map((str, i) => (
                    <tr key={i}>
                       <td className="px-4 py-3 border">{moment.unix(str.blockTime).format("YYYY-MM-DD HH:mm:ss")}</td>
                       <td className="px-4 py-3 border">{str.memo.split("#")[1]}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <button onClick={fetchMemo} className=" bg-[#14F195] hover:scale-105 text-black font-bold p-2 w-3/4 m-2 mx-10 rounded"> Get Memo</button>


        </div>
      </div>
    </div>
  );
}
export default DailyReport;





