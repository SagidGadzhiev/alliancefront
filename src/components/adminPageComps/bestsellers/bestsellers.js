import React, { useState } from 'react';
import axios from 'axios';


const localApi = 'http://176.126.164.60:8080';

const Bestsellers = ({ products }) => {

    const [bestsellersArray, setBestsellersArray] = useState([]);
    const [bestsellerValue, setBestsellerValue] = useState('');

    async function addBestsellerProd() {
        await axios.post(`${localApi}/bestsellers`, bestsellersArray).then();
        setBestsellersArray([]);
        return setBestsellerValue('');
    }

    async function clearBestsellersProducts() {
        await axios.delete(`${localApi}/bestsellers`).then();
        setBestsellersArray([]);
        return setBestsellerValue('');
    }

    return (
        <div className='addBestsellers'>
            <div
                style={{ marginTop: '50px' }}
            >
                <h2 style={{ marginBottom: '20px' }}>Добавление популярного товара</h2>
                <input
                    style={{ width: '100%', height: '40px' }}
                    onChange={(e) => setBestsellerValue(e.target.value)}
                    type='text'
                    placeholder='Введите код товара'
                    value={bestsellerValue}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                        className='admin-page-btns'
                        style={{ width: '100%', height: '40px', marginTop: 10, cursor: 'pointer', }}
                        type='submit'
                        onClick={() => {
                            setBestsellersArray(products.filter((i) => i.code === bestsellerValue));
                        }}
                    >
                        Найти товар
                    </button>
                    <button
                        className='admin-page-btns'
                        disabled={bestsellersArray.length === 0}
                        style={{ width: '100%', height: '40px', marginTop: 10, cursor: 'pointer', }}
                        type='submit'
                        onClick={() => addBestsellerProd(bestsellerValue)}
                    >
                        Добавить новый популярный товар
                    </button>
                    <button
                        className='admin-page-btns'
                        style={{ width: '100%', height: '40px', marginTop: 10, cursor: 'pointer', }}
                        type='submit'
                        onClick={clearBestsellersProducts}
                    >
                        Очистить список популярных товаров
                    </button>
                </div>
            </div>
            {
                bestsellersArray.map((i) => (
                    <div key={i.id}>
                        {
                            i.img === '' ?
                                null
                                :
                                <img
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'contain',
                                        objectPosition: 'center'
                                    }}
                                    src={i.img}
                                    alt=''
                                />
                        }
                        <p>ID :{i.id}</p>
                        <p>Код товара :{i.code}</p>
                        <p>Название :{i.product}</p>
                        <p>Класс :{i.class}</p>
                        <p>Категория :{i.category}</p><p>Под категория :{i.subcategory}</p>
                        <p>Цена :{i.price}</p>
                        <p>Количество :{i.count}</p>
                        <p>Единица :{i.unit}</p>
                        <p>Комментарий(гарантия) :{i.comment}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default Bestsellers;
