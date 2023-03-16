// Next, React
import { FC, useEffect, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { userData } from "../../../../contexts/UserDataContext";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";

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
  const [msgs,setMsgs]=useState([]);

  async function fetchMemo() {
    const walletPubKey = wallet.publicKey;
    let signatureDetail = await connection.getSignaturesForAddress(walletPubKey);
    console.log('Fetched Memos: ', signatureDetail);
     setMsgs(signatureDetail)
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
                      <th className="w-3/7 px-4 py-3 border">Employee Name</th>
                      <th className="px-4 py-3 border">Activity</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-700">
                    <tr className="text-gray-100">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          {/* We can add images if we want to:
                           <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                          </div> */}
                          <div>
                            <p className="font-semibold text-gray-100">
                              Sol Ana
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold border">
                        {/* {msgs} */}
                      </td>
                    </tr>
                    <tr className="text-gray-100">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          {/* We can add images if we want to:
                           <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                          </div> */}
                          <div>
                            <p className="font-semibold text-gray-100">
                              Sol Ana
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold border">
                        Picked Up Pizza
                      </td>
                    </tr>
                    <tr className="text-gray-100">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          {/* We can add images if we want to:
                           <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                          </div> */}
                          <div>
                            <p className="font-semibold text-gray-100">
                              Dev Eloper
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold border">
                        Clocked In
                      </td>
                    </tr>
                    <tr className="text-gray-100">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          {/* We can add images if we want to:
                           <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                          </div> */}
                          <div>
                            <p className="font-semibold text-gray-100">
                              Sol Ana
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold border">
                        Sold Pizza to Ght8...6Gt7 for $12.99
                      </td>
                    </tr>
                    <tr className="text-gray-100">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          {/* We can add images if we want to:
                           <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                          </div> */}
                          <div>
                            <p className="font-semibold text-gray-100">
                              Sol Ana
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold border">
                        Clocked Out
                      </td>
                    </tr>
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





