import React from 'react';
import { Switch, Route } from 'react-router';
import { useSelector } from 'react-redux';
import MainPage from '../pages/mainPage';
import WishPage from '../pages/wishPage';
import ProductCard from '../pages/productCard';
import ShoppingCartPage from '../pages/shoppingCartPage';
import CategoryPage from '../pages/categoryPage';
import SearchingPage from '../pages/searchingPage';
import Header from '../components/mainPageComps/header';
import Footer from '../components/mainPageComps/footer';
import NovaProductsPage from '../pages/novaProductsPage';
import SalePage from '../pages/salePage';
import BestsellersPage from '../pages/bestsellersPage';
import OrderedPage from '../pages/orderedPage';
import OrderedByDatePage from '../pages/orderedByDatePage';
import ShippingPage from '../pages/ShippingPage';
import ContactsPage from '../pages/ContactsPage';
import AboutUs from '../pages/aboutUs';


const PageWrapper = ({ products, currency, wishesProducts, shoppingProducts, nova, setNova, selling, setSelling }) => {
        const loading = useSelector(s => s.storeItems.loading);

        return (
        <div className='page-wrapper'>
                <div className='preloader' style={{ width: `${loading ? '80%' : '100%'}` }}></div>
                <Header />
                <Switch>
                    <Route exact path='/' component={() => <MainPage products={products} currency={currency} />} />
                    <Route path='/wishes' component={() => <WishPage currency={currency} wishesProducts={wishesProducts} />} />
                    <Route path='/shopping' component={() => <ShoppingCartPage currency={currency} shoppingProducts={shoppingProducts} />} />
                    <Route path='/new' component={() => <NovaProductsPage currency={currency} products={products} nova={nova} setNova={setNova} />} />
                    <Route path='/sale' component={() => <SalePage currency={currency} products={products} selling={selling} setSelling={setSelling} />} />
                    <Route path='/bestsellers' component={() => <BestsellersPage currency={currency} products={products} />} />
                    <Route path='/ordered' component={() => <OrderedPage />} />
                    <Route path='/shipping' component={() => <ShippingPage />} />
                    <Route path='/contacts' component={() => <ContactsPage />} />
                    <Route path='/aboutUs' component={() => <AboutUs />} />
                    <Route path='/order/:num' component={() => <OrderedByDatePage currency={currency} />} />
                    <Route path='/search=:searchingValue' component={() => <SearchingPage currency={currency} products={products} />} />
                    <Route path='/type/:categ' component={() => <CategoryPage currency={currency} products={products} />} />
                    <Route path='/category/:categ' component={() => <CategoryPage currency={currency} products={products} />} />
                    <Route path='/subcategory/:categ' component={() => <CategoryPage currency={currency} products={products} />} />
                    <Route path='/:productCode' component={() => <ProductCard products={products} currency={currency} />} />
                </Switch>
                <Footer />
        </div>
    );
};

export default PageWrapper;
