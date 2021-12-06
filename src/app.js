import React, {useEffect, useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import MainPage from "./pages/mainPage";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllOrders,
    getNovasProducts, getOrderedLocalStorage,
    getProducts, getSalesProducts,
    getSearchingLocalStorage,
    getShoppingLocalStorage,
    getWishesLocalStorage
} from "./redux/reducers/storeItems";
import WishPage from "./pages/wishPage";
import ProductCard from "./pages/productCard";
import ShoppingCartPage from "./pages/shoppingCartPage";
import CategoryPage from "./pages/categoryPage";
import SearchingPage from "./pages/searchingPage";
import Header from "./components/mainPageComps/header";
import Footer from "./components/mainPageComps/footer";
import AdminPage from "./pages/adminPage";
import NovaProductsPage from "./pages/novaProductsPage";
import SalePage from "./pages/salePage";
import BestsellersPage from "./pages/bestsellersPage";
import OrderedPage from "./pages/orderedPage";
import OrderedByDatePage from "./pages/orderedByDatePage";
import ShippingPage from "./pages/ShippingPage";
import ContactsPage from "./pages/ContactsPage";
import AboutUs from "./pages/aboutUs";

const App = () => {

    const dispatch = useDispatch();

    const [nova, setNova] = useState([]);
    const [selling, setSelling] = useState([]);

    const products = useSelector(s => s.storeItems.products
        .map((i) => {
            return {
                ...i,
                price: i.price <= 10 ? i.price + (i.price * 0.2)
                    : i.price <= 20 ? i.price + (i.price * 0.2)
                        : i.price <= 30 ? i.price + (i.price * 0.2)
                            : i.price <= 40 ? i.price + (i.price * 0.1)
                                : i.price <= 50 ? i.price + (i.price * 0.07)
                                    : i.price <= 60 ? i.price + (i.price * 0.08)
                                        : i.price <= 70 ? i.price + (i.price * 0.05)
                                            : i.price <= 80 ? i.price + (i.price * 0.05)
                                                : i.price <= 90 ? i.price + (i.price * 0.06)
                                                    : i.price <= 100 ? i.price + (i.price * 0.04)
                                                        : i.price <= 150 ? i.price + (i.price * 0.04)
                                                            : i.price <= 200 ? i.price + (i.price * 0.03)
                                                                : i.price <= 250 ? i.price + (i.price * 0.04)
                                                                    : i.price <= 300 ? i.price + (i.price * 0.04)
                                                                        : i.price <= 400 ? i.price + (i.price * 0.04)
                                                                            : i.price <= 450 ? i.price + (i.price * 0.035)
                                                                                : i.price <= 500 ? i.price + (i.price * 0.03)
                                                                                    : i.price <= 600 ? i.price + (i.price * 0.03)
                                                                                        : i.price <= 700 ? i.price + (i.price * 0.04)
                                                                                            : i.price <= 800 ? i.price + (i.price * 0.04)
                                                                                                : i.price <= 900 ? i.price + (i.price * 0.04)
                                                                                                    : i.price <= 1000 ? i.price + (i.price * 0.04)
                                                                                                        : i.price <= 1100 ? i.price + (i.price * 0.03)
                                                                                                            : i.price <= 1200 ? i.price + (i.price * 0.03)
                                                                                                                : i.price <= 1300 ? i.price + (i.price * 0.03)
                                                                                                                    : i.price <= 1400 ? i.price + (i.price * 0.03)
                                                                                                                        : i.price <= 1500 ? i.price + (i.price * 0.03)
                                                                                                                            : i.price + (i.price * 0.03)
            }
        })
    );
    const wishesProducts = useSelector(s => s.storeItems.wishes);
    const shoppingProducts = useSelector(s => s.storeItems.shopping);

    const wishes = useSelector(s => s.storeItems.wishes);
    const shopping = useSelector(s => s.storeItems.shopping);
    const loading = useSelector(s => s.storeItems.loading);
    const searching = useSelector(s => s.storeItems.searching);
    const ordered = useSelector(s => s.storeItems.ordered);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getNovasProducts());
        dispatch(getSalesProducts());
        dispatch(getAllOrders());
        dispatch(getWishesLocalStorage(JSON.parse(localStorage.getItem('wishes')) || []));
        dispatch(getShoppingLocalStorage(JSON.parse(localStorage.getItem('shopping')) || []));
        dispatch(getSearchingLocalStorage(JSON.parse(localStorage.getItem('searching')) || ''));
        dispatch(getOrderedLocalStorage(JSON.parse(localStorage.getItem('ordered')) || []))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(getAllOrders())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shoppingProducts]);

    useEffect(() => {
        localStorage.setItem('wishes', JSON.stringify(wishes));
        localStorage.setItem('shopping', JSON.stringify(shopping));
        localStorage.setItem('searching', JSON.stringify(searching));
        localStorage.setItem('ordered', JSON.stringify(ordered))
    }, [wishes, shopping, searching, ordered]);

    const currency = 85;

    // if (loading) {
    //     return <div className='loadingBlock'>
    //         <div className="lds-dual-ring"></div>
    //         <h2 className='loadingBlock__title'>Страница загружается</h2>
    //     </div>
    // }

    return (
        <div className='app'>

            <div
                className='preloader'
                style={{
                    width: `${loading ? '80%' : '100%'}`
                }}></div>

            <Header/>
            <Switch>
                <Route exact path='/' component={() => <MainPage products={products} currency={currency}/>}/>
                <Route path='/wishes'
                       component={() => <WishPage currency={currency} wishesProducts={wishesProducts}/>}/>
                <Route path='/shopping'
                       component={() => <ShoppingCartPage currency={currency} shoppingProducts={shoppingProducts}/>}/>
                <Route path='/new'
                       component={() => <NovaProductsPage currency={currency} products={products} nova={nova}
                                                          setNova={setNova}/>}/>
                <Route path='/sale' component={() => <SalePage currency={currency} products={products} selling={selling}
                                                               setSelling={setSelling}/>}/>
                <Route path='/bestsellers'
                       component={() => <BestsellersPage currency={currency} products={products}/>}/>
                <Route path='/ordered' component={() => <OrderedPage/>}/>
                <Route path='/shipping' component={() => <ShippingPage/>}/>
                <Route path='/contacts' component={() => <ContactsPage/>}/>
                <Route path='/aboutUs' component={() => <AboutUs/>}/>
                <Route path='/order/:num' component={() => <OrderedByDatePage currency={currency}/>}/>
                <Route path='/security-admin-page'
                       component={() => <AdminPage products={products} nova={nova} setNova={setNova} selling={selling}
                                                   setSelling={setSelling}/>}/>
                <Route path='/search=:searchingValue'
                       component={() => <SearchingPage currency={currency} products={products}/>}/>
                <Route path='/type/:categ' component={() => <CategoryPage currency={currency} products={products}/>}/>
                <Route path='/category/:categ'
                       component={() => <CategoryPage currency={currency} products={products}/>}/>
                <Route path='/subcategory/:categ'
                       component={() => <CategoryPage currency={currency} products={products}/>}/>
                <Route path='/:productCode' component={() => <ProductCard products={products} currency={currency}/>}/>
            </Switch>
            <Footer/>
        </div>
    );
};

export default App;