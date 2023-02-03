import Link from "next/link";
import Image from "next/image";

export default function CompanyCard({companyName}){
    const imgLink="/"+companyName+"Logo.png"
    return(
        <div className="flex flex-col items-center ">
            <Image src={imgLink} alt='chronoLabsMainLogo' width={250} height={250}/>
            <Link href={`company/${companyName}`}>
                <button className="bg-[#14F195] hover:hover:scale-105 text-black font-bold py-2 px-2 rounded"> Manage</button>
            </Link>
            
          </div>

    );
}