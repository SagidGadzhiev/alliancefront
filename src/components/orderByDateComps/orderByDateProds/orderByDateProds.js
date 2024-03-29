import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getCateg } from '../../../redux/reducers/storeItems';
import { ReactComponent as EmptyPhoto} from '../../../assets/camera-solid.svg';


function OrderByDateProds({ currency }) {
  const dispatch = useDispatch();

  const { num } = useParams();

  const ordered = useSelector((s) => s.storeItems.ordered);

  const getCategHandler = (prodCateg) => dispatch(getCateg(prodCateg));

  const windowTop = () => window.scrollTo(0, 0);

  return (
    <div className='orderByDate'>
      {
                ordered
                  .filter((i) => +i.orderNum === +num)
                  .map((obj, index) => (
                    <div key={index + 1}>
                      <h2 className='orderByDate__title'>
                        Заказ оформленный на число :
                        {obj.orderDate}
                      </h2>
                      <h2 className='orderByDate__title'>
                        Номер заказа :
                        {obj.orderNum}
                      </h2>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                      }}
                      >
                        {
                                    obj.shopping.map((i) => (
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
                                        <p className='mainPageProducts__product__price'>
                                          {i.price === undefined ? i.price : (i.price).toFixed(2)}
                                          $
                                          -
                                          {(i.price * currency).toFixed(0)}
                                          сом
                                        </p>
                                        <p className='mainPageProducts__product__warranty'>
                                          Комментарий(гарантия)
                                          :
                                          {i.comment}
                                        </p>
                                        <p className='mainPageProducts__product__code'>
                                          Код товара :
                                          {i.code}
                                        </p>
                                        <p className='mainPageProducts__product__code'>
                                          Количество :
                                          {i.count}
                                          шт
                                        </p>
                                      </div>
                                    ))
                                }
                      </div>
                    </div>
                  ))
            }
    </div>
  );
}

export default OrderByDateProds;
