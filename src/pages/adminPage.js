import React, {useState, useEffect} from 'react';
import axios from "axios";

const AdminPage = ({products, nova, setNova, selling, setSelling}) => {

    const [novaProd, setNovaProd] = useState('');
    const [saleProd, setSaleProd] = useState('');

    const [inp, setInp] = useState('');

    const [prods, setProds] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        await axios('https://allianceplusserver.herokuapp.com/products').then(({data}) => setProds(data))
    }, [inp]);

    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');

    const [l, setL] = useState('');
    const [p, setP] = useState('');

    const inpHand = (e) => {
        return setInp(e.target.value)
    };

    async function addImg(prod, prodId, url) {
        await axios.patch(`https://allianceplusserver.herokuapp.com/image/${prodId}`, {...prod, img: url}).then();
        return setInp('')
    }

    async function addNovaProd(novaValue) {
        console.log(nova);
        axios.post('https://allianceplusserver.herokuapp.com/nova', nova).then();
        setNova([])
        return setNovaProd('')
    }

    async function addSaleProd(saleValue) {
        console.log(selling);
        axios.post('https://allianceplusserver.herokuapp.com/sale', selling).then();
        setSelling([])
        return setSaleProd('')
    }

    function loginHand(e) {
        return setL(e.target.value)
    }

    function passHand(e) {
        return setP(e.target.value)
    }

    function signIn(log, pas) {
        setLogin(log);
        setPass(pas);
        setL('');
        setP('')
    }

    function output() {
        setLogin('');
        setPass('')
    }

    // if (login !== 'allianceplus.kg@gmail.com' && pass !== 'alliancekg') {
    //     return <div className='authorization'>
    //         <div className="container">
    //             <h2 style={{
    //                 display: `${login === 'allianceplus.kg@gmail.com' && pass === 'alliancekg' ? 'none' : 'block'}`,
    //                 margin: "20px 0"
    //             }}>Введите
    //                 логин и пароль</h2>
    //             <input
    //                 style={{
    //                     display: `${login === 'allianceplus.kg@gmail.com' && pass === 'alliancekg' ? 'none' : 'block'}`,
    //                     marginBottom: "10px",
    //                     width: "40%",
    //                     height: "30px",
    //                     paddingLeft: "10px"
    //                 }}
    //                 onChange={loginHand} type="email" placeholder='login' value={l}/>
    //             <input
    //                 style={{
    //                     display: `${login === 'allianceplus.kg@gmail.com' && pass === 'alliancekg' ? 'none' : 'block'}`,
    //                     marginBottom: "10px",
    //                     width: "40%",
    //                     height: "30px",
    //                     paddingLeft: "10px"
    //                 }}
    //                 onChange={passHand} type="password" placeholder='password' value={p}/>
    //             <button
    //                 style={{
    //                     display: `${login === 'allianceplus.kg@gmail.com' && pass === 'alliancekg' ? 'none' : 'block'}`,
    //                     width: "100px",
    //                     height: "30px"
    //                 }}
    //                 type="button" onClick={() => signIn(l, p)}>Войти
    //             </button>
    //             <button
    //                 style={{
    //                     display: `${login !== 'allianceplus.kg@gmail.com' && pass !== 'alliancekg' ? 'none' : 'block'}`,
    //                     width: "100px",
    //                     height: "30px"
    //                 }}
    //                 type="button" onClick={output}>Выйти
    //             </button>
    //             <p style={{
    //                 display: `${login === '' && pass === '' ? 'none' :
    //                     login !== 'allianceplus.kg@gmail.com' && pass !== 'alliancekg' ? 'block' : 'none'}`,
    //                 marginTop: "10px",
    //                 fontWeight: "bold",
    //                 fontSize: "12px"
    //             }}>Неверный
    //                 логин или пароль</p>
    //         </div>
    //     </div>
    // }

    return (
        <div className='adminPage' style={{margin: "30px 0"}}>

            <div className="container">

                <h2 style={{
                    display: `${login === 'allianceplus.kg@gmail.com' && pass === 'alliancekg' ? 'none' : 'block'}`,
                    margin: "20px 0"
                }}>Введите
                    логин и пароль</h2>
                <input
                    style={{
                        display: `${login === 'allianceplus.kg@gmail.com' && pass === 'alliancekg' ? 'none' : 'block'}`,
                        marginBottom: "10px",
                        width: "40%",
                        height: "30px",
                        paddingLeft: "10px"
                    }}
                    onChange={loginHand} type="email" placeholder='login' value={l}/>
                <input
                    style={{
                        display: `${login === 'allianceplus.kg@gmail.com' && pass === 'alliancekg' ? 'none' : 'block'}`,
                        marginBottom: "10px",
                        width: "40%",
                        height: "30px",
                        paddingLeft: "10px"
                    }}
                    onChange={passHand} type="password" placeholder='password' value={p}/>
                <button
                    style={{
                        display: `${login === 'allianceplus.kg@gmail.com' && pass === 'alliancekg' ? 'none' : 'block'}`,
                        width: "100px",
                        height: "30px"
                    }}
                    type="button" onClick={() => signIn(l, p)}>Войти
                </button>

                <button
                    style={{
                        display: `${login !== 'allianceplus.kg@gmail.com' && pass !== 'alliancekg' ? 'none' : 'block'}`,
                        width: "100px",
                        height: "30px"
                    }}
                    type="button" onClick={output}>Выйти
                </button>

                <p style={{
                    display: `${login === '' && pass === '' ? 'none' :
                        login !== 'allianceplus.kg@gmail.com' && pass !== 'alliancekg' ? 'block' : 'none'}`,
                    marginTop: "10px",
                    fontWeight: "bold",
                    fontSize: "12px"
                }}>Неверный
                    логин или пароль</p>

                <div
                    style={{
                        display: `${login === 'allianceplus.kg@gmail.com' && pass === 'alliancekg' ? 'block' : 'none'}`,
                        overflow: "auto",
                        maxHeight: "300px"
                    }}>
                    {
                        prods.filter(i => {
                            return i.img === ''
                        }).map((i) => (
                            <div style={{margin: "20px 0", borderBottom: "1px solid #ddd", paddingBottom: "10px"}}
                                 className='admin-block' key={i.id}>
                                <p style={{marginBottom: 10}}>id-товара : {i.id}</p>
                                <p style={{marginBottom: 10}}>Код-товара : {i.code}</p>
                                <p style={{marginBottom: 10}}>Название товара : <br/> {i.product}</p>
                                <p style={{marginBottom: 10}}>Класс : {i.class}</p>
                                <p style={{marginBottom: 10}}>Категория : {i.category}</p>
                                <p style={{marginBottom: 10}}>Подкатегория : {i.subcategory}</p>
                                <p style={{marginBottom: 10}}>URL-картинки : {i.img}</p>
                                <input placeholder='Input image url to this field'
                                       style={{width: "100%", height: "40px"}}
                                       onChange={inpHand} type="text" value={inp}/>
                                <button style={{width: "100%", height: "40px", cursor: "pointer"}}
                                        type="submit"
                                        onClick={() => addImg(i, i.id, inp)}>Добавить картинку
                                </button>
                            </div>
                        ))
                    }
                </div>

                <p style={{
                    display: `${login === 'allianceplus.kg@gmail.com' && pass === 'alliancekg' ? 'block' : 'none'}`,
                    marginTop: "30px",
                    fontWeight: "bold"
                }} className='nullImgCount'>Продуктов без картинок
                    : {prods.filter(i => i.img === '').length}</p>

                <div style={{
                    // display: `${login === 'allianceplus.kg@gmail.com' && pass === 'alliancekg' ? 'block' : 'none'}`,
                    marginTop: "50px"
                }}>
                    <h2 style={{marginBottom: "20px"}}>Добавление нового товара</h2>
                    <input
                        style={{width: "100%", height: "40px"}}
                        onChange={(e) => setNovaProd(e.target.value)} type="text"
                        placeholder='Введите название товара' value={novaProd}/>
                    <button
                        style={{width: "100%", height: "40px", marginTop: 10, cursor: "pointer"}} type="submit"
                        onClick={() => {
                            setNova(products.filter(i => i.product === novaProd))
                        }}>Найти товар
                    </button>
                    <button
                        disabled={nova.length === 0}
                        style={{width: "100%", height: "40px", marginTop: 10, cursor: "pointer"}} type="submit"
                        onClick={() => addNovaProd(novaProd)}>Добавить новый товар
                    </button>
                </div>

                {
                    nova.map(i => (
                        <div key={i.id}>
                            <img style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "contain",
                                objectPosition: "center"
                            }} src={i.img} alt="pic"/>
                            <p>ID : {i.id}</p>
                            <p>Код товара : {i.code}</p>
                            <p>Название : {i.product}</p>
                            <p>Класс : {i.class}</p>
                            <p>Категория : {i.category}</p>
                            <p>Под категория : {i.subcategory}</p>
                            <p>Цена : {i.price}</p>
                            <p>Количество : {i.count}</p>
                            <p>Единица : {i.unit}</p>
                            <p>Комментарий(гарантия) : {i.comment}</p>
                        </div>
                    ))
                }

                <div style={{
                    // display: `${login === 'allianceplus.kg@gmail.com' && pass === 'alliancekg' ? 'block' : 'none'}`,
                    marginTop: "50px"
                }}>
                    <h2 style={{marginBottom: "20px"}}>Добавление акционного товара</h2>
                    <input
                        style={{width: "100%", height: "40px"}}
                        onChange={(e) => setSaleProd(e.target.value)} type="text"
                        placeholder='Введите название товара' value={saleProd}/>
                    <button
                        style={{width: "100%", height: "40px", marginTop: 10, cursor: "pointer"}} type="submit"
                        onClick={() => {
                            setSelling(products.filter(i => i.product === saleProd))
                        }}>Найти товар
                    </button>
                    <button
                        disabled={selling.length === 0}
                        style={{width: "100%", height: "40px", marginTop: 10, cursor: "pointer"}} type="submit"
                        onClick={() => addSaleProd(saleProd)}>Добавить новый акционный товар
                    </button>
                </div>

                {
                    selling.map(i => (
                        <div key={i.id}>
                            <img style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "contain",
                                objectPosition: "center"
                            }} src={i.img} alt="pic"/>
                            <p>ID : {i.id}</p>
                            <p>Код товара : {i.code}</p>
                            <p>Название : {i.product}</p>
                            <p>Класс : {i.class}</p>
                            <p>Категория : {i.category}</p>
                            <p>Под категория : {i.subcategory}</p>
                            <p>Цена : {i.price}</p>
                            <p>Количество : {i.count}</p>
                            <p>Единица : {i.unit}</p>
                            <p>Комментарий(гарантия) : {i.comment}</p>
                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default AdminPage;