import React from 'react';
import Content from "../components/mainPageComps/content";
import NewsCarousel from "../components/mainPageComps/carousel";
import MainPageProducts from "../components/mainPageComps/mainPageProducts";
import ProdsUndCategs from "../components/mainPageComps/productsUnderCategs";


const MainPage = ({currency, products}) => {
    return (
        <div className='mainPage'>
            <div className='container mainPage__content' style={{display: "flex", justifyContent: "space-between"}}>
                <div className='container mainPage__content__productsAndCategs'>
                    <Content/>
                    <ProdsUndCategs products={products} currency={currency}/>
                </div>
                <div className='container mainPage__content__products'>
                    <NewsCarousel/>
                    <MainPageProducts products={products} currency={currency}/>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
