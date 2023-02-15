import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearCurrentProducts, getCurrentPage } from '../../../redux/reducers/storeItems';
import {ReactComponent as CategoriesButton} from '../../../assets/categories-button.svg';


function ProdCardCategs({ paginate }) {

    const { categories } = useParams();
    const dispatch = useDispatch();

    const [newCateg, setNewCateg] = useState([]);

    const classes = useSelector((s) => s.storeItems.products.map((i) => i.class).sort().filter((i, idx, arr) => !idx || i !== arr[idx - 1]));
    const categs = useSelector((s) => s.storeItems.products.map((i) => ({ class: i.class, category: i.category })));
    const subcategs = useSelector((s) => s.storeItems.products.map((i) => ({ class: i.class, category: i.category, subcategory: i.subcategory })));

    const windowTop = () => window.scrollTo(0, 0);
    const removeActive = () => {
        document.getElementById('bgMenu').classList.remove('active');
        document.getElementById('navCateg').classList.remove('active');
        return document.getElementById('contentCateg').classList.remove('active');
    };
    const resetCategories = () => {
        dispatch(clearCurrentProducts());
        dispatch(getCurrentPage(1));
        windowTop();
        paginate(1);
        return removeActive();
    };
    const filterNewCateg = (classesElement) => {
        return setNewCateg(categs.filter((q) => q.class === classesElement && q.category !== ''));
    };

    return (
        <div className='prodCardCategs'>
            <nav className='prodCardCategs__categories' id='navCateg'>
                <div className='contentBack' id='contentCateg' onClick={removeActive} />
                {
                    classes.map((classesElement, idx) => (
                        <div key={idx} className='categBlockWrap'>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Link
                                    onClick={resetCategories}
                                    className='categories__link'
                                    to={`/type/${classesElement}#page=1`}
                                    style={{ color: `${classesElement === categories ? '#e33033' : '#fff'}` }}
                                >
                                    {classesElement}
                                </Link>
                                {
                                    categs
                                        .filter((q) => q.class === classesElement && q.category !== '')
                                        .map((obj) => (obj.class === classesElement ? obj.class : ''))
                                        .sort()
                                        .filter((a, idx, arr) => !idx || a !== arr[idx - 1])
                                        .map((el, index1) =>
                                            <button
                                                key={index1}
                                                className='categBlockWrapBtn'
                                                onClick={() => filterNewCateg(classesElement)}
                                                type='button'
                                            >
                                                <CategoriesButton className='categBlockWrapBtn__svgImage' />
                                            </button>
                                        )
                                }
                            </div>
                            <div className='categBlock'>
                                {
                                    newCateg
                                        .map((obj) => (obj.class === classesElement ? obj.category : ''))
                                        .sort()
                                        .filter((a, idx, arr) => !idx || a !== arr[idx - 1])
                                        .map((newCategElement, iidx) => (newCategElement.length === 0 ? null
                                            : (
                                                <React.Fragment key={iidx + 1}>
                                                    <Link
                                                        className='categBlock__link'
                                                        onClick={resetCategories}
                                                        to={`/category/${newCategElement}#page=1`}
                                                        style={{ color: `${newCategElement === categories ? '#e33033' : '#fff'}` }}
                                                    >
                                                        {newCategElement}
                                                    </Link>
                                                    <div className='subcateg--block'>
                                                        {
                                                            subcategs
                                                                .map((sub) => (sub.category === newCategElement ? sub.subcategory : ''))
                                                                .sort()
                                                                .filter((a, idx, arr) => !idx || a !== arr[idx - 1])
                                                                .map((subcategsElement, idxx) => (subcategsElement.length === 0 ? null
                                                                    : (
                                                                        <Link
                                                                            className='subcateg__link'
                                                                            onClick={resetCategories}
                                                                            key={idxx + 2}
                                                                            to={`/subcategory/${subcategsElement}#page=1`}
                                                                            style={{ color: `${subcategsElement === categories ? '#e33033' : '#fff'}` }}
                                                                        >
                                                                            {subcategsElement}
                                                                        </Link>
                                                                    )))
                                                        }
                                                    </div>
                                                </React.Fragment>
                                            )))
                                }
                            </div>
                        </div>
                    ))
                }
            </nav>
        </div>
    );
}

export default ProdCardCategs;
