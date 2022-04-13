import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCateg} from "../../../redux/reducers/storeItems";
import noPhoto from '../../../img/noPhoto.png'

const MainPageProducts = ({currency, products}) => {

    const dispatch = useDispatch();

    const novas = useSelector(s => s.storeItems.novas);

    const getCategHandler = (prodCateg) => {
        return dispatch(getCateg(prodCateg));
    };

    const windowTop = () => {
        return window.scrollTo(0, 0);
    };

    const getImgStatus = (e) => {
        // return e.target.src = noPhoto
    };

    return (
        <div className='mainPageProducts'>
            <p className='mainPageProducts__title'><span>Новые товары</span></p>
            <div className='mainPageProducts__productsBlock'>
                {
                    novas
                        .slice(0, 18).map((i) => (
                        <div key={i.id} className='mainPageProducts__product'>
                            {
                                i.img.length === 0 ?
                                    <a className='mainPageProducts__product__googleSearch'
                                       title='Найти в google'
                                       rel='noreferrer'
                                       target='_blank'
                                       href={`http://www.google.kg/search?q=${i.product}`}>
                                        <img className='mainPageProducts__product__img'
                                             src='https://enter.kg/images/yandex.png' alt=""/>
                                    </a> :
                                    <Link onClick={() => {
                                        getCategHandler(i.class);
                                        windowTop()
                                    }} className='mainPageProducts__product__googleSearch'
                                          to={`/${i.code}`}>
                                        <img onError={(e) => getImgStatus(e)} className='mainPageProducts__product__img' src={i.img}
                                             alt=""/>
                                    </Link>
                            }
                            <Link to={`/${i.code}`} onClick={() => {
                                getCategHandler(i.class);
                                windowTop()
                            }}
                                  className="mainPageProducts__product__name">{i.product}</Link>
                            <p className="mainPageProducts__product__price">
                                {i.price === undefined ? i.price : (i.price).toFixed(2)}$
                                - {(i.price * currency).toFixed(0)}сом</p>
                            <p className="mainPageProducts__product__warranty">Комментарий(гарантия) : {i.comment}</p>
                            <p className="mainPageProducts__product__code">Код товара : {i.code}</p>
                        </div>
                    ))
                }
            </div>
            <p className="mainPageProducts__title"><span>Ноутбуки</span></p>
            <div className='mainPageProducts__productsBlock'>
                {
                    products.filter(i => {
                        return i.class === 'Notebook';
                    }).slice(0, 18).map((i) => (
                        <div key={i.id} className='mainPageProducts__product'>
                            {
                                i.img.length === 0 ?
                                    <a className='mainPageProducts__product__googleSearch'
                                       title='Найти в google'
                                       rel='noreferrer'
                                       target='_blank'
                                       href={`http://www.google.kg/search?q=${i.product}`}>
                                        <img className='mainPageProducts__product__img'
                                             src='https://enter.kg/images/yandex.png' alt=""/>
                                    </a> :
                                    <Link onClick={() => {
                                        getCategHandler(i.class);
                                        windowTop()
                                    }} className='mainPageProducts__product__googleSearch'
                                          to={`/${i.code}`}>
                                        <img onError={(e) => getImgStatus(e)} className='mainPageProducts__product__img' src={i.img}
                                             alt=""/>
                                    </Link>
                            }
                            <Link to={`/${i.code}`} onClick={() => {
                                getCategHandler(i.category);
                                windowTop()
                            }} className="mainPageProducts__product__name">{i.product}</Link>
                            <p className="mainPageProducts__product__price">
                                {i.price === undefined ? i.price : (i.price).toFixed(2)}$
                                - {(i.price * currency).toFixed(0)}сом</p>
                            <p className="mainPageProducts__product__warranty">Комментарий(гарантия) : {i.comment}</p>
                            <p className="mainPageProducts__product__code">Код товара : {i.code}</p>
                        </div>
                    ))
                }
            </div>
            <p className="mainPageProducts__title"><span>Бытовая техника</span></p>
            <div className='mainPageProducts__productsBlock'>
                {
                    products.filter((i) => {
                        return i.class === 'Бытовая техника'
                    }).slice(0, 30).map((i) => (
                        <div key={i.id} className='mainPageProducts__product'>
                            {
                                i.img.length === 0 ?
                                    <a className='mainPageProducts__product__googleSearch'
                                       title='Найти в google'
                                       rel='noreferrer'
                                       target='_blank'
                                       href={`http://www.google.kg/search?q=${i.product}`}>
                                        <img className='mainPageProducts__product__img'
                                             src='https://enter.kg/images/yandex.png' alt=""/>
                                    </a> :
                                    <Link onClick={() => {
                                        getCategHandler(i.class);
                                        windowTop()
                                    }} className='mainPageProducts__product__googleSearch'
                                          to={`/${i.code}`}>
                                        <img onError={(e) => getImgStatus(e)} className='mainPageProducts__product__img' src={i.img}
                                             alt=""/>
                                    </Link>
                            }
                            <Link to={`/${i.code}`} onClick={() => {
                                getCategHandler(i.category);
                                windowTop()
                            }} className="mainPageProducts__product__name">{i.product}</Link>
                            <p className="mainPageProducts__product__price">
                                {i.price === undefined ? i.price : (i.price).toFixed(2)}$
                                - {(i.price * currency).toFixed(0)}сом</p>
                            <p className="mainPageProducts__product__warranty">Комментарий(гарантия) : {i.comment}</p>
                            <p className="mainPageProducts__product__code">Код товара : {i.code}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default MainPageProducts;
