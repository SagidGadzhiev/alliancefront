import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCateg } from '../../../redux/reducers/storeItems';
import { ReactComponent as EmptyPhoto} from '../../../assets/camera-solid.svg';


function SaleProds({ currency }) {
  const sales = useSelector((s) => s.storeItems.sales);

  const dispatch = useDispatch();

  const getCategHandler = (prodCateg) => dispatch(getCateg(prodCateg));

  const windowTop = () => window.scrollTo(0, 0);

  return (
    <div style={{ margin: '20px 0 20px 0' }}>
      <p className='prodsUndCategs__title'><span>Товары по акции</span></p>
      <div className='prodsUndCategs__productsBlock'>
        {
                    sales.map((i) => (
                      <div key={i.id} className='mainPageProducts__product'>
                        {
                                i.img.length === 0
                                  ? (
                                        <Link
                                            onClick={() => {
                                                getCategHandler(i.class);
                                            }}
                                            className='mainPageProducts__product__googleSearch'
                                            to={`/${i.code}`}
                                        >
                                            <EmptyPhoto
                                                className='mainPageProducts__product__img'
                                            />
                                        </Link>
                                  )
                                  : (
                                    <Link
                                      onClick={() => {
                                        getCategHandler(i.class);
                                        windowTop();
                                      }}
                                      className='mainPageProducts__product__googleSearch'
                                      to={`/${i.code}`}
                                    >
                                      <img
                                        onError={(e) => getImgStatus(e)}
                                        className='mainPageProducts__product__img'
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
                          className='mainPageProducts__product__name'
                        >
                          {i.product}
                        </Link>
                        <p className='saleProd__product__lineThroughPrice'>
                          {i.price === undefined ? i.price : (i.price + (i.price * 0.1)).toFixed(2)}
                          $
                          - {((i.price * currency) + ((i.price * currency) * 0.1)).toFixed(0)}
                          сом
                        </p>
                        <p className='mainPageProducts__product__price'>
                          {i.price === undefined ? i.price : (i.price).toFixed(2)}
                          $
                          - {(i.price * currency).toFixed(0)}
                          сом
                        </p>
                        <p className='mainPageProducts__product__warranty'>
                          Комментарий(гарантия) :
                          {i.comment}
                        </p>
                        <p className='mainPageProducts__product__code'>
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

export default SaleProds;
