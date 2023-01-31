import React, { useState } from 'react';
import axios from 'axios';


const serverApi = process.env.REACT_APP_SERVER_API;
const localApi = process.env.REACT_APP_LOCAL_API;

const Novas = ({ products, nova, setNova }) => {

    const [novaProd, setNovaProd] = useState('');

    const addNovaProd = async () => {
        await axios.post(`${localApi}/nova`, nova).then();
        setNova([]);
        return setNovaProd('');
    };

    async function clearNovaProducts() {
        await axios.delete(`${localApi}/sale`).then();
        setNova([]);
        return setNovaProd('');
    }

    return (
        <div className='addNovas'>
            <div style={{ marginTop: '50px' }}>
                <h2 style={{ marginBottom: '20px' }}>Добавление нового товара</h2>
                <input
                    style={{ width: '100%', height: '40px' }}
                    onChange={(e) => setNovaProd(e.target.value)}
                    type='text'
                    placeholder='Введите код товара'
                    value={novaProd}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                        className='admin-page-btns'
                        style={{ width: '100%', height: '40px', marginTop: 10, cursor: 'pointer', }}
                        type='submit'
                        onClick={() => {
                            setNova(products.filter((i) => i.code === novaProd));
                        }}
                    >
                        Найти товар
                    </button>
                    <button
                        className='admin-page-btns'
                        disabled={nova.length === 0}
                        style={{ width: '100%', height: '40px', marginTop: 10, cursor: 'pointer', }}
                        type='submit'
                        onClick={() => addNovaProd(novaProd)}
                    >
                        Добавить новый товар
                    </button>
                    <button
                        className='admin-page-btns'
                        style={{ width: '100%', height: '40px', marginTop: 10, cursor: 'pointer', }}
                        type='submit'
                        onClick={clearNovaProducts}
                    >
                        Очистить список акцинных товаров
                    </button>
                </div>
            </div>
            {
                nova.map((i) => (
                    <div key={i.id}>
                        <img
                            style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'contain',
                                objectPosition: 'center',
                            }}
                            src={i.img}
                            alt=''
                        />
                        <p>ID :{i.id}</p>
                        <p>Код товара :{i.code}</p>
                        <p>Название :{i.product}</p>
                        <p>Класс :{i.class}</p>
                        <p>Категория :{i.category}</p>
                        <p>Под категория :{i.subcategory}</p>
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

export default Novas;
