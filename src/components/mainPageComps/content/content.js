import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Content = () => {

    const [show, setShow] = useState(false);
    const [newCateg, setNewCateg] = useState([]);

    // const categories = useSelector((s) => {
    //     return s.storeItems.products.map((i, idx) => {
    //         return i.category
    //     })
    //         .sort()
    //         .filter((i, idx, arr) => {
    //             return !idx || i !== arr[idx - 1]
    //         })
    // });

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
                {/*{*/}
                {/*    categories*/}
                {/*        .map((i, idx, arr) => (*/}
                {/*            <Link key={idx} onClick={() => windowTop()} className='categories__link'*/}
                {/*                  to={`/category/${i}`}>{i}</Link>*/}
                {/*        ))*/}
                {/*}*/}
                {
                    classes.map((i, idx) => (
                        <div key={idx} className='categBlockWrap'>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <Link onClick={() => {
                                    windowTop();
                                    removeActive()
                                }} className='categories__link'
                                      to={`/type/${i}`}>{i}</Link>
                                <button className='categBlockWrapBtn' onClick={() => {
                                    setShow(!show);
                                    setNewCateg(categs.filter(q => q.class === i && q.category !== ''))
                                }} type="submit">+
                                </button>
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