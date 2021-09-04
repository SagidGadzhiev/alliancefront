import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {getCateg} from "../../../redux/reducers/storeItems";

const OrderByDateProds = ({currency}) => {

    const dispatch = useDispatch()

    const {dating} = useParams()

    const ordered = useSelector(s => s.storeItems.ordered);

    const getCategHandler = (prodCateg) => {
        return dispatch(getCateg(prodCateg));
    };

    const windowTop = () => {
        return window.scrollTo(0, 0);
    };

    return (
        <div className='orderByDate'>
            {
                ordered
                    .filter((i, idx) => {
                        return i.orderDate === dating
                    })
                    .map((obj, index, arr) => (
                        <div key={index + 1}>
                            <h2 className='orderByDate__title'>Заказ оформленный на число : {obj.orderDate}</h2>
                            <div style={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center"
                            }}>
                                {
                                    obj.shopping.map((i, idx, arr) => (
                                        <div key={i.id} className='mainPageProducts__product'>
                                            <a className='mainPageProducts__product__googleSearch'
                                               title='Найти в google'
                                               target={i.img.length === 0 ? '_blank' : "_self"}
                                               href={i.img.length === 0 ? `http://www.google.kg/search?q=${i.product}` : `/${i.code}`}>
                                                <img className='mainPageProducts__product__img'
                                                     src={i.img.length === 0 ? 'https://enter.kg/images/yandex.png' : i.img}
                                                     alt="pic"/>
                                            </a>
                                            <Link to={`/${i.code}`} onClick={() => {
                                                getCategHandler(i.class)
                                                windowTop()
                                            }}
                                                  className="mainPageProducts__product__name">{i.product}</Link>
                                            <p className="mainPageProducts__product__price">{i.price}$
                                                - {(i.price * currency).toFixed(0)}сом</p>
                                            <p className="mainPageProducts__product__warranty">Комментарий(гарантия)
                                                : {i.comment}</p>
                                            <p className="mainPageProducts__product__code">Код товара : {i.code}</p>
                                            <p className="mainPageProducts__product__code">Количество : {i.count}шт</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
            }
        </div>
    );
};

export default OrderByDateProds;