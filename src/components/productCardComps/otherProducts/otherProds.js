import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCateg } from '../../../redux/reducers/storeItems';

function OtherProds({ currency, products }) {
  const dispatch = useDispatch();

  const getCategHandler = (prodCateg) => dispatch(getCateg(prodCateg));

  const windowTop = () => window.scrollTo(0, 0);

  return (
    <div>
      <p className='sameProds__title'><span>Другие товары</span></p>
      <Carousel
        className='otherProds'
        infiniteLoop
        stopOnHover
        autoPlay={false}
        interval={5000}
        showArrows
        showThumbs={false}
        centerMode
      >
        {
                    products
                      .filter((i) => (i.class === 'Наушники' ? i : null))
                      .slice(0, 10)
                      .map((i) => (
                        <div className='otherProds__product' key={i.id}>
                          {
                                    i.img.length === 0
                                      ? (
                                        <a
                                          className='otherProds__product__googleSearch'
                                          title='Найти в google'
                                          rel='noreferrer'
                                          target='_blank'
                                          href={`http://www.google.kg/search?q=${i.product}`}
                                        >
                                          <img
                                            className='otherProds__product__img'
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
                                          className='otherProds__product__googleSearch'
                                          to={`/${i.code}`}
                                        >
                                          <img
                                            className='otherProds__product__img'
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
                            className='otherProds__product__name'
                          >
                            {i.product}
                          </Link>
                          <p className='otherProds__product__price'>
                            {i.price === undefined || i.price === null ? i.price : (i.price).toFixed(2)}
                            $
                            - {(i.price * currency).toFixed(0)}сом
                          </p>
                          <p className='otherProds__product__comment'>
                            Комментарий(гарантия) :
                            {i.comment}
                          </p>
                          <p className='otherProds__product__code'>
                            Код товара :
                            {i.code}
                          </p>
                        </div>
                      ))
                }
      </Carousel>
    </div>
  );
}

export default OtherProds;
