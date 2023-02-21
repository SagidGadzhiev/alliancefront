import React, { useState } from 'react';
import axios from 'axios';


const localApi = 'http://176.126.164.60:8080';

const Sales = ({ products, selling, setSelling }) => {

    const [saleProd, setSaleProd] = useState('');

    const addSaleProd = async () => {
        await axios.post(`${localApi}/sale`, selling).then();
        setSelling([]);
        return setSaleProd('');
    };

    async function clearSalesProducts() {
        await axios.delete(`${localApi}/sale`).then();
        setSelling([]);
        return setSaleProd('');
    }

    return (
        <div className='addSales'>
            <div style={{ marginTop: '50px' }}>
                <h2 style={{ marginBottom: '20px' }}>Добавление акционного товара</h2>
                <input
                    style={{ width: '100%', height: '40px' }}
                    onChange={(e) => setSaleProd(e.target.value)}
                    type='text'
                    placeholder='Введите код товара'
                    value={saleProd}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                        className='admin-page-btns'
                        style={{ width: '100%', height: '40px', marginTop: 10, cursor: 'pointer', }}
                        type='submit'
                        onClick={() => {
                            setSelling(products.filter((i) => i.code === saleProd));
                        }}
                    >
                        Найти товар
                    </button>
                    <button
                        className='admin-page-btns'
                        disabled={selling.length === 0}
                        style={{ width: '100%', height: '40px', marginTop: 10, cursor: 'pointer', }}
                        type='submit'
                        onClick={() => addSaleProd(saleProd)}
                    >
                        Добавить новый акционный товар
                    </button>
                    <button
                        className='admin-page-btns'
                        style={{ width: '100%', height: '40px', marginTop: 10, cursor: 'pointer', }}
                        type='submit'
                        onClick={clearSalesProducts}
                    >
                        Очистить список акцинных товаров
                    </button>
                </div>
            </div>
            {
                selling.map((i) => (
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

export default Sales;
