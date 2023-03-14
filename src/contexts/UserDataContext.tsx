import { createContext, useState } from "react";

export const userData = createContext(null);

type nftType={
    companyName: string;
    logo: string;
    numTasks:number;
    tasks: string[];
    employeeName:string;
    employeeType:string;
    pay:string;
    ssNum:string;
    state:string;
    country:string;
    startDate:string;
    employeeStatus:string;
    isCollection:boolean;
    businessType:string;
    einNumber:string;
    collectionID:string;

}

function UserDataContext({ children }) {
    const [nfts, setNFTs] = useState<nftType[]>([
    // companyName:"",
    // logo:"",
    // numTasks:0,
    // tasks:[],
    // employeeName:"",
    // employeeType:"",
    // pay:"",
    // ssNum:"",
    // state:"",
    // country:"",
    // startDate:"",
    // employeeStatus:"",
    ],);

  
    return (
      <userData.Provider value={{ nfts, setNFTs }}>
        {children}
      </userData.Provider>
    );
  }
  export default UserDataContext;