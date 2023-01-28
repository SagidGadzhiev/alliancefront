import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCateg } from '../../../redux/reducers/storeItems';
import { ReactComponent as EmptyPhoto} from '../../../assets/camera-solid.svg';


function BestsellProds({ currency, products, bestsellersProducts }) {
  const dispatch = useDispatch();

  const getCategHandler = (prodCateg) => dispatch(getCateg(prodCateg));

  return (
    <div style={{ margin: '20px 0 0 0' }}>
      <p className='prodsUndCategs__title'><span>Популярные товары</span></p>
      <div className='prodsUndCategs__productsBlock'>
        {
            bestsellersProducts
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

export default BestsellProds;
