import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getCateg} from "../../../redux/reducers/storeItems";

const ProdsUndCategs = ({currency, products}) => {

    const dispatch = useDispatch();

    const getCategHandler = (prodCateg) => {
        return dispatch(getCateg(prodCateg));
    };

    const windowTop = () => {
        return window.scrollTo(0, 0);
    };

    return (
        <div className='prodsUndCategs'>
            <p className='prodsUndCategs__title'><span>Лидеры продаж</span></p>
            <div className='prodsUndCategs__productsBlock'>
                {
                    products.filter(i => {
                        return i.category === 'Acer' ? i : i.class === 'Клавиатуры' ? i : i.class === 'Мыши' ? i : null
                    }).slice(0, 20).map((i) => (
                        <div key={i.id} className='prodsUndCategs__product'>
                            <a className='prodsUndCategs__product__googleSearch' title='Найти в google'
                               target={i.img.length === 0 ? '_blank' : "_self"}
                               href={i.img.length === 0 ? `http://www.google.kg/search?q=${i.product}` : `/${i.code}`}>
                                <img className='prodsUndCategs__product__img'
                                     src={i.img.length === 0 ? 'https://enter.kg/images/yandex.png' : i.img} alt="pic"/>
                            </a>
                            <Link to={`/${i.code}`} onClick={() => {
                                getCategHandler(i.class)
                                windowTop()
                            }} className="prodsUndCategs__product__name">{i.product}</Link>
                            <p className="prodsUndCategs__product__price">{i.price}$ - {(i.price * currency).toFixed(0)}сом</p>
                            <p className="prodsUndCategs__product__warranty">Комментарий(гарантия) : {i.comment}</p>
                            <p className="prodsUndCategs__product__code">Код товара : {i.code}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ProdsUndCategs;