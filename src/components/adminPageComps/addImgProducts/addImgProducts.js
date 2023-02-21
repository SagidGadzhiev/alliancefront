import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useDebounce from '../../../hooks/useDebounce';


const localApi = 'http://176.126.164.60:8080';

const AddImgProducts = () => {

    const [productsArray, setProductsArray] = useState([]);
    const [input, setInput] = useState('');

    const getAllProducts = () => {
        return axios(`${localApi}/products`).then(({ data }) => setProductsArray(data));
    };
    const debouncedInput = useDebounce(getAllProducts, 500);

    const inputHandler = (e) => {
        setInput(e.target.value);
        return debouncedInput();
    };

    const addImg = async (prod, prodId, url) => {
        await axios.patch(`${localApi}/image/${prodId}`, { ...prod, img: url }).then();
        return setInput('');
    };

    useEffect(() => {
        const fetchData = () => {
            return axios(`${localApi}/products`)
                .then(({ data }) => setProductsArray(data));
        };
        fetchData().then((res) => res);
    }, [input]);

    return (
        <div className='addImgProducts'>
            <div className='empty-images-container'>
                {
                    productsArray
                        .filter((i) => i.img === '')
                        .map((i) => (
                            <div className='empty-images-container__block' key={i.id}>
                                <p className='empty-images-container__block--text'>id-товара :{i.id}</p>
                                <p className='empty-images-container__block--text'>Код-товара :{i.code}</p>
                                <p className='empty-images-container__block--text'>Название товара :<br />{' '}{i.product}</p>
                                <p className='empty-images-container__block--text'>Класс :{i.class}</p>
                                <p className='empty-images-container__block--text'>Категория :{i.category}</p>
                                <p className='empty-images-container__block--text'>Подкатегория :{i.subcategory}</p>
                                <input
                                    placeholder='Введите адрес изображения в поле'
                                    style={{ width: '100%', height: '40px' }}
                                    onChange={inputHandler}
                                    type='text'
                                />
                                <button
                                    style={{ width: '100%', height: '40px', cursor: 'pointer' }}
                                    type='submit'
                                    onClick={() => addImg(i, i.id, input)}
                                >
                                    Добавить картинку
                                </button>
                            </div>
                        ))
                }
            </div>
            <p
                style={{ marginTop: '30px', fontWeight: 'bold' }}
                className='nullImgCount'
            >
                Продуктов без картинок :{productsArray.filter((i) => i.img === '').length}
            </p>
        </div>
    );
};

export default AddImgProducts;
