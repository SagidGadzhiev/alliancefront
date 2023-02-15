import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ProdCardCategs from '../components/productCardComps/prodCardCategs/prodCardCategs';
import CategPageProducts from '../components/categPageComps/categPageProducts';
import Pagination from '../components/categPageComps/pagination';
import { getCurrentPage, getCurrentProducts } from '../redux/reducers/storeItems';
import CategPageFilters from '../components/categPageComps/categPageFilters';


function CategoryPage({ currency, products }) {

  const [filtersIndexArray, setFiltersIndexArray] = useState([]);

  const dispatch = useDispatch();
  const currentProducts = useSelector((s) => s.storeItems.currentProducts);
  const currentPageNumber = useSelector((s) => s.storeItems.currentPageNumber);

  const { categories } = useParams();

  const [, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  const lastCountryIndex = currentPageNumber * productsPerPage;
  const firstCountryIndex = lastCountryIndex - productsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [currentProduct, setCurrentProduct] = useState([]);

  const reduceToObject = filtersIndexArray.map(i => i.name);
  const propertiesCounter = reduceToObject.sort().filter((it, idx, arr) => it !== arr[idx + 1]).length;

  useEffect(() => {
    return filtersIndexArray.length === 0 ?
        setCurrentProduct(products.filter(i => (i.class === categories ? i : i.category === categories ? i : i.subcategory === categories ? i : null)))
        :
        setCurrentProduct(
            products
                .filter(i => (i.class === categories ? i : i.category === categories ? i : i.subcategory === categories ? i : null))
                .filter(item => {
                  let counter = 0;
                  for (let i = 0; i < filtersIndexArray.length; i++) {
                    if (item.product.toLowerCase().indexOf(filtersIndexArray[i].value.toLowerCase()) > -1)
                      counter++;
                  }
                  return counter === propertiesCounter;
                })
        )
  }, [products, categories, filtersIndexArray]);
  useEffect(() => setFiltersIndexArray([]), [categories]);

  const sortHandlerMin = (price) => {
    dispatch(getCurrentPage(1));
    paginate(1);
    return dispatch(getCurrentProducts(currentProduct.sort((a, b) => (a[price] > b[price] ? 1 : -1))));
  };
  const sortHandlerMax = (price) => {
    dispatch(getCurrentPage(1));
    paginate(1);
    return dispatch(getCurrentProducts(currentProduct.sort((a, b) => (a[price] < b[price] ? 1 : -1))));
  };

  return (
    <div className='categoryPage'>
      <div className='container' style={{ display: 'flex' }}>
        <ProdCardCategs paginate={paginate} />
        <div style={{ padding: '15px', width: '100%' }}>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={currentProduct.length}
            paginate={paginate}
          />
          <CategPageFilters
              paginate={paginate}
              prodsArr={currentProducts.length === 0 ? currentProduct : currentProducts}
              filtersIndexArray={filtersIndexArray}
              setFiltersIndexArray={setFiltersIndexArray}
          />
          <CategPageProducts
            currency={currency}
            currentProduct={currentProducts.length === 0 ? currentProduct : currentProducts}
            firstCountryIndex={firstCountryIndex}
            lastCountryIndex={lastCountryIndex}
            sortHandlerMin={sortHandlerMin}
            sortHandlerMax={sortHandlerMax}
          />
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={currentProduct.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
