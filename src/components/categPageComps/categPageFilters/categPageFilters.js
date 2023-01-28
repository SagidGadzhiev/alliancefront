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
                    name: 'Тип жесткого диска',
                    data: [
                        { id: 11, name: 'SSD' }
                    ]
                },
                {
                    id: 3,
                    name: 'Процессор',
                    data: [
                        { id: 12, name: 'i3' },
                        { id: 13, name: 'i5' },
                        { id: 14, name: 'i7' },
                        { id: 15, name: 'Ryzen 3' },
                        { id: 16, name: 'Ryzen 5' },
                        { id: 17, name: 'Ryzen 7' },
                        { id: 18, name: 'Athlon' },
                    ]
                },
                {
                    id: 4,
                    name: 'Оперативка',
                    data: [
                        { id: 19, name: '8GB' },
                        { id: 20, name: '12GB' },
                        { id: 21, name: '16GB' },
                        { id: 22, name: '32GB' }
                    ]
                },
                {
                    id: 5,
                    name: 'Видеокарта',
                    data: [
                        { id: 23, name: 'mx130' },
                        { id: 24, name: 'mx150' },
                        { id: 25, name: 'mx230' },
                        { id: 26, name: 'mx330' },
                        { id: 27, name: 'mx350' },
                        { id: 28, name: 'mx450' },
                        { id: 29, name: 'mx550' },
                        { id: 30, name: 'gtx1650' },
                        { id: 31, name: '3050' }
                    ]
                }
            ]
        },
        {
            id: 1,
            name: 'Жесткие диски',
            data: [
                {
                    id: 0,
                    name: 'Объем',
                    data: [
                        { id: 0, name: '120GB' },
                        { id: 1, name: '128GB' },
                        { id: 2, name: '240GB' },
                        { id: 3, name: '256GB' },
                        { id: 4, name: '480GB' },
                        { id: 5, name: '500GB' },
                        { id: 6, name: '512GB' },
                        { id: 7, name: '960GB' },
                        { id: 8, name: '1TB' },
                        { id: 9, name: '2TB' },
                        { id: 10, name: '4TB' },
                        { id: 11, name: '6TB' }
                    ]
                },
                {
                    id: 1,
                    name: 'Формат',
                    data: [
                        { id: 12, name: 'M.2' },
                        { id: 13, name: 'SATA' }
                    ]
                },
                {
                    id: 2,
                    name: 'Тип ЖД',
                    data: [
                        { id: 14, name: 'SSD' }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: 'Корпуса и блоки питания',
            data: [
                {
                    id: 0,
                    name: 'Блок питания(мощность)',
                    data: [
                        {id: 0, name: '250W'},
                        {id: 1, name: '280W'},
                        {id: 2, name: '300W'},
                        {id: 3, name: '400W'},
                        {id: 4, name: '420W'},
                        {id: 5, name: '450W'},
                        {id: 6, name: '480W'},
                        {id: 7, name: '500W'},
                        {id: 8, name: '550W'},
                        {id: 9, name: '600W'},
                        {id: 10, name: '650W'},
                        {id: 11, name: '700W'},
                        {id: 12, name: '750W'},
                        {id: 13, name: '800W'},
                        {id: 14, name: '850W'},
                        {id: 15, name: '1000W'},
                    ]
                },
                {
                    id: 1,
                    name: 'Корпус(формат)',
                    data: [
                        {id: 16, name: 'ATX'},
                        {id: 17, name: 'mATX'}
                    ]
                }
            ]
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
            {
                reduceArr().length !== 0 ?
                    <button
                        style={{ margin: `${filterIsOpen ? '0 0 20px 0' : '0'}` }}
                        className='openFilterBtn'
                        type="button"
                        onClick={filterOpenHandler}
                    >
                        {filterIsOpen ? 'Закрыть фильтры' : 'Открыть фильтры'}
                    </button>
                    :
                    null
            }
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
