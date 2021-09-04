import React, {useState} from 'react';
import ProdCardCategs from "../components/productCardComps/prodCardCategs/prodCardCategs";
import ShoppingItems from "../components/shoppingCartComps/shoppingItems";
import ShoppingForm from "../components/shoppingCartComps/shoppingForm";

const ShoppingCartPage = ({currency, shoppingProducts}) => {

    let totalPrice = 0

    function getTotalPrice() {
        return shoppingProducts.map(i => {
            totalPrice = totalPrice + (i.count * i.price)
            return totalPrice
        })
    }

    getTotalPrice()

    const [currentPage, setCurrentPage] = useState(1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='shoppingCartPage'>
            <div className="container" style={{display: "flex"}}>
                <ProdCardCategs paginate={paginate}/>
                <ShoppingItems totalPrice={totalPrice} currency={currency} shoppingProducts={shoppingProducts}/>
            </div>
            <ShoppingForm currency={currency} shoppingProducts={shoppingProducts} totalPrice={totalPrice}/>
        </div>
    );
};

export default ShoppingCartPage;