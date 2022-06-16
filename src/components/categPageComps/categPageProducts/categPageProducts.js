import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { getCateg, getShopping, getWishes } from '../../../redux/reducers/storeItems';
import useDebounce from '../../../hooks/useDebounce';

function CategPageProducts({
  currency, currentProduct, firstCountryIndex, lastCountryIndex, sortHandlerMin, sortHandlerMax,
}) {
  const { categ } = useParams();
  const dispatch = useDispatch();
  const wishes = useSelector((s) => s.storeItems.wishes.map((i) => i.code));
  const shopping = useSelector((s) => s.storeItems.shopping.map((i) => i.code));
  const currentPage = useSelector((s) => s.storeItems.currentPageNumber);
  const addWishProd = (prod) => dispatch(getWishes(prod));
  const addShopProd = (prod) => dispatch(getShopping(prod));
  const debouncedWish = useDebounce(addWishProd, 2500);
  const debouncedShop = useDebounce(addShopProd, 2500);
  const wishHandler = (prod) => {
    if (wishes.includes(prod.code)) {
      return toast.error('Товар уже находится в списке желаний!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    toast.success(`Товар ${prod.product} добавлен в список желаемого!`, {
      position: toast.POSITION.TOP_CENTER,
    });
    return debouncedWish(prod);
  };
  const shopHandler = (prod) => {
    if (shopping.includes(prod.code)) {
      return toast.error('Товар уже находится в корзине!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    toast.success(`Товар ${prod.product} добавлен в корзину!`, {
      position: toast.POSITION.TOP_CENTER,
    });
    return debouncedShop(prod);
  };

  const getCategHandler = (prodCateg) => dispatch(getCateg(prodCateg));


  return (
    <div className='categPageProducts'>
      <ToastContainer autoClose={1000} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button
            className='categPageProducts__sortBtn'
            type='submit'
            onClick={() => {
              sortHandlerMin('price');
            }}
          >
            Цена +
          </button>
          <button
            className='categPageProducts__sortBtn'
            type='submit'
            onClick={() => {
              sortHandlerMax('price');
            }}
          >
            Цена -
          </button>
        </div>
        <h3 className='categPageProducts__currentPage'>
          Страница:
          {currentPage}
        </h3>
      </div>

      {
                currentProduct
                  .map((i) => (
                    <div className='categPageProducts__product' key={i.id}>
                      {
                                i.img.length === 0
                                  ? (
                                    <a
                                      className='categPageProducts__product__googleSearch'
                                      title='Найти в google'
                                      rel='noreferrer'
                                      target='_blank'
                                      href={`http://www.google.kg/search?q=${i.product}`}
                                    >
                                      <img
                                        className='categPageProducts__product__img'
                                        src='https://enter.kg/images/yandex.png'
                                        alt=''
                                      />
                                    </a>
                                  )
                                  : (
                                    <Link
                                      onClick={() => {
                                        getCategHandler(i.class);
                                      }}
                                      className='categPageProducts__product__googleSearch'
                                      to={`/${i.code}`}
                                    >
                                      <img className='categPageProducts__product__img' src={i.img} alt='' />
                                    </Link>
                                  )
                            }
                      <div className='categPageProducts__product__wrapBlock'>
                        <Link
                          to={`/${i.code}`}
                          onClick={() => {
                            getCategHandler(categ);
                          }}
                          className='categPageProducts__product__name'
                        >
                          {
                                        i.product.includes('/') && i.product.includes(',')
                                          ? i.product
                                            .replace(/,/g, ' ,')
                                            .replace('/', ' /')
                                          : i.product.includes('/')
                                            ? i.product.split('/').join(' /')
                                            : i.product.includes(',')
                                              ? i.product.split(',').join(' ,')
                                              : i.product
                                    }
                        </Link>
                        <p className='categPageProducts__product__warranty'>
                          Комментарий(гарантия)
                          :
                          {i.comment}
                        </p>
                        <p className='categPageProducts__product__code'>
                          Код товара :
                          {i.code}
                        </p>
                      </div>
                      <div className='categPageProducts__product__picPriceBlock'>
                        <p className='categPageProducts__product__price'>
                          {
                            i.price === undefined || i.price === null ? i.price : (i.price).toFixed(2)
                          }
                          $ - {(i.price * currency).toFixed(0)}
                          сом
                        </p>
                        <p
                            // className={`${i.available === 'В наличии' ? 'categPageProducts__product__text' : 'categPageProducts__product__text__dontExist'}`}
                            className={`${i.price !== 0 ? 'categPageProducts__product__text' : 'categPageProducts__product__text__dontExist'}`}
                        >
                          {i.price === 0 ? 'Нет в наличии' : 'В наличии'}
                          {/*{i.available}*/}
                        </p>
                        <div className='categPageProducts__product__wishBuy'>
                          <button
                            type='button'
                            onClick={() => shopHandler(i)}
                            className='categPageProducts__product__wishBuy__block'
                          >
                            {
                                            shopping.includes(i.code)
                                              ? (
                                                <svg
                                                  style={{
                                                    fill: '#ea3a3c',
                                                    width: '15px',
                                                    height: '15px',
                                                  }}
                                                  aria-hidden='true'
                                                  focusable='false'
                                                  data-prefix='fas'
                                                  data-icon='check-circle'
                                                  className='svg-inline--fa fa-check-circle fa-w-16'
                                                  role='img'
                                                  xmlns='http://www.w3.org/2000/svg'
                                                  viewBox='0 0 512 512'
                                                >
                                                  <path
                                                    fill=''
                                                    d='M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z'
                                                  />
                                                </svg>
                                              )
                                              : (
                                                <svg
                                                  aria-hidden='true'
                                                  focusable='false'
                                                  data-prefix='fas'
                                                  data-icon='shopping-cart'
                                                  className='svg-inline--fa fa-shopping-cart fa-w-18 categPageProducts__product__wishBuy__block__pic'
                                                  role='img'
                                                  xmlns='http://www.w3.org/2000/svg'
                                                  viewBox='0 0 576 512'
                                                >
                                                  <path
                                                    fill=''
                                                    d='M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z'
                                                  />
                                                </svg>
                                              )
                                        }
                          </button>
                          <button
                            type='button'
                            onClick={() => wishHandler(i)}
                            className='categPageProducts__product__wishBuy__block'
                          >
                            {
                                            wishes.includes(i.code)
                                              ? (
                                                <svg
                                                  style={{
                                                    fill: '#ea3a3c',
                                                    width: '15px',
                                                    height: '15px',
                                                  }}
                                                  aria-hidden='true'
                                                  focusable='false'
                                                  data-prefix='fas'
                                                  data-icon='check-circle'
                                                  className='svg-inline--fa fa-check-circle fa-w-16'
                                                  role='img'
                                                  xmlns='http://www.w3.org/2000/svg'
                                                  viewBox='0 0 512 512'
                                                >
                                                  <path
                                                    fill=''
                                                    d='M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z'
                                                  />
                                                </svg>
                                              )
                                              : (
                                                <svg
                                                  aria-hidden='true'
                                                  focusable='false'
                                                  data-prefix='fas'
                                                  data-icon='heart'
                                                  className='svg-inline--fa fa-heart fa-w-16 categPageProducts__product__wishBuy__block__pic'
                                                  role='img'
                                                  xmlns='http://www.w3.org/2000/svg'
                                                  viewBox='0 0 512 512'
                                                >
                                                  <path
                                                    fill=''
                                                    d='M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z'
                                                  />
                                                </svg>
                                              )
                                        }
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                  .slice(firstCountryIndex, lastCountryIndex)
            }
      <h3 className='categPageProducts__currentPage' style={{textAlign: 'right', marginTop: 20}}>
        Страница:
        {currentPage}
      </h3>
    </div>
  );
}

export default CategPageProducts;
