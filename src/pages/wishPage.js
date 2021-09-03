import React, {useState} from 'react';
import Header from "../components/mainPageComps/header";
import Footer from "../components/mainPageComps/footer";
import WishesItems from "../components/wishPageComps/wishesItems";
import ProdCardCategs from "../components/productCardComps/prodCardCategs/prodCardCategs";

const WishPage = ({currency, wishesProducts}) => {

    const [currentPage, setCurrentPage] = useState(1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='wishPage'>
            {/*<Header/>*/}
            <div className="container" style={{display: "flex"}}>
                <ProdCardCategs paginate={paginate}/>
                <WishesItems currency={currency} wishesProducts={wishesProducts}/>
            </div>
            {/*<Footer/>*/}
        </div>
    );
};

export default WishPage;