import React from 'react';

const ShoppingForm = () => {
    return (
        <div className='shoppingForm'>
            <div className="container">
                <p className='shoppingForm__title'>Введите ваши данные для оформление заказа</p>
                <p className='shoppingForm__info'>Ваши данные необходимы для оформления заказа, связи с вами в случае
                    необходимости и правильной доставки вашего заказа. При заполнении всех полей убедитесь в том, что
                    все данные внесены правильно.</p>
                <form className='shoppingForm__form'>
                    <label className='shoppingForm__form__label'>
                        <p className='shoppingForm__form__label__info'>ФИО</p>
                        <input required={true} type="text" className='shoppingForm__form__label__input'/>
                    </label>
                    <label className='shoppingForm__form__label'>
                        <p className='shoppingForm__form__label__info'>Номер телефона</p>
                        <input placeholder='0XXX XX XX XX' pattern='[0-9]{4} [0-9]{2} [0-9]{2} [0-9]{2}' required={true} type="text" className='shoppingForm__form__label__input'/>
                    </label>
                    <label className='shoppingForm__form__label'>
                        <p className='shoppingForm__form__label__info'>Адрес доставки</p>
                        <input required={true} type="text" className='shoppingForm__form__label__input'/>
                    </label>
                    <label className='shoppingForm__form__label'>
                        <p className='shoppingForm__form__label__info'>Email</p>
                        <input required={true} type="email" className='shoppingForm__form__label__input'/>
                    </label>
                    <label className='shoppingForm__form__label'>
                        <p className='shoppingForm__form__label__info'>Способ оплаты</p>
                        <input disabled={true} defaultValue='Наличными' required={true} type="text" className='shoppingForm__form__label__input'/>
                    </label>
                    <label className='shoppingForm__form__label'>
                        <p className='shoppingForm__form__label__info'>Способ доставки</p>
                        <select required={true} className='shoppingForm__form__label__input'>
                            <option>Самовывоз</option>
                            <option>Курьер</option>
                        </select>
                    </label>
                    <label className='shoppingForm__form__label'>
                        <p className='shoppingForm__form__label__info'>Комментарий</p>
                        <textarea className='shoppingForm__form__label__input'/>
                    </label>
                    <button className='shoppingForm__form__btn' type="submit">Подтвердить заказ</button>
                    <p className='shoppingForm__form__warning'>Нажимая кнопку "Подтвердить заказ", вы принимаете
                        "Условия продажи товаров" электронной торговой площадки AlliancePlus.kg.</p>
                </form>
            </div>
        </div>
    );
};

export default ShoppingForm;