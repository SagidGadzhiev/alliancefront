import React, {useState} from 'react';
import ProdCardCategs from "../components/productCardComps/prodCardCategs/prodCardCategs";
import CategPageProducts from "../components/categPageComps/categPageProducts";
import Pagination from "../components/categPageComps/pagination";
import {useParams} from "react-router";
import {useSelector} from "react-redux";

const CategoryPage = ({currency, products}) => {

    const loading = useSelector(s => s.storeItems.loading);

    const {categ} = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);

    const lastCountryIndex = currentPage * productsPerPage;
    const firstCountryIndex = lastCountryIndex - productsPerPage;
    const currentProduct = products.filter(i => {
        return i.class === categ ? i :
            i.category === categ ? i :
                i.subcategory === categ ? i : null
    }).slice(firstCountryIndex, lastCountryIndex);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='categoryPage'>
            <div className="container" style={{display: "flex"}}>
                <ProdCardCategs paginate={paginate}/>
                <div style={{padding: "15px", width: "100%"}}>
                    <Pagination productsPerPage={productsPerPage} totalProducts={products.filter(i => {
                        return i.class === categ ? i :
                            i.category === categ ? i :
                                i.subcategory === categ ? i : null
                    }).length} paginate={paginate}/>
                    <CategPageProducts currency={currency} products={currentProduct} loading={loading}/>
                    <Pagination productsPerPage={productsPerPage} totalProducts={products.filter(i => {
                        return i.class === categ ? i :
                            i.category === categ ? i :
                                i.subcategory === categ ? i : null
                    }).length} paginate={paginate}/>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;