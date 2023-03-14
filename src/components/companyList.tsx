import React from 'react';
import {CompanyCard} from './CompanyCard';

const CompanyList=({nfts})=>{

    const cardArray= nfts.map((user,i)=>{
            return(<CompanyCard collectionID={nfts[i].collectionID} companyName={nfts[i].companyName} isOwner={nfts[i].isCollection} imageURI={nfts[i].logo} key={i} />);
        })

        return(
            <div className="grid sm:grid-cols-1 m-1 md:grid-cols-2">
                {cardArray}
            </div>
        );

}
export default CompanyList;