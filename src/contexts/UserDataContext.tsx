import { createContext, useState } from "react";

export const userData = createContext(null);

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
};

function UserDataContext({ children }) {
  const [nfts, setNFTs] = useState<nftType[]>([]);
  const [userNFT, setUserNFT] = useState<nftType>();


  return (
    <userData.Provider value={{ nfts, setNFTs ,userNFT,setUserNFT}}>{children}</userData.Provider>
  );
}

// function CurrentUserStats({ children }) {
//   const [userNFT, setUserNFT] = useState<nftType[]>([]);

//   return (
//     <userData.Provider value={{ userNFT, setUserNFT }}>
//       {children}
//     </userData.Provider>
//   );
// }

export default UserDataContext;
