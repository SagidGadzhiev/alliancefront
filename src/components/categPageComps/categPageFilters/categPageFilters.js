import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentPage, clearCurrentProducts } from '../../../redux/reducers/storeItems';


const CategPageFilters = ({ prodsArr, filtersIndexArray, setFiltersIndexArray, paginate }) => {

    const dispatch = useDispatch();
    const [filterIsOpen, setFilterIsOpen] = useState(false);

    const firstElem = prodsArr.map(i => i.class)[0];

    const indexArr = [
        {
            id: 0,
            name: 'Notebook',
            data: [
                {
                    id: 0,
                    name: 'Бренд',
                    data: [
                        { id: 0, name: 'Acer' },
                        { id: 1, name: 'Lenovo' },
                        { id: 2, name: 'HP' },
                        { id: 3, name: 'ASUS' }
                    ]
                },
                {
                    id: 1,
                    name: 'Жесткий диск',
                    data:
                        [
                            { id: 4, name: '120' },
                            { id: 5, name: '128' },
                            { id: 6, name: '240' },
                            { id: 7, name: '256' },
                            { id: 8, name: '480' },
                            { id: 9, name: '512' },
                            { id: 10, name: '1TB' }
                        ]
                },
                {
                    id: 2,
                    name: 'Процессор',
                    data: [
                        { id: 11, name: 'i3' },
                        { id: 12, name: 'i5' },
                        { id: 13, name: 'i7' }
                    ]
                },
                {
                    id: 3,
                    name: 'Оперативка',
                    data: [
                        { id: 14, name: '8GB' },
                        { id: 15, name: '16GB' },
                        { id: 16, name: '32GB' }
                    ]
                },
            ]
        },
        {
            id: 1,
            name: 'Жесткие диски',
            data: []
        },
        {
            id: 2,
            name: 'Корпуса и блоки питания',
            data: []
        },
        {
            id: 3,
            name: 'Кулеры',
            data: []
        },
        {
            id: 4,
            name: 'Материнские платы',
            data: []
        },
        {
            id: 5,
            name: 'Мониторы',
            data: []
        },
        {
            id: 6,
            name: 'Мыши',
            data: []
        },
        {
            id: 7,
            name: 'Память',
            data: []
        },
        {
            id: 8,
            name: 'Процессоры',
            data: []
        },
        {
            id: 9,
            name: 'Системы безопасности',
            data: []
        },
        {
            id: 10,
            name: 'Флэш-память и USB флеш',
            data: []
        }
    ];

    const reduceArr = () => {
        return indexArr.reduce((acc, rec) => {
            return rec.name === firstElem ? rec.data : acc;
        }, []);
    };

    const formChangeHandler = (e) => {
        return e.preventDefault();
    };

    const inputHandler = (e, name) => {
        return e.target.checked && !filtersIndexArray.includes(e.target.value) ?
            setFiltersIndexArray(prev => [...prev, { name, value: e.target.value }])
            :
            setFiltersIndexArray(prev => prev.filter(i => i.value !== e.target.value));
    };

    const resetFormHandler = () => {
        return setFiltersIndexArray([]);
    };

    const setFirstPage = () => {
        paginate(1);
        return dispatch(getCurrentPage(1));
    };

    const filterOpenHandler = () => {
        setFilterIsOpen(!filterIsOpen);
    };

    if (firstElem === undefined) {
        return (
            <div className='categPageFiltersEmpty'>
                <p className='categPageFiltersEmpty__title'>Товар не найден</p>
                <button type="reset" onClick={() => {
                    resetFormHandler();
                    setFirstPage();
                    dispatch(clearCurrentProducts());
                }} className='categPageFiltersEmpty__clearBtn'>Очистить
                    фильтры
                </button>
            </div>
        );
    }

    return (
        <div className='categPageFilters'>
            <button
                style={{ margin: `${filterIsOpen ? '0 0 20px 0' : '0'}` }}
                className='openFilterBtn'
                type="button"
                onClick={filterOpenHandler}
            >
                {filterIsOpen ? 'Закрыть фильтры' : 'Открыть фильтры'}
            </button>
            <div className="categPageFilters__flexBox">
                {
                    filterIsOpen ?
                        reduceArr().length !== 0 ?
                            <form onSubmit={formChangeHandler} className='filterForm'>
                                <button type="reset" onClick={() => {
                                    resetFormHandler();
                                    setFirstPage();
                                    dispatch(clearCurrentProducts());
                                }} className='filterForm__clearBtn'>
                                    Очистить фильтры
                                </button>
                                {
                                    reduceArr().map(mainDataObject => (
                                        <div key={mainDataObject.id} className='filterForm__propertyBlock'>
                                            <h4 className='filterForm__propertyBlock__title'>{mainDataObject.name}</h4>
                                            {
                                                mainDataObject.data.map(subDataObject => (
                                                    <div key={subDataObject.id}
                                                         className='filterForm__propertyBlock__propertyValueBlock'
                                                         onClick={() => dispatch(clearCurrentProducts())}
                                                    >
                                                        <input
                                                            onChange={(e) => inputHandler(e, mainDataObject.name)}
                                                            type="checkbox"
                                                            value={subDataObject.name}
                                                            id={subDataObject.id}
                                                            name={`input${mainDataObject.id}`}
                                                            className='filterForm__propertyBlock__propertyValueBlock--input'
                                                        />
                                                        <label
                                                            htmlFor={subDataObject.id}
                                                            className='filterForm__propertyBlock__propertyValueBlock--label'
                                                        >
                                                            {subDataObject.name}
                                                        </label>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </form>
                            :
                            null
                        :
                        null
                }
            </div>
        </div>
    );
};

export default CategPageFilters;
