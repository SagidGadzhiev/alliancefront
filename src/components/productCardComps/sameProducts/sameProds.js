import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCateg} from "../../../redux/reducers/storeItems";
import {Link} from "react-router-dom";

const SameProds = ({currency, products}) => {

    const categs = useSelector(s => s.storeItems.categ);

    const dispatch = useDispatch();

    const getCategHandler = (prodCateg) => {
        return dispatch(getCateg(prodCateg));
    };

    const windowTop = () => {
        return window.scrollTo(0, 0);
    };

    return (
        <div className='sameProds'>
            <p className='sameProds__title'><span>Похожие товары</span></p>
            <div className="sameProds__productsBlock">
                {
                    products.filter(i => i.class === categs ? i : i.category === categs ? i : i.subcategory === categs ? i : null).slice(0, 8).map((i) => (
                        <div key={i.id} className='sameProds__product'>
                            {
                                i.img.length === 0 ?
                                    <a className='sameProds__product__googleSearch'
                                       title='Найти в google'
                                       rel='noreferrer'
                                       target='_blank'
                                       href={`http://www.google.kg/search?q=${i.product}`}>
                                        <img className='sameProds__product__img'
                                             src='https://enter.kg/images/yandex.png' alt="pic"/>
                                    </a> :
                                    <Link onClick={() => {
                                        getCategHandler(i.class);
                                        windowTop()
                                    }} className='sameProds__product__googleSearch'
                                          to={`/${i.code}`}>
                                        <img className='sameProds__product__img' src={i.img}
                                             alt="pic"/>
                                    </Link>
                            }
                            <div className='sameProds__productsBlock__block'>
                                <Link to={`/${i.code}`} onClick={() => {
                                    getCategHandler(i.class);
                                    windowTop()
                                }}
                                      className="sameProds__productsBlock__name">{i.product}</Link>
                                <p className="sameProds__productsBlock__price">{i.price}$
                                    - {(i.price * currency).toFixed(0)}сом</p>
                                <p className="sameProds__productsBlock__code">Код : {i.code}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SameProds;