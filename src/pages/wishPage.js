import React, {useState} from 'react';
import WishesItems from "../components/wishPageComps/wishesItems";
import ProdCardCategs from "../components/productCardComps/prodCardCategs/prodCardCategs";

const WishPage = ({currency, wishesProducts}) => {

    // eslint-disable-next-line no-unused-vars
    const [currentPage, setCurrentPage] = useState(1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='wishPage'>
            <div className="container" style={{display: "flex"}}>
                <ProdCardCategs paginate={paginate}/>
                <WishesItems currency={currency} wishesProducts={wishesProducts}/>
            </div>
        </div>
    );
};

export default WishPage;