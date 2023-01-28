import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { getCateg, getShopping, getWishes } from '../../../redux/reducers/storeItems';
import useDebounce from '../../../hooks/useDebounce';
import { ReactComponent as CheckSvg } from '../../../assets/check-circle-solid.svg';
import { ReactComponent as ShoppingCartSvg } from '../../../assets/shopping-cart-solid.svg';
import { ReactComponent as HeartSvg } from '../../../assets/heart-solid.svg';
import { ReactComponent as EmptyPhoto} from '../../../assets/camera-solid.svg';


function SearchingProducts({ currency, products, firstCountryIndex, lastCountryIndex }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((s) => s.storeItems.currentPageNumber);
  const wishes = useSelector((s) => s.storeItems.wishes.map((i) => i.code));
  const shopping = useSelector((s) => s.storeItems.shopping.map((i) => i.code));

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
      <h3 style={{ textAlign: 'right' }} className='categPageProducts__currentPage'>
        Страница:
        {currentPage}
      </h3>
      {
                products
                    .map((i) => (
                    <div className='categPageProducts__product' key={i.id}>
                      {
                                i.img.length === 0
                                  ? (
                                        <Link
                                            onClick={() => {
                                              getCategHandler(i.class);
                                            }}
                                            className='categPageProducts__product__googleSearch'
                                            to={`/${i.code}`}
                                        >
                                          <EmptyPhoto
                                              className='categPageProducts__product__img'
                                          />
                                        </Link>
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
                      <div style={{ width: '100%' }}>
                        <Link
                          to={`/${i.code}`}
                          onClick={() => {
                            getCategHandler(i.category);
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
                          Комментарий(гарантия) :
                          {i.comment}
                        </p>
                        <p className='categPageProducts__product__code'>
                          Код товара :
                          {i.code}
                        </p>
                      </div>
                      <div className='categPageProducts__product__picPriceBlock'>
                        <p className='categPageProducts__product__price'>
                          {i.price === undefined ? i.price : (i.price).toFixed(2)}
                          $
                          - {(i.price * currency).toFixed(0)}
                          сом
                        </p>
                        <p className={`${i.available === 'В наличии' ? 'categPageProducts__product__text' : 'categPageProducts__product__text__dontExist'}`}>{i.available}</p>
                        <div className='categPageProducts__product__wishBuy'>
                          <button
                            type='button'
                            onClick={() => shopHandler(i)}
                            className='categPageProducts__product__wishBuy__block'
                          >
                            {
                                            shopping.includes(i.code)
                                              ? <CheckSvg style={{ fill: '#ea3a3c', width: '15px', height: '15px' }} />
                                              : <ShoppingCartSvg className='categPageProducts__product__wishBuy__block__pic' />
                                        }
                          </button>
                          <button
                            type='button'
                            onClick={() => wishHandler(i)}
                            className='categPageProducts__product__wishBuy__block'
                          >
                            {
                                            wishes.includes(i.code)
                                              ? <CheckSvg style={{ fill: '#ea3a3c', width: '15px', height: '15px' }} />
                                              : <HeartSvg className='categPageProducts__product__wishBuy__block__pic' />
                                        }
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                    .slice(firstCountryIndex, lastCountryIndex)
            }
      <h3 style={{ textAlign: 'right', margin: '10px 0 0 0' }} className='categPageProducts__currentPage'>
        Страница:
        {currentPage}
      </h3>
    </div>
  );
}

export default SearchingProducts;
