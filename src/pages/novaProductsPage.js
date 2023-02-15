import React, { useState } from 'react';
import ProdCardCategs from '../components/productCardComps/prodCardCategs/prodCardCategs';
import NovaProds from '../components/novaProdsComps/novaProds';

function NovaProductsPage({ currency, products, nova, setNova, }) {

  const [, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='container' style={{ display: 'flex' }}>
      <ProdCardCategs paginate={paginate} />
      <NovaProds currency={currency} products={products} nova={nova} setNova={setNova} />
    </div>
  );
}

export default NovaProductsPage;
