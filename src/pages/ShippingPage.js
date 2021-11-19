import React, {useState} from 'react';
import ProdCardCategs from "../components/productCardComps/prodCardCategs/prodCardCategs";

const ShippingPage = () => {

    // eslint-disable-next-line no-unused-vars
    const [currentPage, setCurrentPage] = useState(1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='shippingPage'>
            <div className="container" style={{display: "flex"}}>
                <ProdCardCategs paginate={paginate}/>
                <div className='shippingPage__description'>
                    <h2 className='shippingPage__description__title'>Режим работы</h2>
                    <p className='shippingPage__description__text'>
                        С понедельника по пятницу с 09:00 до 18:00,
                        в субботу с 09:00 до 17:00,
                        воскресенье - выходной
                    </p>
                    <br/>
                    <h2 className='shippingPage__description__title'>Доставка</h2>
                    <p className='shippingPage__description__text'>
                        Для более точной контактной информации, пишите, пожалуйста, ваш email в комментариях для заказа
                        или другую контактную информацию . Часто бывает, что люди ошибаются в номере телефона и не
                        возможно связаться с клиентом (Если мы не свяжемся с вами мы НЕ СМОЖЕМ доставить Вам заказ и
                        обслужить).
                    </p>
                    <br/>
                    <h2 className='shippingPage__description__title'>Условия доставки</h2>
                    <ul className='shippingPage__description__list'>
                        <li className='shippingPage__description__list__text'>Доставка стоимостью до 2000сом, по
                            г.Бишкек - 200сом.
                        </li>
                        <li className='shippingPage__description__list__text'>Доставка стоимостью 2000сом и более, по
                            г.Бишкек - бесплатно.
                        </li>
                        <li className='shippingPage__description__list__text'>Доставка в пригород, жилые массивы и
                            другие районы производится
                            по индивидуальной договоренности.
                        </li>
                        <li className='shippingPage__description__list__text'>После получения заказа, с заказчиком
                            связывается менеджер
                            службы доставки для уточнения и подтверждения заказа,
                            уточнения точного времени и места доставки.
                        </li>
                        <li className='shippingPage__description__list__text'>
                            Развозка товаров осуществляется с 9:00 до 17:00, заказы сделанные после указанного времени
                            доставляются на следующий день.
                        </li>
                        <li className='shippingPage__description__list__text'>Доставка осуществляется исключительно
                            курьером.
                        </li>
                    </ul>
                    <br/>
                    <h2 className='shippingPage__description__title'>
                        Информация для корпоративных клиентов.
                        На сайте цены указаны без учета НДС.
                        Если Вам необходимо провести закупку со строгой отчетностью обратитесь к нашим менеджерам.
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default ShippingPage;