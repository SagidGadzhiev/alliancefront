import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCateg} from "../../../redux/reducers/storeItems";
import {Link} from "react-router-dom";
import noPhoto from '../../../img/noPhoto.png'

const SaleProds = ({currency}) => {

    const sales = useSelector(s => s.storeItems.sales);

    const dispatch = useDispatch();

    const getCategHandler = (prodCateg) => {
        return dispatch(getCateg(prodCateg));
    };

    const windowTop = () => {
        return window.scrollTo(0, 0);
    };

    const getImgStatus = (e) => {
        // return e.target.src = noPhoto
    };

    return (
        <div style={{margin: "20px 0 20px 0"}}>
            <p className='prodsUndCategs__title'><span>Товары по акции</span></p>
            <p className='prodsUndCategs__webCameraSale'>Камеры DH-HAC-HDW1000RP всего за $7!!!</p>
            <div className='prodsUndCategs__productsBlock'>
                {
                    sales.map((i) => (
                        <div key={i.id} className='mainPageProducts__product'>
                            {
                                i.img.length === 0 ?
                                    <a className='mainPageProducts__product__googleSearch'
                                       title='Найти в google'
                                       rel='noreferrer'
                                       target='_blank'
                                       href={`http://www.google.kg/search?q=${i.product}`}>
                                        <img className='mainPageProducts__product__img'
                                             src='https://enter.kg/images/yandex.png' alt=""/>
                                    </a> :
                                    <Link onClick={() => {
                                        getCategHandler(i.class);
                                        windowTop()
                                    }} className='mainPageProducts__product__googleSearch'
                                          to={`/${i.code}`}>
                                        <img onError={(e) => getImgStatus(e)} className='mainPageProducts__product__img' src={i.img}
                                             alt=""/>
                                    </Link>
                            }
                            <Link to={`/${i.code}`} onClick={() => {
                                getCategHandler(i.class);
                                windowTop()
                            }}
                                  className="mainPageProducts__product__name">{i.product}</Link>
                            <p className='saleProd__product__lineThroughPrice'>
                                {i.price === undefined ? i.price : (i.price + (i.price * 0.1)).toFixed(2)}$
                                - {((i.price * currency) + ((i.price * currency) * 0.1)).toFixed(0)}сом
                            </p>
                            <p className="mainPageProducts__product__price">
                                {i.price === undefined ? i.price : (i.price).toFixed(2)}$
                                - {(i.price * currency).toFixed(0)}сом</p>
                            <p className="mainPageProducts__product__warranty">Комментарий(гарантия) : {i.comment}</p>
                            <p className="mainPageProducts__product__code">Код товара : {i.code}</p>
                        </div>
                    ))
                }
            </div>

            {/*<p className='prodsUndCategs__title'><span style={{fontSize: "13px"}}>Системные блоки в сборке по супер-цене!</span>*/}
            {/*</p>*/}
            {/*<table style={{*/}
            {/*    width: "100%"*/}
            {/*}}>*/}
            {/*    <tbody>*/}
            {/*    <tr className='sale__tr'>*/}
            {/*        <td className='sale__tr__td'>Celeron G1820 // DDR3 2GB // HDD 1TB 5400rmp</td>*/}
            {/*        <td className='sale__tr__td'>ВСЕГО ЗА <span>$115</span>!!!</td>*/}
            {/*    </tr>*/}
            {/*    <tr className='sale__tr'>*/}
            {/*        <td className='sale__tr__td'>Celeron G1820 // DDR3 2GB // SSD 120GB</td>*/}
            {/*        <td className='sale__tr__td'>ВСЕГО ЗА <span>$120</span>!!!</td>*/}
            {/*    </tr>*/}
            {/*    <tr className='sale__tr'>*/}
            {/*        <td className='sale__tr__td'>Celeron G1820 // DDR3 4GB // HDD 1TB 5400rmp</td>*/}
            {/*        <td className='sale__tr__td'>ВСЕГО ЗА <span>$125</span>!!!</td>*/}
            {/*    </tr>*/}
            {/*    <tr className='sale__tr'>*/}
            {/*        <td className='sale__tr__td'>Pentium G3220 // DDR3 2GB // HDD 1TB 5400rmp</td>*/}
            {/*        <td className='sale__tr__td'>ВСЕГО ЗА <span>$120</span>!!!</td>*/}
            {/*    </tr>*/}
            {/*    <tr className='sale__tr'>*/}
            {/*        <td className='sale__tr__td'>Pentium G3220 // DDR3 4GB // HDD 1TB 5400rmp</td>*/}
            {/*        <td className='sale__tr__td'>ВСЕГО ЗА <span>$130</span>!!!</td>*/}
            {/*    </tr>*/}
            {/*    <tr className='sale__tr'>*/}
            {/*        <td className='sale__tr__td'>i5-4590 // DDR3 8GB // SSD 240GB</td>*/}
            {/*        <td className='sale__tr__td'>ВСЕГО ЗА <span>$200</span>!!!</td>*/}
            {/*    </tr>*/}
            {/*    <tr className='sale__tr'>*/}
            {/*        <td className='sale__tr__td'>i7-4790 // DDR3 8GB // SSD 240GB</td>*/}
            {/*        <td className='sale__tr__td'>ВСЕГО ЗА <span>$250</span>!!!</td>*/}
            {/*    </tr>*/}
            {/*    </tbody>*/}
            {/*</table>*/}

        </div>
    );
};

export default SaleProds;
