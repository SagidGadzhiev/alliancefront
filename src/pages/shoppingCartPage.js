import React, { useState } from 'react';
import ProdCardCategs from '../components/productCardComps/prodCardCategs/prodCardCategs';
import ShoppingItems from '../components/shoppingCartComps/shoppingItems';
import ShoppingForm from '../components/shoppingCartComps/shoppingForm';

function ShoppingCartPage({ currency, shoppingProducts }) {
  let totalPrice = 0;

  function getTotalPrice() {
    return shoppingProducts.map((i) => {
      totalPrice += (i.count * i.price);
      return totalPrice;
    });
  }

  getTotalPrice();

  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='shoppingCartPage'>
      <div className='container' style={{ display: 'flex' }}>
        <ProdCardCategs paginate={paginate} />
        <ShoppingItems totalPrice={totalPrice} currency={currency} shoppingProducts={shoppingProducts} />
      </div>
      <ShoppingForm currency={currency} shoppingProducts={shoppingProducts} totalPrice={totalPrice} />
    </div>
  );
}

export default ShoppingCartPage;
