import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router';
import { useSelector } from 'react-redux';
import Header from '../components/mainPageComps/header';
import Footer from '../components/mainPageComps/footer';

const MainPage = lazy(() => import('../pages/mainPage'));
const WishPage = lazy(() => import('../pages/wishPage'));
const ProductCard = lazy(() => import('../pages/productCard'));
const ShoppingCartPage = lazy(() => import('../pages/shoppingCartPage'));
const CategoryPage = lazy(() => import('../pages/categoryPage'));
const SearchingPage = lazy(() => import('../pages/searchingPage'));
const NovaProductsPage = lazy(() => import('../pages/novaProductsPage'));
const SalePage = lazy(() => import('../pages/salePage'));
const BestsellersPage = lazy(() => import('../pages/bestsellersPage'));
const OrderedPage = lazy(() => import('../pages/orderedPage'));
const OrderedByDatePage = lazy(() => import('../pages/orderedByDatePage'));
const ShippingPage = lazy(() => import('../pages/ShippingPage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage'));
const AboutUs = lazy(() => import('../pages/aboutUs'));

function PageWrapper({
  products, currency, wishesProducts, shoppingProducts, nova, setNova, selling, setSelling, bestsellersProducts
}) {
  const loading = useSelector((s) => s.storeItems.loading);

  return (
    <div className='page-wrapper'>
      <div className='preloader' style={{ width: `${loading ? '80%' : '100%'}`, display: `${loading ? 'block' : 'none'}` }} />
      <Header shoppingProducts={shoppingProducts} wishesProducts={wishesProducts} />
      <Suspense
        fallback={(
          <div className='loadingBlock'>
            <div className='lds-dual-ring' />
            <h2 style={{ color: '#fff', marginTop: '10px' }}>Идет загрузка...</h2>
          </div>
                )}
      >
        <Switch>
          <Route exact path='/' component={() => <MainPage products={products} currency={currency} />} />
          <Route path='/wishes' component={() => <WishPage currency={currency} wishesProducts={wishesProducts} />} />
          <Route path='/shopping' component={() => <ShoppingCartPage currency={currency} shoppingProducts={shoppingProducts} />} />
          <Route path='/new' component={() => <NovaProductsPage currency={currency} products={products} nova={nova} setNova={setNova} />} />
          <Route path='/sale' component={() => <SalePage currency={currency} products={products} selling={selling} setSelling={setSelling} />} />
          <Route path='/bestsellers' component={() => <BestsellersPage currency={currency} products={products} bestsellersProducts={bestsellersProducts} />} />
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
      </Suspense>
      <Footer />
    </div>
  );
}

export default PageWrapper;
