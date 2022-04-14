import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCateg, getShopping, getWishes } from '../../../redux/reducers/storeItems';

import { ToastContainer, toast } from 'react-toastify';
import useDebounce from '../../../hooks/useDebounce';


const ProdCard = ({ currency, products }) => {
    const { productCode } = useParams();
    const dispatch = useDispatch();
    const wishes = useSelector(s => s.storeItems.wishes.map(i => i.code));
    const shopping = useSelector(s => s.storeItems.shopping.map(i => i.code));
    const addWishProd = (prod) => {
        return dispatch(getWishes(prod));
    };
    const addShopProd = (prod) => {
        return dispatch(getShopping(prod));
    };
    const debouncedWish = useDebounce(addWishProd, 2500);
    const debouncedShop = useDebounce(addShopProd, 2500);
    const wishHandler = (prod) => {
        if (wishes.includes(prod.code)) {
            return toast.error('Товар уже находится в списке желаний!', {
                position: toast.POSITION.TOP_CENTER
            });
        }
        toast.success(`Товар ${prod.product} добавлен в список желаемого!`, {
            position: toast.POSITION.TOP_CENTER
        });
        return debouncedWish(prod);
    };
    const shopHandler = (prod) => {
        if (shopping.includes(prod.code)) {
            return toast.error('Товар уже находится в корзине!', {
                position: toast.POSITION.TOP_CENTER
            });
        }
        toast.success(`Товар ${prod.product} добавлен в корзину!`, {
            position: toast.POSITION.TOP_CENTER
        });
        return debouncedShop(prod);
    };


    const getCategHandler = (prodCateg) => {
        return dispatch(getCateg(prodCateg));
    };

    return (
        <div className='prodCard'>
            <ToastContainer autoClose={1000} />
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
                                         src='https://enter.kg/images/yandex.png' alt="" />
                                </a> :
                                <div onClick={() => {
                                    getCategHandler(i.class);
                                }} className='prodCard__itemDescription__googleSearch'>
                                    <img className='prodCard__itemDescription__img'
                                         src={i.img}
                                         alt="" />
                                </div>
                        }
                        <div className='prodCard__itemDescription__aboutProduct'>
                            <div className='prodCard__itemDescription__aboutProdBlock'>
                                <p className='prodCard__itemDescription__aboutProdBlock__name'>
                                    {
                                        i.product.includes('/') && i.product.includes(',') ?
                                            i.product
                                                .replace(/,/g, ' ,')
                                                .replace('/', ' /') :
                                            i.product.includes('/') ?
                                                i.product.split('/').join(' /') :
                                                i.product.includes(',') ?
                                                    i.product.split(',').join(' ,') :
                                                    i.product
                                    }
                                </p>
                                <p className={`${i.available === 'В наличии' ? 'prodCard__itemDescription__aboutProdBlock__available' : 'prodCard__itemDescription__aboutProdBlock__notAvailable'}`}>Наличие
                                    : <span>{i.available}</span>
                                </p>
                                <p className='prodCard__itemDescription__aboutProdBlock__price'>
                                    {i.price === undefined ? i.price : (i.price).toFixed(2)}$
                                    - {(i.price * currency).toFixed(0)}сом (1USD = {currency}KGS)</p>
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
                                    <button type='button'
                                            // disabled={shopping.includes(i.code)}
                                            onClick={() => shopHandler(i)}
                                            className='prodCard__itemDescription__wishBuy'
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                                 data-icon="shopping-cart"
                                                 className="svg-inline--fa fa-shopping-cart fa-w-18 prodCard__itemDescription__wishBuy__pic"
                                                 role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                <path fill=""
                                                      d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path>
                                            </svg>
                                            <p className='prodCard__itemDescription__wishBuy__text'>Добавить в
                                                корзину</p>
                                        </div>
                                        {
                                            shopping.includes(i.code) ?
                                                <svg
                                                    style={{
                                                        fill: '#ea3a3c',
                                                        width: '20px',
                                                        height: '20px'
                                                    }}
                                                    aria-hidden="true" focusable="false" data-prefix="fas"
                                                    data-icon="check-circle"
                                                    className="svg-inline--fa fa-check-circle fa-w-16"
                                                    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill=""
                                                          d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                                                </svg> : null
                                        }
                                    </button>
                                    <button type='button'
                                            // disabled={wishes.includes(i.code)}
                                            onClick={() => wishHandler(i)}
                                            className='prodCard__itemDescription__wishBuy'
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
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
                                        </div>
                                        {
                                            wishes.includes(i.code) ?
                                                <svg
                                                    style={{
                                                        fill: '#ea3a3c',
                                                        width: '20px',
                                                        height: '20px'
                                                    }}
                                                    aria-hidden="true" focusable="false" data-prefix="fas"
                                                    data-icon="check-circle"
                                                    className="svg-inline--fa fa-check-circle fa-w-16"
                                                    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill=""
                                                          d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                                                </svg> : null
                                        }
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
