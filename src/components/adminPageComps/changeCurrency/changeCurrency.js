import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


const localApi = process.env.REACT_APP_NODE_ENV === 'prod' ? process.env.REACT_APP_SERVER_API : process.env.REACT_APP_LOCAL_API;

const ChangeCurrency = () => {

    const currency = useSelector(s => s.storeItems.currency);
    const [newCurrencyValue, setNewCurrencyValue] = useState('');

    const formHandler = async (e) => {
        e.preventDefault();
        await axios.put(`${localApi}/currency`, { currency: newCurrencyValue });
        return setNewCurrencyValue('');
    };

    const changeCurrencyHandler = async () => {
        await axios.put(`${localApi}/currency`, { currency: newCurrencyValue });
        return setNewCurrencyValue('');
    };

    return (
        <div className='changeCurrency'>
            <form
                style={{ margin: '20px 0', border: '1px solid black', borderRadius: '5px', padding: '5px' }}
                onSubmit={formHandler}
            >
                <label>
                    <h6 style={{ marginBottom: '10px' }}>Текущий курс на сайте 1USD = {currency}KGS</h6>
                    <input
                        style={{ display: 'block', padding: 5 }}
                        value={newCurrencyValue}
                        onChange={(e) => setNewCurrencyValue(e.target.value)}
                        type="number"
                        placeholder='Введите новый курс...'
                    />
                </label>
                <button
                    onClick={changeCurrencyHandler}
                    type="submit"
                    style={{ margin: '10px 0' }}
                >
                    Изменить курс
                </button>
            </form>
        </div>
    );
};

export default ChangeCurrency;
