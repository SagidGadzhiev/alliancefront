import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {clearCurrentProducts} from "../../../redux/reducers/storeItems";

const Content = () => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [newCateg, setNewCateg] = useState([]);

    const classes = useSelector((s) => {
        return s.storeItems.products.map((i) => {
            return i.class
        })
            .sort()
            .filter((i, idx, arr) => {
                return !idx || i !== arr[idx - 1]
            })
    });

    const categs = useSelector((s) => {
        return s.storeItems.products.map((i) => {
            return {class: i.class, category: i.category}
        })
    });

    const subcategs = useSelector((s) => {
        return s.storeItems.products.map((i) => {
            return {class: i.class, category: i.category, subcategory: i.subcategory}
        })
    });

    const windowTop = () => {
        return window.scrollTo(0, 0);
    };

    const burgerMenu = () => {
        document.getElementById('bgMenu').classList.toggle('active');
        return document.getElementById('navCateg').classList.toggle('active')
    };

    const removeActive = () => {
        document.getElementById('bgMenu').classList.remove('active');
        return document.getElementById('navCateg').classList.remove('active')
    };

    return (
        <div className='content'>

            <div id='bgMenu' className="burger-menu" onClick={burgerMenu}>
                <span className="burger-menu__line"></span>
            </div>

            <nav className="categories" id='navCateg'>
                {
                    classes.map((i, idx) => (
                        <div key={idx} className='categBlockWrap'>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <Link onClick={() => {
                                    dispatch(clearCurrentProducts());
                                    windowTop();
                                    removeActive()
                                }} className='categories__link'
                                      to={`/type/${i}`}>{i}</Link>
                                {
                                    categs
                                        .filter(q => q.class === i && q.category !== '')
                                        .map((obj) => {
                                            return obj.class === i ? obj.class : ''
                                        })
                                        .sort()
                                        .filter((a, idx, arr) => {
                                            return !idx || a !== arr[idx - 1]
                                        })
                                        .map((el, index1) => {
                                            return el === i ? !show ?
                                                <button key={index1} className='categBlockWrapBtn' onClick={() => {
                                                    setShow(!show);
                                                    setNewCateg(categs.filter(q => q.class === i && q.category !== ''))
                                                }} type="submit">+
                                                </button> :
                                                <button key={index1} className='categBlockWrapBtn' onClick={() => {
                                                    setShow(!show);
                                                    setNewCateg([])
                                                }} type="submit">-
                                                </button> : null
                                        })
                                    // !show ?
                                    //     <button className='categBlockWrapBtn' onClick={() => {
                                    //         setShow(!show);
                                    //         setNewCateg(categs.filter(q => q.class === i && q.category !== ''))
                                    //     }} type="submit">+
                                    //     </button> :
                                    //     <button className='categBlockWrapBtn' onClick={() => {
                                    //         setShow(!show);
                                    //         setNewCateg([])
                                    //     }} type="submit">-
                                    //     </button>
                                }
                                {/*<button className='categBlockWrapBtn' onClick={() => {*/}
                                {/*    setShow(!show);*/}
                                {/*    setNewCateg(categs.filter(q => q.class === i && q.category !== ''))*/}
                                {/*}} type="submit">+*/}
                                {/*</button>*/}
                            </div>
                            {
                                newCateg
                                    .map((obj) => {
                                        return obj.class === i ? obj.category : ''
                                    })
                                    .sort()
                                    .filter((a, idx, arr) => {
                                        return !idx || a !== arr[idx - 1]
                                    })
                                    .map((el, iidx) => (
                                        <div key={iidx + 1} className='categBlock'>
                                            <Link className='categBlock__link'
                                                  onClick={() => {
                                                      dispatch(clearCurrentProducts());
                                                      windowTop();
                                                      removeActive()
                                                  }}
                                                  to={`/category/${el}`}>{el}</Link>
                                            {
                                                subcategs
                                                    .map((sub) => sub.category === el ? sub.subcategory : '')
                                                    .sort()
                                                    .filter((a, idx, arr) => {
                                                        return !idx || a !== arr[idx - 1]
                                                    })
                                                    .map((cat, idxx) => (
                                                        <Link className='subcateg__link' onClick={() => {
                                                            dispatch(clearCurrentProducts());
                                                            windowTop();
                                                            removeActive()
                                                        }}
                                                              key={idxx + 2} style={{
                                                            color: "#fff",
                                                        }}
                                                              to={`/subcategory/${cat}`}>{cat}</Link>
                                                    ))
                                            }
                                        </div>
                                    ))
                            }
                        </div>
                    ))
                }
            </nav>
        </div>
    );
};

export default Content;