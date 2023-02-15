import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCateg } from '../../../redux/reducers/storeItems';
import { ReactComponent as EmptyPhoto} from '../../../assets/camera-solid.svg';


function MainPageProducts({ currency, products }) {
  const dispatch = useDispatch();

  const getCategHandler = (prodCateg) => dispatch(getCateg(prodCateg));

  const windowTop = () => window.scrollTo(0, 0);

  return (
    <div className='mainPageProducts'>
      <p className='mainPageProducts__title'><span>Компьютерные корпусы</span></p>
      <div className='mainPageProducts__productsBlock'>
        {
            products
                .filter(i => i.subcategory === 'DEEPCOOL')
                .slice(0, 21)
                .map((i) => (
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
                            - {(i.price * currency).toFixed(0)}сом
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
      <p className='mainPageProducts__title'><span>Ноутбуки</span></p>
      <div className='mainPageProducts__productsBlock'>
        {
                    products.filter((i) => i.class === 'Notebook').slice(0, 21).map((i) => (
                      <div key={i.id} className='mainPageProducts__product'>
                        {
                                i.img.length === 0
                                  ? (
                                    <Link
                                        onClick={() => {
                                            getCategHandler(i.class);
                                            windowTop();
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
                            getCategHandler(i.category);
                            windowTop();
                          }}
                          className='mainPageProducts__product__name'
                        >
                          {i.product}
                        </Link>
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
      <p className='mainPageProducts__title'><span>Видеонаблюдение</span></p>
      <div className='mainPageProducts__productsBlock'>
        {
                    products
                        .filter((i) => !i.product.includes('DAHUA') ? i.category === 'Видеокамеры' : null)
                        .slice(0, 21)
                        .map((i) => (
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
                            getCategHandler(i.category);
                            windowTop();
                          }}
                          className='mainPageProducts__product__name'
                        >
                          {i.product}
                        </Link>
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

export default MainPageProducts;
