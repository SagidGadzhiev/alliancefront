import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAllShopping,
  getCateg,
  removeShopping,
  updateCount,
} from '../../../redux/reducers/storeItems';
import { ReactComponent as EmptyPhoto} from '../../../assets/camera-solid.svg';


function ShoppingItems({ totalPrice, currency, shoppingProducts }) {
  const [, setCount] = useState(0);
  const dispatch = useDispatch();
  const ordered = useSelector((s) => s.storeItems.ordered);
  const removeShopProd = (wishProdId) => shoppingProducts.filter((i) => i.id !== wishProdId);
  const getCategHandler = (prodCateg) => dispatch(getCateg(prodCateg));
  const windowTop = () => window.scrollTo(0, 0);
  const countPlus = (prodId) => shoppingProducts.map((i) => (prodId === i.id ? { ...i, count: i.count + 1 } : i));
  const countMinus = (prodId) => shoppingProducts.map((i) => (prodId === i.id ? { ...i, count: i.count - 1 } : i));
  const cleanShoppingHandler = () => dispatch(clearAllShopping());

  return (
    <div className='shoppingItems wishesItems'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className='wishesItems__title'>Товары на оформление</p>
        <button
          style={{ display: `${shoppingProducts.length === 0 ? 'none' : 'block'}` }}
          className='shoppingItems__cleanBtn'
          onClick={cleanShoppingHandler}
          type='button'
        >
          очистить список
        </button>
      </div>
      {
                shoppingProducts.length === 0 ? <p className='noWishes'>Корзина пустая</p>
                  : (
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
                                        shoppingProducts.map((i) => (
                                          <tr className='wishesItems__table__tbody__tr' key={i.id}>
                                            <td className='wishesItems__table__tbody__tr__td' rowSpan={1}>{i.code}</td>
                                            <td className='wishesItems__table__tbody__tr__td' rowSpan={1}>
                                              {
                                                        i.img.length === 0
                                                          ? (
                                                                <Link
                                                                    onClick={() => {
                                                                      getCategHandler(i.class);
                                                                    }}
                                                                    className='wishesItems__table__tbody__tr__td__googleSearch'
                                                                    to={`/${i.code}`}
                                                                >
                                                                  <EmptyPhoto
                                                                      className='wishesItems__table__tbody__tr__td__img'
                                                                  />
                                                                </Link>
                                                          )
                                                          : (
                                                            <Link
                                                              onClick={() => {
                                                                getCategHandler(i.class);
                                                                windowTop();
                                                              }}
                                                              className='wishesItems__table__tbody__tr__td__googleSearch'
                                                              to={`/${i.code}`}
                                                            >
                                                              <img
                                                                className='wishesItems__table__tbody__tr__td__img'
                                                                src={i.img}
                                                                alt=''
                                                              />
                                                            </Link>
                                                          )
                                                    }
                                            </td>
                                            <td className='wishesItems__table__tbody__tr__td' rowSpan={1}>
                                              <Link
                                                className='wishesItems__table__tbody__tr__td__name'
                                                to={`/${i.code}`}
                                                onClick={() => {
                                                  getCategHandler(i.class);
                                                  windowTop();
                                                }}
                                              >
                                                {i.product}
                                              </Link>
                                            </td>
                                            <td className='wishesItems__table__tbody__tr__td' rowSpan={1}>
                                              {i.price === undefined ? i.price : (i.price).toFixed(2)}
                                              $
                                              -
                                              {(i.price * currency).toFixed(0)}
                                              сом
                                            </td>
                                            <td className='wishesItems__table__tbody__tr__td' rowSpan={1}>
                                              <p style={{ textAlign: 'center', marginBottom: '5px' }}>
                                                Кол:
                                                {i.count}
                                              </p>
                                              <div style={{ width: 60 }}>
                                                <button
                                                  onClick={() => dispatch(updateCount(countPlus(i.id)))}
                                                  className='wishesItems__table__tbody__tr__td__btn'
                                                  type='button'
                                                >
                                                  +
                                                </button>
                                                <button
                                                  disabled={i.count <= 1}
                                                  onClick={() => dispatch(updateCount(countMinus(i.id)))}
                                                  className='wishesItems__table__tbody__tr__td__btn'
                                                  type='button'
                                                >
                                                  -
                                                </button>
                                              </div>
                                            </td>
                                            <td
                                              onClick={() => dispatch(removeShopping(removeShopProd(i.id)))}
                                              className='wishesItems__table__tbody__tr__td wishesItems__table__tbody__tr__td_cross'
                                              rowSpan={1}
                                            >
                                              <svg
                                                aria-hidden='true'
                                                focusable='false'
                                                data-prefix='fas'
                                                data-icon='times'
                                                className='svg-inline--fa fa-times fa-w-11 wishesItems__table__tbody__tr__td__pic'
                                                role='img'
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 352 512'
                                              >
                                                <path
                                                  fill=''
                                                  d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z'
                                                />
                                              </svg>
                                            </td>
                                            <td
                                              className='wishesItems__table__tbody__tr__td'
                                              rowSpan={1}
                                            >
                                              {((i.count) * (i.price)).toFixed(1)}
                                              $
                                              -
                                              {(i.count) * (i.price * currency).toFixed(0)}
                                              сом
                                            </td>
                                          </tr>
                                        ))
                                    }
                        </tbody>
                      </table>

                      <div className='total__price'>
                        <p className='total__price__title'>Итоговая цена : </p>
                        <p className='total__price__text'>
                          {totalPrice.toFixed(1)}
                          $
                          -
                          {' '}
                          {(totalPrice * currency).toFixed(0)}
                          сом
                        </p>
                      </div>

                      <div className='total__price'>
                        <p className='total__price__title'>Доставка : </p>
                        <p className='total__price__text'>
                          NaN
                          {/*{*/}
                          {/*              totalPrice * currency < 2000 ? '150 сом' : 'бесплатно'*/}
                          {/*          }*/}
                        </p>
                      </div>

                    </div>
                  )
            }

      <Link
        onClick={() => windowTop()}
        style={{ display: `${ordered.length === 0 ? 'none' : 'block'}` }}
        className='shoppingItems__ordered'
        to='/ordered'
      >
        Список оформленных заказов
      </Link>

    </div>
  );
}

export default ShoppingItems;
