import React from 'react';
import CompanyCard from './CompanyCard';

const CompanyList=({nfts})=>{

    const cardArray= nfts.map((user,i)=>{
            return(<CompanyCard companyName={nfts[i].companyName} key={i} />);
        })

        return(
            <div className="grid sm:grid-cols-1 m-1 md:grid-cols-2">
                {cardArray}
            </div>
        );

}
export default CompanyList;