import React, {useState} from 'react';
import ProdCardCategs from "../components/productCardComps/prodCardCategs/prodCardCategs";
import SearchingProducts from "../components/searchPageComps/searchingProducts";
import {useSelector} from "react-redux";
import Pagination from "../components/categPageComps/pagination";

const SearchingPage = ({currency, products}) => {

    const searching = useSelector(s => s.storeItems.searching);
    const currentPageNumber = useSelector(s => s.storeItems.currentPageNumber);

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);

    const lastCountryIndex = currentPageNumber * productsPerPage;
    const firstCountryIndex = lastCountryIndex - productsPerPage;
    const currentProduct = products.filter(i => {
        return i.product.toLowerCase().includes(searching.toLowerCase())
    }).slice(firstCountryIndex, lastCountryIndex);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='searchingPage'>
            <div className="container" style={{display: "flex"}}>
                <ProdCardCategs paginate={paginate}/>
                <div style={{padding: "15px", width: "100%"}}>
                    <Pagination productsPerPage={productsPerPage} totalProducts={products.filter(i => {
                        return i.product.toLowerCase().includes(searching.toLowerCase())
                    }).length} paginate={paginate}/>
                    <SearchingProducts currency={currency} products={currentProduct}/>
                    <Pagination productsPerPage={productsPerPage} totalProducts={products.filter(i => {
                        return i.product.toLowerCase().includes(searching.toLowerCase())
                    }).length} paginate={paginate}/>
                </div>
            </div>
        </div>
    );
};

export default SearchingPage;