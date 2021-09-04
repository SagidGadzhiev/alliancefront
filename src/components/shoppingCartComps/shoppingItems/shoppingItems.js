import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getCateg, removeShopping, updateCount} from "../../../redux/reducers/storeItems";
import {useDispatch} from "react-redux";

const ShoppingItems = ({totalPrice, currency, shoppingProducts}) => {

    const [count, setCount] = useState(0);

    const dispatch = useDispatch();

    const removeShopProd = (wishProdId) => {
        return shoppingProducts.filter((i) => {
            return i.id !== wishProdId
        })
    };

    const getCategHandler = (prodCateg) => {
        return dispatch(getCateg(prodCateg));
    };

    const windowTop = () => {
        return window.scrollTo(0, 0);
    };

    const countPlus = (prodId) => {
        return shoppingProducts.map(i => {
            return prodId === i.id ? {...i, count: i.count + 1} : i
        })
    };

    const countMinus = (prodId) => {
        return shoppingProducts.map(i => {
            return prodId === i.id ? {...i, count: i.count - 1} : i
        })
    };

    return (
        <div className='shoppingItems wishesItems'>
            <p className="wishesItems__title">Товары на оформление</p>
            {
                shoppingProducts.length === 0 ? <p className='noWishes'>Корзина пустая</p> :
                    <div>
                        <table className='wishesItems__table'>
                            <thead className='wishesItems__table__thead'>
                            <tr className='wishesItems__table__thead__tr'>
                                <th className='wishesItems__table__thead__tr__th' colSpan={1}>Код товара</th>
                                <th className='wishesItems__table__thead__tr__th' colSpan={1}>Картинка</th>
                                <th className='wishesItems__table__thead__tr__th' colSpan={1}>Название</th>
                                <th className='wishesItems__table__thead__tr__th' colSpan={1}>Цена</th>
                                <th className='wishesItems__table__thead__tr__th' colSpan={2}>Действия</th>
                                <th className='wishesItems__table__thead__tr__th' colSpan={1}>Итого</th>
                            </tr>
                            </thead>
                            <tbody className='wishesItems__table__tbody'>
                            {
                                shoppingProducts.map(i => (
                                    <tr className='wishesItems__table__tbody__tr' key={i.id}>
                                        <td className='wishesItems__table__tbody__tr__td' rowSpan={1}>{i.code}</td>
                                        <td className='wishesItems__table__tbody__tr__td' rowSpan={1}>
                                            <a className='wishesItems__table__tbody__tr__td__googleSearch'
                                               title='Найти в google'
                                               target={i.img.length === 0 ? '_blank' : "_self"}
                                               href={i.img.length === 0 ? `http://www.google.kg/search?q=${i.product}` : `/${i.code}`}>
                                                <img className='wishesItems__table__tbody__tr__td__img'
                                                     src={i.img.length === 0 ? 'https://enter.kg/images/yandex.png' : i.img}
                                                     alt="pic"/>
                                            </a>
                                        </td>
                                        <td className='wishesItems__table__tbody__tr__td' rowSpan={1}>
                                            <Link className='wishesItems__table__tbody__tr__td__name' to={`/${i.code}`}
                                                  onClick={() => {
                                                      getCategHandler(i.class)
                                                      windowTop()
                                                  }}>{i.product}</Link>
                                        </td>
                                        <td className='wishesItems__table__tbody__tr__td' rowSpan={1}>{i.price}$
                                            - {(i.price * currency).toFixed(0)}сом
                                        </td>
                                        <td className='wishesItems__table__tbody__tr__td' rowSpan={1}>
                                            <input className='wishesItems__table__tbody__tr__td__input' type="number"
                                                   onChange={(e) => setCount(e.target.value)} value={i.count}/>
                                            <button onClick={() => dispatch(updateCount(countPlus(i.id)))}
                                                    className='wishesItems__table__tbody__tr__td__btn' type="button">+
                                            </button>
                                            <button disabled={i.count <= 1}
                                                    onClick={() => dispatch(updateCount(countMinus(i.id)))}
                                                    className='wishesItems__table__tbody__tr__td__btn' type="button">-
                                            </button>
                                        </td>
                                        <td onClick={() => dispatch(removeShopping(removeShopProd(i.id)))}
                                            className='wishesItems__table__tbody__tr__td wishesItems__table__tbody__tr__td_cross'
                                            rowSpan={1}>
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                                 data-icon="times"
                                                 className="svg-inline--fa fa-times fa-w-11 wishesItems__table__tbody__tr__td__pic"
                                                 role="img"
                                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                                                <path fill=""
                                                      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                                            </svg>
                                        </td>
                                        <td className='wishesItems__table__tbody__tr__td'
                                            rowSpan={1}>{((i.count) * (i.price)).toFixed(1)}$
                                            - {(i.count) * (i.price * currency).toFixed(0)}сом
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>

                        <div className='total__price'>
                            <p className='total__price__title'>Итоговая цена : </p>
                            <p className='total__price__text'>{totalPrice.toFixed(1)}$
                                - {(totalPrice * currency).toFixed(0)}сом</p>
                        </div>

                    </div>
            }
        </div>
    );
};

export default ShoppingItems;