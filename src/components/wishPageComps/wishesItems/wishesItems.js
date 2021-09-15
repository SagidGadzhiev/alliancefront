import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCateg, getShopping, removeWish} from "../../../redux/reducers/storeItems";
import {Link} from "react-router-dom";

const WishesItems = ({currency, wishesProducts}) => {

    const dispatch = useDispatch();

    const shopping = useSelector(s => s.storeItems.shopping.map(i => i.code));

    const removeWishes = (wishProdId) => {
        return wishesProducts.filter((i) => {
            return i.id !== wishProdId
        })
    };

    const getCategHandler = (prodCateg) => {
        return dispatch(getCateg(prodCateg));
    };

    const windowTop = () => {
        return window.scrollTo(0, 0);
    };

    const addShopProd = (prod) => {
        if (shopping.includes(prod.code)) {
            return alert('Товар уже находится в корзине.');
        } else {
            alert(`Товар добавлен в корзину.`);
            return dispatch(getShopping(prod))
        }
    };

    return (
        <div className='wishesItems'>
            <p className="wishesItems__title">Мой список желаемого</p>
            {
                wishesProducts.length === 0 ? <p className='noWishes'>Список желаемых товаров пуст</p> :
                    <table className='wishesItems__table'>
                        <thead className='wishesItems__table__thead'>
                        <tr className='wishesItems__table__thead__tr'>
                            <th className='wishesItems__table__thead__tr__th' colSpan={1}>Код товара</th>
                            <th className='wishesItems__table__thead__tr__th' colSpan={1}>Картинка</th>
                            <th className='wishesItems__table__thead__tr__th' colSpan={1}>Название</th>
                            <th className='wishesItems__table__thead__tr__th' colSpan={1}>Цена</th>
                            <th className='wishesItems__table__thead__tr__th' colSpan={1}>Комментарий(гарантия)</th>
                            <th className='wishesItems__table__thead__tr__th' colSpan={2}>Действия</th>
                        </tr>
                        </thead>
                        <tbody className='wishesItems__table__tbody'>
                        {
                            wishesProducts.map(i => (
                                <tr className='wishesItems__table__tbody__tr' key={i.id}>
                                    <td className='wishesItems__table__tbody__tr__td' rowSpan={1}>{i.code}</td>
                                    <td className='wishesItems__table__tbody__tr__td' rowSpan={1}>
                                        {
                                            i.img.length === 0 ?
                                                <a className='wishesItems__table__tbody__tr__td__googleSearch'
                                                   title='Найти в google'
                                                   target='_blank'
                                                   href={`http://www.google.kg/search?q=${i.product}`}>
                                                    <img className='wishesItems__table__tbody__tr__td__img'
                                                         src='https://enter.kg/images/yandex.png' alt="pic"/>
                                                </a> :
                                                <Link onClick={() => {
                                                    getCategHandler(i.class);
                                                    windowTop()
                                                }} className='wishesItems__table__tbody__tr__td__googleSearch'
                                                      to={`/${i.code}`}>
                                                    <img className='wishesItems__table__tbody__tr__td__img' src={i.img}
                                                         alt="pic"/>
                                                </Link>
                                        }
                                    </td>
                                    <td className='wishesItems__table__tbody__tr__td' rowSpan={1}>
                                        <Link className='wishesItems__table__tbody__tr__td__name' to={`/${i.code}`}
                                              onClick={() => {
                                                  getCategHandler(i.class);
                                                  windowTop()
                                              }}>{i.product}</Link>
                                    </td>
                                    <td className='wishesItems__table__tbody__tr__td' rowSpan={1}>{i.price}$
                                        - {(i.price * currency).toFixed(0)}сом
                                    </td>
                                    <td className='wishesItems__table__tbody__tr__td' rowSpan={1}>{i.comment}</td>
                                    <td onClick={() => dispatch(removeWish(removeWishes(i.id)))}
                                        className='wishesItems__table__tbody__tr__td wishesItems__table__tbody__tr__td_cross'
                                        rowSpan={1}>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
                                             className="svg-inline--fa fa-times fa-w-11 wishesItems__table__tbody__tr__td__pic"
                                             role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                                            <path fill=""
                                                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                                        </svg>
                                    </td>
                                    <td onClick={() => addShopProd(i)}
                                        className='wishesItems__table__tbody__tr__td wishesItems__table__tbody__tr__td_card'
                                        rowSpan={1}>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                             data-icon="shopping-cart"
                                             className="svg-inline--fa fa-shopping-cart fa-w-18 wishesItems__table__tbody__tr__td__pic"
                                             role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path fill=""
                                                  d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path>
                                        </svg>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
            }
        </div>
    );
};

export default WishesItems;