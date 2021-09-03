import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCateg, getNovasProducts} from "../../../redux/reducers/storeItems";
import {Link} from "react-router-dom";

const NovaProds = ({currency, products, nova, setNova}) => {

    const novas = useSelector(s => s.storeItems.novas);

    const dispatch = useDispatch();

    const getCategHandler = (prodCateg) => {
        return dispatch(getCateg(prodCateg));
    };

    const windowTop = () => {
        return window.scrollTo(0, 0);
    };

    return (
        <div style={{margin: "20px 0 0 0"}}>
            <p className='prodsUndCategs__title'><span>Недавно поступившие товары</span></p>
            <div className='prodsUndCategs__productsBlock'>
                {
                    novas.map((i, idx) => (
                        <div key={i.id} className='mainPageProducts__product'>
                            <a className='mainPageProducts__product__googleSearch' title='Найти в google'
                               target={i.img.length === 0 ? '_blank' : "_self"}
                               href={i.img.length === 0 ? `http://www.google.kg/search?q=${i.product}` : `/${i.code}`}>
                                <img className='mainPageProducts__product__img'
                                     src={i.img.length === 0 ? 'https://enter.kg/images/yandex.png' : i.img} alt="pic"/>
                            </a>
                            <Link to={`/${i.code}`} onClick={() => {
                                getCategHandler(i.class)
                                windowTop()
                            }}
                                  className="mainPageProducts__product__name">{i.product}</Link>
                            <p className="mainPageProducts__product__price">{i.price}$
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

export default NovaProds;