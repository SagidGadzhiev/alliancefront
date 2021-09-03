import React, {useState} from 'react';
import Header from "../components/mainPageComps/header";
import ProdCardCategs from "../components/productCardComps/prodCardCategs/prodCardCategs";
import Footer from "../components/mainPageComps/footer";
import ShoppingItems from "../components/shoppingCartComps/shoppingItems";
import ShoppingForm from "../components/shoppingCartComps/shoppingForm";

const ShoppingCartPage = ({currency, shoppingProducts}) => {

    const [currentPage, setCurrentPage] = useState(1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='shoppingCartPage'>
            {/*<Header/>*/}
            <div className="container" style={{display: "flex"}}>
                <ProdCardCategs paginate={paginate}/>
                <ShoppingItems currency={currency} shoppingProducts={shoppingProducts}/>
            </div>
            <ShoppingForm/>
            {/*<Footer/>*/}
        </div>
    );
};

export default ShoppingCartPage;