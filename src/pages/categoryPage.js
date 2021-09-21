import React, {useEffect, useState} from 'react';
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
    // const currentProduct = products.filter(i => {
    //     return i.class === categ ? i :
    //         i.category === categ ? i :
    //             i.subcategory === categ ? i : null
    // }).slice(firstCountryIndex, lastCountryIndex);

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
    }, [categ])

    // const sortHandlerMin = (price) => {
    //     return setCurrentProduct(
    //         currentProduct.sort((a, b) => {
    //             return a[price] > b[price] ? 1 : -1
    //         })
    //     )
    // };
    // const sortHandlerMax = (price) => {
    //     return setCurrentProduct(
    //         currentProduct.sort((a, b) => {
    //             return a[price] < b[price] ? 1 : -1
    //         })
    //     )
    // };

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

                    {/*<button type="submit" onClick={() => {*/}
                    {/*    sortHandlerMin('price')*/}
                    {/*}}>Сортировать по возрастанию цены*/}
                    {/*</button>*/}
                    {/*<button type="submit" onClick={() => {*/}
                    {/*    sortHandlerMax('price')*/}
                    {/*}}>Сортировать по убыванию цены*/}
                    {/*</button>*/}

                    <CategPageProducts currency={currency} currentProduct={currentProduct} loading={loading}
                                       firstCountryIndex={firstCountryIndex} lastCountryIndex={lastCountryIndex}
                                       setCurrentProduct={setCurrentProduct}/>
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