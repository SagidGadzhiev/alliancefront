import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ProdCardCategs from '../components/productCardComps/prodCardCategs/prodCardCategs';
import CategPageProducts from '../components/categPageComps/categPageProducts';
import Pagination from '../components/categPageComps/pagination';
import { getCurrentPage, getCurrentProducts } from '../redux/reducers/storeItems';

function CategoryPage({ currency, products }) {
  const dispatch = useDispatch();
  const currentProducts = useSelector((s) => s.storeItems.currentProducts);
  const currentPageNumber = useSelector((s) => s.storeItems.currentPageNumber);

  const { categ } = useParams();

  const [, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  const lastCountryIndex = currentPageNumber * productsPerPage;
  const firstCountryIndex = lastCountryIndex - productsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [currentProduct, setCurrentProduct] = useState([]);
  useEffect(() => {
    setCurrentProduct(
      products.filter((i) => (i.class === categ ? i
        : i.category === categ ? i
          : i.subcategory === categ ? i : null)),
    );
  }, [products, categ]);

  const sortHandlerMin = (price) => {
    dispatch(getCurrentPage(1));
    paginate(1);
    return dispatch(getCurrentProducts(
      currentProduct.sort((a, b) => (a[price] > b[price] ? 1 : -1)),
    ));
  };
  const sortHandlerMax = (price) => {
    dispatch(getCurrentPage(1));
    paginate(1);
    return dispatch(getCurrentProducts(
      currentProduct.sort((a, b) => (a[price] < b[price] ? 1 : -1)),
    ));
  };

  return (
    <div className='categoryPage'>
      <div className='container' style={{ display: 'flex' }}>
        <ProdCardCategs paginate={paginate} />
        <div style={{ padding: '15px', width: '100%' }}>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={products.filter((i) => (i.class === categ ? i
              : i.category === categ ? i
                : i.subcategory === categ ? i : null)).length}
            paginate={paginate}
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
            totalProducts={products.filter((i) => (i.class === categ ? i
              : i.category === categ ? i
                : i.subcategory === categ ? i : null)).length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
