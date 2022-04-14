import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCurrentProducts, getCurrentPage } from '../../../redux/reducers/storeItems';


const ProdCardCategs = ({ paginate }) => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [newCateg, setNewCateg] = useState([]);

    const loading = useSelector(s => s.storeItems.loading);

    const classes = useSelector((s) => {
        return s.storeItems.products.map((i) => {
            return i.class;
        })
            .sort()
            .filter((i, idx, arr) => {
                return !idx || i !== arr[idx - 1];
            });
    });

    const categs = useSelector((s) => {
        return s.storeItems.products.map((i) => {
            return { class: i.class, category: i.category };
        });
    });

    const subcategs = useSelector((s) => {
        return s.storeItems.products.map((i) => {
            return { class: i.class, category: i.category, subcategory: i.subcategory };
        });
    });

    const windowTop = () => {
        return window.scrollTo(0, 0);
    };

    const removeActive = () => {
        document.getElementById('bgMenu').classList.remove('active');
        document.getElementById('navCateg').classList.remove('active');
        return document.getElementById('contentCateg').classList.remove('active');
    };

    if (loading) {
        return <div className='loadingBlock'>
            <div className="lds-dual-ring"></div>
            <h2 style={{ color: '#fff', marginTop: '10px' }}>Идет загрузка...</h2>
        </div>;
    }

    return (
        <div className='prodCardCategs'>
            <nav className="prodCardCategs__categories" id='navCateg'>
                <div className='contentBack' id='contentCateg' onClick={removeActive}></div>
                {
                    classes.map((i, idx) => (
                        <div key={idx} className='categBlockWrap'>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Link onClick={() => {
                                    dispatch(clearCurrentProducts());
                                    windowTop();
                                    dispatch(getCurrentPage(1));
                                    paginate(1);
                                    removeActive();
                                }} className='categories__link'
                                      to={`/type/${i}#page=1`}>{i}</Link>
                                {
                                    categs
                                        .filter(q => q.class === i && q.category !== '')
                                        .map((obj) => {
                                            return obj.class === i ? obj.class : '';
                                        })
                                        .sort()
                                        .filter((a, idx, arr) => {
                                            return !idx || a !== arr[idx - 1];
                                        })
                                        .map((el, index1) => {
                                            return el === i ? !show ?
                                                <button key={index1} className='categBlockWrapBtn' onClick={() => {
                                                    setNewCateg(categs.filter(q => q.class === i && q.category !== ''));
                                                }} type="submit">
                                                    <svg style={{
                                                        display: 'block',
                                                        margin: 'auto',
                                                        fill: '#fff',
                                                        width: '20px',
                                                        height: '20px'
                                                    }} xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 448 512">
                                                        <path
                                                            d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z" />
                                                    </svg>
                                                </button> :
                                                <button key={index1} className='categBlockWrapBtn' onClick={() => {
                                                    setNewCateg([]);
                                                }} type="submit">-
                                                </button> : null;
                                        })
                                }
                            </div>
                            <div className='categBlock'>
                                {
                                    newCateg
                                        .map((obj) => {
                                            return obj.class === i ? obj.category : '';
                                        })
                                        .sort()
                                        .filter((a, idx, arr) => {
                                            return !idx || a !== arr[idx - 1];
                                        })
                                        .map((el, iidx) => {
                                            return el.length === 0 ? null :
                                                <React.Fragment key={iidx + 1}>
                                                    <Link className='categBlock__link'
                                                          onClick={() => {
                                                              dispatch(clearCurrentProducts());
                                                              dispatch(getCurrentPage(1));
                                                              windowTop();
                                                              paginate(1);
                                                              removeActive();
                                                          }}
                                                          to={`/category/${el}#page=1`}>{el}</Link>
                                                    <div className='subcateg--block'>
                                                        {
                                                            subcategs
                                                                .map((sub) => sub.category === el ? sub.subcategory : '')
                                                                .sort()
                                                                .filter((a, idx, arr) => {
                                                                    return !idx || a !== arr[idx - 1];
                                                                })
                                                                .map((cat, idxx) => {
                                                                    return cat.length === 0 ? null :
                                                                        <Link className='subcateg__link'
                                                                              onClick={() => {
                                                                                  dispatch(clearCurrentProducts());
                                                                                  dispatch(getCurrentPage(1));
                                                                                  windowTop();
                                                                                  paginate(1);
                                                                                  removeActive();
                                                                              }}
                                                                              key={idxx + 2} style={{
                                                                            color: '#fff',
                                                                        }}
                                                                              to={`/subcategory/${cat}#page=1`}>{cat}</Link>;
                                                                })
                                                        }
                                                    </div>
                                                </React.Fragment>;
                                        })
                                }
                            </div>
                        </div>
                    ))
                }

            </nav>
        </div>
    );
};

export default ProdCardCategs;
