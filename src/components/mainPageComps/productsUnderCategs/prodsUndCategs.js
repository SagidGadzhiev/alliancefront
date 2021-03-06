import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCateg } from '../../../redux/reducers/storeItems';

function ProdsUndCategs({ currency, products }) {
  const dispatch = useDispatch();

  const getCategHandler = (prodCateg) => dispatch(getCateg(prodCateg));

  const windowTop = () => window.scrollTo(0, 0);

  return (
    <div className='prodsUndCategs'>
      <p className='prodsUndCategs__title'><span>Лидеры продаж</span></p>
      <div className='prodsUndCategs__productsBlock'>
        {
                    products.filter((i) => (i.category === 'Acer' ? i : i.class === 'Клавиатуры' ? i : i.class === 'Мыши' ? i : null)).slice(0, 10).map((i) => (
                      <div key={i.id} className='prodsUndCategs__product'>
                        {
                                i.img.length === 0
                                  ? (
                                    <a
                                      className='prodsUndCategs__product__googleSearch'
                                      title='Найти в google'
                                      rel='noreferrer'
                                      target='_blank'
                                      href={`http://www.google.kg/search?q=${i.product}`}
                                    >
                                      <img
                                        className='prodsUndCategs__product__img'
                                        src='https://enter.kg/images/yandex.png'
                                        alt=''
                                      />
                                    </a>
                                  )
                                  : (
                                    <Link
                                      onClick={() => {
                                        getCategHandler(i.class);
                                        windowTop();
                                      }}
                                      className='prodsUndCategs__product__googleSearch'
                                      to={`/${i.code}`}
                                    >
                                      <img
                                        className='prodsUndCategs__product__img'
                                        src={i.img}
                                        alt=''
                                      />
                                    </Link>
                                  )
                            }
                        <Link
                          to={`/${i.code}`}
                          onClick={() => {
                            getCategHandler(i.class);
                            windowTop();
                          }}
                          className='prodsUndCategs__product__name'
                        >
                          {i.product}
                        </Link>
                        <p className='prodsUndCategs__product__price'>
                          {i.price === undefined ? i.price : (i.price).toFixed(2)}
                          $
                          - {(i.price * currency).toFixed(0)}
                          сом
                        </p>
                        <p className='prodsUndCategs__product__warranty'>
                          Комментарий(гарантия) :
                          {i.comment}
                        </p>
                        <p className='prodsUndCategs__product__code'>
                          Код товара :
                          {i.code}
                        </p>
                      </div>
                    ))
                }
      </div>
    </div>
  );
}

export default ProdsUndCategs;
