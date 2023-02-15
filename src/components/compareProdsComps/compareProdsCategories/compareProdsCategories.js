import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCompareProductsArray } from '../../../redux/reducers/storeItems';
import { Link } from 'react-router-dom';


const CompareProdsCategories = () => {

    const dispatch = useDispatch();
    const compareProductsArray = useSelector(s => s
        .storeItems
        .compareProductsArray
        .map(i => i.class)
        .filter((i, idx, arr) => idx === arr.indexOf(i))
    );

    const clearCompareProducts = () => dispatch(clearCompareProductsArray());

    return (
        <div className='compareProdsCategories'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className='compareProdsCategories__title'>Список сравнений</p>
                <button
                    style={{ display: `${compareProductsArray.length === 0 ? 'none' : 'block'}` }}
                    className='compareProdsCategories__clearBtn'
                    onClick={clearCompareProducts}
                    type='button'
                >
                    очистить список
                </button>
            </div>
            {
                compareProductsArray.length === 0 ?
                    <p className='compareProdsCategories__noCompare'>Список сравнений пуст</p>
                    :
                    compareProductsArray
                        .map((i, idx) => (
                            <Link key={idx} to={`/compare-products/${i}`} className='compareProdsCategories__link'>{i}</Link>
                        ))
            }
        </div>
    );
};

export default CompareProdsCategories;
