import React, {useState} from 'react';
import ProdCardCategs from "../components/productCardComps/prodCardCategs/prodCardCategs";
import OrderByDateProds from "../components/orderByDateComps/orderByDateProds";
import {ScrollToTopOnMount} from "../app";

const OrderedByDatePage = ({currency}) => {

    // eslint-disable-next-line no-unused-vars
    const [currentPage, setCurrentPage] = useState(1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='container' style={{display: "flex"}}>

            <ScrollToTopOnMount/>

            <ProdCardCategs paginate={paginate}/>
            <OrderByDateProds currency={currency}/>
        </div>
    );
};

export default OrderedByDatePage;