import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  clearAllShopping,
  getAllOrders,
  getOrdered,
} from '../../../redux/reducers/storeItems';


const localApi = process.env.REACT_APP_NODE_ENV === 'prod' ? process.env.REACT_APP_SERVER_API : process.env.REACT_APP_LOCAL_API;

function ShoppingForm({ currency, shoppingProducts, totalPrice }) {
  const dispatch = useDispatch();

  const orders = useSelector((s) => s.storeItems.orders);

  const date = new Date();

  const [, setTot] = useState('');

  const [person, setPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [payment, setPayment] = useState('');
  const [shipping, setShipping] = useState('');
  const [comment, setComment] = useState('');

  function sendEmail(e) {
    e.preventDefault();

    if (shoppingProducts.length === 0) {
      alert('Ваша корзина пуста, добавьте товары чтобы оформить заказ');
    } else {
      axios.post(`${localApi}/orders`, {
        shopping: shoppingProducts,
        buyer: person,
        phone,
        address,
        email,
        payment,
        shipping,
        note: comment,
      }).then();

      dispatch(getAllOrders());

      emailjs.sendForm('service_25avcin', 'template_pec0hbo', e.target, 'user_cQzLXAo3QHVA8ClatUpuP')
        .then((result) => {}, (error) => {});
      alert(`Ваш заказ принят в обработку, номер заказа ${orders.length === 0 ? 1 : orders[orders.length - 1].orderNumber + 1}`);
      dispatch(getOrdered(shoppingProducts, `${(`0${date.getDate()}`).slice(-2)}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getFullYear()}`).slice(-2)}`, orders.length === 0 ? 1 : orders[orders.length - 1].orderNumber + 1));
      dispatch(clearAllShopping());
    }
    return e.target.reset();
  }

  return (
    <div className='shoppingForm'>
      <div className='container'>
        <p className='shoppingForm__title'>Введите ваши данные для оформление заказа</p>
        <p className='shoppingForm__info'>
          Ваши данные необходимы для оформления заказа, связи с вами в случае
          необходимости и правильной доставки вашего заказа. При заполнении всех полей убедитесь в том, что
          все данные внесены правильно.
        </p>
        <form className='shoppingForm__form' onSubmit={sendEmail}>
          <label className='shoppingForm__form__label'>
            <p className='shoppingForm__form__label__info'>ФИО</p>
            <input
              required
              type='text'
              className='shoppingForm__form__label__input'
              name='person'
              onChange={(e) => {
                setPerson(e.target.value);
              }}
            />
          </label>
          <label className='shoppingForm__form__label'>
            <p className='shoppingForm__form__label__info'>Номер телефона</p>
            <input
              placeholder='0XXX XX XX XX'
              required
              type='text'
              className='shoppingForm__form__label__input'
              name='phone'
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </label>
          <label className='shoppingForm__form__label'>
            <p className='shoppingForm__form__label__info'>Адрес доставки</p>
            <input
              required
              type='text'
              className='shoppingForm__form__label__input'
              name='address'
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </label>
          <label className='shoppingForm__form__label'>
            <p className='shoppingForm__form__label__info'>Email</p>
            <input
              required
              type='email'
              className='shoppingForm__form__label__input'
              name='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label className='shoppingForm__form__label'>
            <p className='shoppingForm__form__label__info'>Способ оплаты</p>
            <select
              onClick={(e) => {
                setPayment(e.target.value);
              }}
              required
              className='shoppingForm__form__label__input'
              name='payment'
            >
              <option value=''>Выбрать</option>
              <option>Наличными</option>
              {/* <option>По карте</option> */}
            </select>
          </label>
          <label className='shoppingForm__form__label'>
            <p className='shoppingForm__form__label__info'>Способ доставки</p>
            <select
              required
              className='shoppingForm__form__label__input'
              name='shipping'
              onClick={(e) => {
                setShipping(e.target.value);
              }}
            >
              <option value=''>Выбрать</option>
              <option>Самовывоз</option>
              <option>Курьер</option>
            </select>
          </label>
          <label className='shoppingForm__form__label'>
            <p className='shoppingForm__form__label__info'>Комментарий</p>
            <textarea
              className='shoppingForm__form__label__input'
              name='comment'
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </label>
          <button className='shoppingForm__form__btn' type='submit'>Подтвердить заказ</button>
          <p className='shoppingForm__form__warning'>
            Нажимая кнопку "Подтвердить заказ", вы принимаете
            "Условия продажи товаров" электронной торговой площадки AlliancePlus.kg.
          </p>

          <textarea
            style={{ display: 'none' }}
            onChange={(e) => setTot(e.target.value)}
            name='products'
            value={
                            shoppingProducts.map((i) => JSON.stringify(i, null, '\t'))
                        }
          />
          <input
            style={{ display: 'none' }}
            type='text'
            name='totalDoll'
            value={totalPrice}
            onChange={(e) => setTot(e.target.value)}
          />
          <input
            style={{ display: 'none' }}
            type='text'
            name='totalSom'
            value={totalPrice * currency}
            onChange={(e) => setTot(e.target.value)}
          />
          <input
            style={{ display: 'none' }}
            type='text'
            name='currency'
            value={currency}
            onChange={(e) => setTot(e.target.value)}
          />
          <input
            style={{ display: 'none' }}
            type='text'
            name='numberOrder'
            value={orders.length === 0 ? 1 : orders[orders.length - 1].orderNumber + 1}
            onChange={(e) => setTot(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default ShoppingForm;
