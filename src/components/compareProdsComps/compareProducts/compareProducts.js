import React  from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { clearCompareProductsByFilter, getCateg } from '../../../redux/reducers/storeItems';
import { ReactComponent as EmptyPhoto } from '../../../assets/camera-solid.svg';


const CompareProducts = () => {

    const history = useHistory();
    const { productsCategories } = useParams();

    const dispatch = useDispatch();
    const currency = useSelector(s => s.storeItems.currency);
    const compareProductsArray = useSelector(s => s
        .storeItems
        .compareProductsArray
    );

    const clearCompareProductsFiltered = () => {
        dispatch(clearCompareProductsByFilter(
            compareProductsArray.filter(i => i.class !== productsCategories)
        ));
        return history.push('/compare-products');
    };

    const getCategHandler = (prodCateg) => dispatch(getCateg(prodCateg));

    const windowTop = () => window.scrollTo(0, 0);

    return (
        <div className='compare-products'>
            <button
                style={{ display: `${compareProductsArray.length === 0 ? 'none' : 'block'}` }}
                className='compare-products__clearBtn'
                onClick={clearCompareProductsFiltered}
                type='button'
            >
                очистить список ({productsCategories})
            </button>
            <div className='compare-products__compareProductFlexBox'>
                {
                    compareProductsArray
                        .filter(i => i.class === productsCategories)
                        .map(i => (
                            <div key={i.id} className='compare-products__compareProduct'>
                                {
                                    i.img.length === 0 ?
                                        <Link onClick={() => getCategHandler(i.class)}
                                              className='compareProduct--photoLink' to={`/${i.code}`}>
                                            <EmptyPhoto className='compareProduct--photoSvg' />
                                        </Link>
                                        :
                                        <Link
                                            onClick={() => {
                                                getCategHandler(i.class);
                                                windowTop();
                                            }}
                                            className='compareProduct--photoLink'
                                            to={`/${i.code}`}
                                        >
                                            <img className='compareProduct--photoSvg' src={i.img} alt='pic' />
                                        </Link>
                                }
                                <Link
                                    to={`/${i.code}`}
                                    onClick={() => {
                                        getCategHandler(i.class);
                                        windowTop();
                                    }}
                                    className='compareProduct--productLink'
                                >
                                    {i.product}
                                </Link>
                                {
                                    i.class === 'Notebook' ?
                                        <React.Fragment>
                                            <p className='compareProduct--textInfo'>Процессор : {i.processor || 'NaN'}</p>
                                            <p className='compareProduct--textInfo'>Частота процессора : {i.processorFrequency || 'NaN'}</p>
                                            <p className='compareProduct--textInfo'>Оперативная память : {i.ram || 'NaN'}</p>
                                            <p className='compareProduct--textInfo'>Жесткий диск : {i.rom || 'NaN'}</p>
                                            <p className='compareProduct--textInfo'>Видеокарта : {i.graphics || 'NaN'}</p>
                                            <p className='compareProduct--textInfo'>Дисплей : {i.display || 'NaN'}</p>
                                            <p className='compareProduct--textInfo'>Частота дисплея : {i.displayFrequency || 'NaN'}</p>
                                            <p className='compareProduct--textInfo'>Цвет : {i.color || 'NaN'}</p>
                                        </React.Fragment>
                                        :
                                        null
                                }
                                <p className='compareProduct--textInfo'>Цена : { i.price === undefined ? i.price : (i.price).toFixed(2) }$ - { (i.price * currency).toFixed(0) }сом</p>
                            </div>
                        ))
                }
            </div>
        </div>
    );
};

export default CompareProducts;
