import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface Props{
    collectionID:string;
    companyName:string;
    isOwner:boolean;
    imageURI:string;
}

 export const CompanyCard: React.FC<Props> = ({collectionID,companyName, isOwner, imageURI}) => {
  //const imgLink = "/" + companyName + "Logo.png";
  
  
  
  return (
    <div className="flex flex-col items-center m-4 border-2 rounded border-[#b62fff3d] md:border-hidden">
      <Image src={imageURI} alt="chronoLabsMainLogo" width={250} height={250} />
      <p className=" p-1 text-xl font-medium text-white">{companyName}</p>
      <p className=" p-1 text-xl font-medium text-white">{collectionID}</p>

      {isOwner ? (
        <Link href={`company/owner/${collectionID}`}>
        <button className="bg-[#14F195] hover:hover:scale-105 text-black font-bold py-2 px-2 m-2 rounded">
          {" "}
          Admin Manage
        </button>
      </Link>
      ) : (
        <Link href={`company/${collectionID}`}>
        <button className="bg-[#14F195] hover:hover:scale-105 text-black font-bold py-2 px-2 m-2 rounded">
          Manage
        </button>
      </Link>
        
      )}
    </div>
  );
}


