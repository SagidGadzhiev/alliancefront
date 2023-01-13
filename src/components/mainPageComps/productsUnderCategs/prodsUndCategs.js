import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCateg } from '../../../redux/reducers/storeItems';
import { ReactComponent as EmptyPhoto} from '../../../assets/camera-solid.svg';


function ProdsUndCategs({ currency, products }) {
  const dispatch = useDispatch();

  const getCategHandler = (prodCateg) => dispatch(getCateg(prodCateg));

  const windowTop = () => window.scrollTo(0, 0);

  return (
    <div className='prodsUndCategs'>
      <p className='prodsUndCategs__title'><span>Wi-fi камеры</span></p>
      <div className='prodsUndCategs__productsBlock'>
        {
                    products
                        .filter(i => !i.product.includes('DAHUA') ? i.subcategory === 'IP кубические, WiFi' : null)
                        .slice(0, 15)
                        .map((i) => (
                      <div key={i.id} className='prodsUndCategs__product'>
                        {
                                i.img.length === 0
                                  ? (
                                        <Link
                                            onClick={() => {
                                                getCategHandler(i.class);
                                            }}
                                            className='prodsUndCategs__product__googleSearch'
                                            to={`/${i.code}`}
                                        >
                                            <EmptyPhoto
                                                className='prodsUndCategs__product__img'
                                            />
                                        </Link>
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
