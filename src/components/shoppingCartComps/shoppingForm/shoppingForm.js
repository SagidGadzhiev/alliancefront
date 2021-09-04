import React, {useState} from 'react';
import emailjs from 'emailjs-com'
import {useDispatch} from "react-redux";
import {clearAllShopping} from "../../../redux/reducers/storeItems";

const ShoppingForm = ({currency, shoppingProducts, totalPrice}) => {

    const dispatch = useDispatch()

    const [tot, setTot] = useState('')
    const [pr, setPr] = useState('')

    function sendEmail(e) {
        e.preventDefault();

        if (shoppingProducts.length === 0) {
            alert('Ваша корзина пуста, добавьте товары чтобы оформить заказ')
        } else {
            emailjs.sendForm('service_eubd3tq', 'template_pec0hbo', e.target, 'user_cQzLXAo3QHVA8ClatUpuP')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            alert('Ваш заказ принят в обработку');
            dispatch(clearAllShopping())
        }
        return e.target.reset()
    }

    return (
        <div className='shoppingForm'>
            <div className="container">
                <p className='shoppingForm__title'>Введите ваши данные для оформление заказа</p>
                <p className='shoppingForm__info'>Ваши данные необходимы для оформления заказа, связи с вами в случае
                    необходимости и правильной доставки вашего заказа. При заполнении всех полей убедитесь в том, что
                    все данные внесены правильно.</p>
                <form className='shoppingForm__form' onSubmit={sendEmail}>
                    <label className='shoppingForm__form__label'>
                        <p className='shoppingForm__form__label__info'>ФИО</p>
                        <input required={true} type="text" className='shoppingForm__form__label__input' name='person'/>
                    </label>
                    <label className='shoppingForm__form__label'>
                        <p className='shoppingForm__form__label__info'>Номер телефона</p>
                        <input placeholder='0XXX XX XX XX' pattern='[0-9]{4} [0-9]{2} [0-9]{2} [0-9]{2}' required={true}
                               type="text" className='shoppingForm__form__label__input' name='phone'/>
                    </label>
                    <label className='shoppingForm__form__label'>
                        <p className='shoppingForm__form__label__info'>Адрес доставки</p>
                        <input required={true} type="text" className='shoppingForm__form__label__input' name='address'/>
                    </label>
                    <label className='shoppingForm__form__label'>
                        <p className='shoppingForm__form__label__info'>Email</p>
                        <input required={true} type="email" className='shoppingForm__form__label__input' name='email'/>
                    </label>
                    <label className='shoppingForm__form__label'>
                        <p className='shoppingForm__form__label__info'>Способ оплаты</p>
                        <select required={true} className='shoppingForm__form__label__input' name='payment'>
                            <option>Наличными</option>
                            <option>По карте</option>
                        </select>
                    </label>
                    <label className='shoppingForm__form__label'>
                        <p className='shoppingForm__form__label__info'>Способ доставки</p>
                        <select required={true} className='shoppingForm__form__label__input' name='shipping'>
                            <option>Самовывоз</option>
                            <option>Курьер</option>
                        </select>
                    </label>
                    <label className='shoppingForm__form__label'>
                        <p className='shoppingForm__form__label__info'>Комментарий</p>
                        <textarea className='shoppingForm__form__label__input' name='comment'/>
                    </label>
                    <button className='shoppingForm__form__btn' type="submit">Подтвердить заказ</button>
                    <p className='shoppingForm__form__warning'>Нажимая кнопку "Подтвердить заказ", вы принимаете
                        "Условия продажи товаров" электронной торговой площадки AlliancePlus.kg.</p>

                    <input style={{display: "none"}} onChange={(e) => setPr(e.target.value)} name='products' type="text"
                           value={
                               shoppingProducts.map(i => {
                                   return JSON.stringify(i)
                               })
                           }/>
                    <input style={{display: "none"}} type="text" name='totalDoll' value={totalPrice}
                           onChange={(e) => setTot(e.target.value)}/>
                    <input style={{display: "none"}} type="text" name='totalSom' value={totalPrice * currency}
                           onChange={(e) => setTot(e.target.value)}/>
                    <input style={{display: "none"}} type="text" name='currency' value={currency}
                           onChange={(e) => setTot(e.target.value)}/>

                </form>
            </div>
        </div>
    );
};

export default ShoppingForm;