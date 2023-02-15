import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllOrders, getBestsellersProducts, getCompareLocalStorage, getCurrency,
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
  const currency = useSelector((s) => s.storeItems.currency);
  const bestsellersProducts = useSelector(s => s.storeItems.bestsellers);
  const compareProductsArray = useSelector(s => s.storeItems.compareProductsArray);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getNovasProducts());
    dispatch(getSalesProducts());
    dispatch(getAllOrders());
    dispatch(getWishesLocalStorage(JSON.parse(localStorage.getItem('wishes')) || []));
    dispatch(getShoppingLocalStorage(JSON.parse(localStorage.getItem('shopping')) || []));
    dispatch(getOrderedLocalStorage(JSON.parse(localStorage.getItem('ordered')) || []));
    dispatch(getCurrency());
    dispatch(getBestsellersProducts());
    dispatch(getCompareLocalStorage(JSON.parse(localStorage.getItem('compare')) || []));
  }, []);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [shoppingProducts]);

  useEffect(() => {
    localStorage.setItem('wishes', JSON.stringify(wishesProducts));
    localStorage.setItem('shopping', JSON.stringify(shoppingProducts));
    localStorage.setItem('ordered', JSON.stringify(ordered));
    localStorage.setItem('compare', JSON.stringify(compareProductsArray));
  }, [wishesProducts, shoppingProducts, ordered, compareProductsArray]);


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
            bestsellersProducts={bestsellersProducts}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
