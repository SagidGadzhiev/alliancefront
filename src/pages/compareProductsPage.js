import React, { useState } from 'react';
import { Switch, Route } from 'react-router';
import ProdCardCategs from '../components/productCardComps/prodCardCategs/prodCardCategs';
import CompareProducts from '../components/compareProdsComps/compareProducts';
import CompareProdsCategories from '../components/compareProdsComps/compareProdsCategories';


function CompareProductsPage() {

    const [, setCurrentPage] = useState(1);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='compare-products-page'>
            <div className="container" style={{ display: 'flex', overflow: 'auto' }}>
                <ProdCardCategs paginate={paginate} />
                <Switch>
                    <Route exact path='/compare-products' component={() => <CompareProdsCategories />} />
                    <Route path='/compare-products/:productsCategories' component={() => <CompareProducts />} />
                </Switch>
            </div>
        </div>
    );
}

export default CompareProductsPage;
