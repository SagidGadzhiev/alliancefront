import React, {useState} from 'react';
import ProdCardCategs from "../components/productCardComps/prodCardCategs/prodCardCategs";
import SaleProds from "../components/salePageComps/saleProds";
import {ScrollToTopOnMount} from "../app";

const SalePage = ({currency, products, selling, setSelling}) => {

    // eslint-disable-next-line no-unused-vars
    const [currentPage, setCurrentPage] = useState(1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='container' style={{display: "flex"}}>

            <ScrollToTopOnMount/>

            <ProdCardCategs paginate={paginate}/>
            <SaleProds currency={currency} products={products} selling={selling} setSelling={setSelling}/>
        </div>
    );
};

export default SalePage;