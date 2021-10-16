import React from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getCateg, getShopping, getWishes} from "../../../redux/reducers/storeItems";

const ProdCard = ({currency, products}) => {

    const dispatch = useDispatch();

    const wishes = useSelector(s => s.storeItems.wishes.map(i => i.code));
    const shopping = useSelector(s => s.storeItems.shopping.map(i => i.code));

    const addWishProd = (prod) => {
        if (wishes.includes(prod.code)) {
            return alert('Товар уже находится в списке желаний.');
        } else {
            alert(`Товар добавлен в список желаний.`);
            return dispatch(getWishes(prod))
        }
    };

    const addShopProd = (prod) => {
        if (shopping.includes(prod.code)) {
            return alert('Товар уже находится в корзине.');
        } else {
            alert(`Товар добавлен в корзину.`);
            return dispatch(getShopping(prod))
        }
    };

    const {productCode} = useParams();

    const getCategHandler = (prodCateg) => {
        return dispatch(getCateg(prodCateg));
    };

    const windowTop = () => {
        // return window.scrollTo(0, 0);
    };

    return (
        <div className='prodCard'>
            {
                products.filter(i => i.code === productCode).map((i) => (
                    <div className='prodCard__itemDescription' key={i.id}>
                        {
                            i.img.length === 0 ?
                                <a className='prodCard__itemDescription__googleSearch'
                                   title='Найти в google'
                                   rel='noreferrer'
                                   target='_blank'
                                   href={`http://www.google.kg/search?q=${i.product}`}>
                                    <img className='prodCard__itemDescription__img'
                                         src='https://enter.kg/images/yandex.png' alt="pic"/>
                                </a> :
                                <div onClick={() => {
                                    getCategHandler(i.class);
                                    windowTop()
                                }} className='prodCard__itemDescription__googleSearch'
                                    // to={`/${i.code}`}
                                >
                                    <img className='prodCard__itemDescription__img' src={i.img}
                                         alt="pic"/>
                                </div>
                        }
                        <div className='prodCard__itemDescription__aboutProduct'>
                            <div className='prodCard__itemDescription__aboutProdBlock'>
                                <p className='prodCard__itemDescription__aboutProdBlock__name'>{i.product}</p>
                                <p className={`${i.available === 'В наличии' ? 'prodCard__itemDescription__aboutProdBlock__available' : 'prodCard__itemDescription__aboutProdBlock__notAvailable'}`}>Наличие
                                    : <span>{i.available}</span>
                                </p>
                                <p className='prodCard__itemDescription__aboutProdBlock__price'>{i.price}$
                                    - {(i.price * currency).toFixed(0)}сом</p>
                                <p className='prodCard__itemDescription__aboutProdBlock__attention'>Убедительная просьба
                                    уточнять цену товара на момент заказа</p>
                            </div>
                            <div className='prodCard__itemDescription__aboutProdBlock'>
                                <p className='prodCard__itemDescription__aboutProdBlock__text'>Тип
                                    : <span>{i.class}</span>
                                </p>
                                <p className='prodCard__itemDescription__aboutProdBlock__text'>Категория
                                    : <span>{i.category}</span>
                                </p>
                                <p className='prodCard__itemDescription__aboutProdBlock__text'>Подкатегория
                                    : <span>{i.subcategory}</span>
                                </p>
                                <p className='prodCard__itemDescription__aboutProdBlock__text'>Комментарий(гарантия)
                                    : <span>{i.comment}</span>
                                </p>
                                <p className='prodCard__itemDescription__aboutProdBlock__text'>Код товара
                                    : <span>{i.code}</span>
                                </p>
                                <p className='prodCard__itemDescription__aboutProdBlock__text'>Ед.
                                    : <span>{i.unit}</span>
                                </p>
                            </div>
                            <div className='prodCard__itemDescription__aboutProdBlock'>
                                <p className="prodCard__itemDescription__aboutProdBlock__title">Действия</p>
                                <div className="prodCard__itemDescription__aboutProdBlock__block">
                                    <button type='button' disabled={i.available !== 'В наличии'}
                                            onClick={() => addShopProd(i)}
                                            className='prodCard__itemDescription__wishBuy'>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                             data-icon="shopping-cart"
                                             className="svg-inline--fa fa-shopping-cart fa-w-18 prodCard__itemDescription__wishBuy__pic"
                                             role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path fill=""
                                                  d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path>
                                        </svg>
                                        <p className='prodCard__itemDescription__wishBuy__text'>Добавить в
                                            корзину</p>
                                    </button>
                                    <button type='button' disabled={i.available !== 'В наличии'}
                                            onClick={() => addWishProd(i)}
                                            className='prodCard__itemDescription__wishBuy'>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                             data-icon="heart"
                                             className="svg-inline--fa fa-heart fa-w-16 prodCard__itemDescription__wishBuy__pic"
                                             role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill=""
                                                  d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                                        </svg>
                                        <p className='prodCard__itemDescription__wishBuy__text'>Добавить в список
                                            желаемых товаров</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ProdCard;