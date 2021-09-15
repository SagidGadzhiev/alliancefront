import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getCateg} from "../../../redux/reducers/storeItems";

const OtherProds = ({currency, products}) => {

    const dispatch = useDispatch();

    const getCategHandler = (prodCateg) => {
        return dispatch(getCateg(prodCateg));
    };

    const windowTop = () => {
        return window.scrollTo(0, 0);
    };

    return (
        <div>
            <p className='sameProds__title'><span>Другие товары</span></p>
            <Carousel className='otherProds' infiniteLoop={true} stopOnHover={true} autoPlay={false} interval={5000}
                      showArrows={true} showThumbs={false} centerMode={true} centerSlidePercentage={30}>
                {
                    products.slice(1100, 1118).map((i) => (
                        <div className='otherProds__product' key={i.id}>
                            {
                                i.img.length === 0 ?
                                    <a className='otherProds__product__googleSearch'
                                       title='Найти в google'
                                       target='_blank'
                                       href={`http://www.google.kg/search?q=${i.product}`}>
                                        <img className='otherProds__product__img'
                                             src='https://enter.kg/images/yandex.png' alt="pic"/>
                                    </a> :
                                    <Link onClick={() => {
                                        getCategHandler(i.class);
                                        windowTop()
                                    }} className='otherProds__product__googleSearch'
                                          to={`/${i.code}`}>
                                        <img className='otherProds__product__img' src={i.img}
                                             alt="pic"/>
                                    </Link>
                            }
                            <Link to={`/${i.code}`} onClick={() => {
                                getCategHandler(i.class);
                                windowTop()
                            }} className="otherProds__product__name">{i.product}</Link>
                            <p className="otherProds__product__price">{i.price}$
                                - {(i.price * currency).toFixed(0)}сом</p>
                            <p className="otherProds__product__comment">Комментарий(гарантия) : {i.comment}</p>
                            <p className="otherProds__product__code">Код товара : {i.code}</p>
                        </div>
                    ))
                }
            </Carousel>
        </div>
    );
};

export default OtherProds;