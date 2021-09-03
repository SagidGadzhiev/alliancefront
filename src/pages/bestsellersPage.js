import React, {useState} from 'react';
import ProdCardCategs from "../components/productCardComps/prodCardCategs/prodCardCategs";
import BestsellProds from "../components/bestsellComps/bestsellProds";

const BestsellersPage = ({currency, products}) => {

    const [currentPage, setCurrentPage] = useState(1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='container' style={{display: "flex"}}>
            <ProdCardCategs paginate={paginate}/>
            <BestsellProds currency={currency} products={products}/>
        </div>
    );
};

export default BestsellersPage;