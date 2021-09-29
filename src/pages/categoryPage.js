import React, {useEffect, useState} from 'react';
import ProdCardCategs from "../components/productCardComps/prodCardCategs/prodCardCategs";
import CategPageProducts from "../components/categPageComps/categPageProducts";
import Pagination from "../components/categPageComps/pagination";
import {useParams} from "react-router";

const CategoryPage = ({currency, products}) => {

    const {categ} = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);

    const lastCountryIndex = currentPage * productsPerPage;
    const firstCountryIndex = lastCountryIndex - productsPerPage;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    const [currentProduct, setCurrentProduct] = useState([]);
    useEffect(() => {
        setCurrentProduct(
            products.filter(i => {
                return i.class === categ ? i :
                    i.category === categ ? i :
                        i.subcategory === categ ? i : null
            })
        )
    }, [products, categ]);

    const sortHandlerMin = (price) => {
        paginate(1);
        return setCurrentProduct(
            currentProduct.sort((a, b) => {
                return a[price] > b[price] ? 1 : -1
            })
        )
    };
    const sortHandlerMax = (price) => {
        paginate(1);
        return setCurrentProduct(
            currentProduct.sort((a, b) => {
                return a[price] < b[price] ? 1 : -1
            })
        )
    };

    return (
        <div className='categoryPage'>
            <div className="container" style={{display: "flex"}}>
                <ProdCardCategs paginate={paginate}/>
                <div style={{padding: "15px", width: "100%"}}>
                    <Pagination productsPerPage={productsPerPage}
                                totalProducts={products.filter(i => {
                                    return i.class === categ ? i :
                                        i.category === categ ? i :
                                            i.subcategory === categ ? i : null
                                }).length} paginate={paginate}/>
                    <CategPageProducts currency={currency} currentProduct={currentProduct}
                                       firstCountryIndex={firstCountryIndex} lastCountryIndex={lastCountryIndex}
                                       sortHandlerMin={sortHandlerMin} sortHandlerMax={sortHandlerMax}/>
                    <Pagination productsPerPage={productsPerPage}
                                totalProducts={products.filter(i => {
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