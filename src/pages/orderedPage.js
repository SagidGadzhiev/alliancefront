import React, {useState} from 'react';
import ProdCardCategs from "../components/productCardComps/prodCardCategs/prodCardCategs";
import OrderedList from "../components/orderedPageComps/orderedList";
import {ScrollToTopOnMount} from "../app";

const OrderedPage = () => {

    // eslint-disable-next-line no-unused-vars
    const [currentPage, setCurrentPage] = useState(1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='container' style={{display: "flex"}}>

            <ScrollToTopOnMount/>

            <ProdCardCategs paginate={paginate}/>
            <OrderedList/>
        </div>
    );
};

export default OrderedPage;