import React, { useState } from 'react';
import ProdCard from '../components/productCardComps/prodCard';
import SameProds from '../components/productCardComps/sameProducts';
import OtherProds from '../components/productCardComps/otherProducts';
import ProdCardCategs from '../components/productCardComps/prodCardCategs/prodCardCategs';

function ProductCard({ currency, products }) {
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='productCard'>
      <div className='container' style={{ display: 'flex' }}>
        <ProdCardCategs paginate={paginate} />
        <ProdCard products={products} currency={currency} />
      </div>
      <div className='container'>
        <SameProds products={products} currency={currency} />
        <OtherProds products={products} currency={currency} />
      </div>
    </div>
  );
}

export default ProductCard;
