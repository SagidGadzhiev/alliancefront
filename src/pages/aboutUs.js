import React, { useState } from 'react';
import ProdCardCategs from '../components/productCardComps/prodCardCategs/prodCardCategs';

function AboutUs() {
  const [, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='aboutUs'>
      <div className='container' style={{ display: 'flex' }}>
        <ProdCardCategs paginate={paginate} />
        <div className='aboutUs__description'>
          <h2 className='aboutUs__description__title'>О компании AlliancePlus</h2>
          <ul className='aboutUs__description__list'>
            <li className='aboutUs__description__list__text'>
              Наша компания начала свою деятельность на компьютерном рынке под торговой маркой
              AlliancePlus.kg в
              2021 году. Наша специализация - это розничная мелкооптовая торговля комплектующими,
              компьютерами, оргтехникой, а также различной электроникой.
            </li>
            <li className='aboutUs__description__list__text'>
              Информация на сайте allianceplus.kg обновляется каждый день и отображаются товары, которые
              есть
              в наличии (за исключением тех случаев, когда товар закончился сегодня и не успела обновиться
              информация на сайте).
              Администрация делает все возможное чтобы донести до потребителя максимально точную
              информацию о товаре.
            </li>
            <li className='aboutUs__description__list__text'>
              Мы предлагаем своим клиентам широкий выбор качественных товаров по самым привлекательным
              ценам. Являясь динамично развивающейся компанией, основные усилия мы направляем на
              постоянное совершенствование обслуживания покупателей и постоянное снижение издержек
              поставки товара к конечному потребителю, тем самым делая товар еще доступней для
              потребителя.
            </li>
            <li className='aboutUs__description__list__text'>
              Наша фирма ориентируется на корпоративных клиентов и на розничных покупателей. Вы всегда
              сможете найти у нас как самые последние новинки компьютерного рынка, так и надежные
              компьютерные решения для корпоративного сектора.
            </li>
            <li className='aboutUs__description__list__text'>
              Наша цель: помочь максимальному количеству людей сделать выбор среди огромного ассортимента
              электроники и компьютерной техники с наилучшим сочетанием Цена - Качество, получения
              удовольствия от приобретения товара и дальнейшее долгое и приятное использование
              приобретенной продукции.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
