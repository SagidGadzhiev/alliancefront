import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllOrders,
  getNovasProducts,
  getOrderedLocalStorage,
  getProducts,
  getSalesProducts,
  getShoppingLocalStorage,
  getWishesLocalStorage,
} from './redux/reducers/storeItems';
import AdminPage from './pages/adminPage';
import PageWrapper from './page-wrapper';

function App() {
  const dispatch = useDispatch();

  const [nova, setNova] = useState([]);
  const [selling, setSelling] = useState([]);

  const products = useSelector((s) => s.storeItems.products);
  const wishesProducts = useSelector((s) => s.storeItems.wishes);
  const shoppingProducts = useSelector((s) => s.storeItems.shopping);
  const ordered = useSelector((s) => s.storeItems.ordered);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getNovasProducts());
    dispatch(getSalesProducts());
    dispatch(getAllOrders());
    dispatch(getWishesLocalStorage(JSON.parse(localStorage.getItem('wishes')) || []));
    dispatch(getShoppingLocalStorage(JSON.parse(localStorage.getItem('shopping')) || []));
    dispatch(getOrderedLocalStorage(JSON.parse(localStorage.getItem('ordered')) || []));
  }, []);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [shoppingProducts]);

  useEffect(() => {
    localStorage.setItem('wishes', JSON.stringify(wishesProducts));
    localStorage.setItem('shopping', JSON.stringify(shoppingProducts));
    localStorage.setItem('ordered', JSON.stringify(ordered));
  }, [wishesProducts, shoppingProducts, ordered]);

  const currency = 85;

  return (
    <div className='app'>
      <Switch>
        <Route exact path='/admin'>
          <AdminPage
            products={products}
            nova={nova}
            setNova={setNova}
            selling={selling}
            setSelling={setSelling}
          />
        </Route>
        <Route path='/'>
          <PageWrapper
            products={products}
            wishesProducts={wishesProducts}
            shoppingProducts={shoppingProducts}
            currency={currency}
            nova={nova}
            setNova={setNova}
            selling={selling}
            setSelling={setSelling}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
