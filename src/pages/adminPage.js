import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ExcelToCSV from '../components/adminPageComps/excelCSVconverter';
import Bestsellers from '../components/adminPageComps/bestsellers';
import Sales from '../components/adminPageComps/sales';
import Novas from '../components/adminPageComps/novas';
import AddImgProducts from '../components/adminPageComps/addImgProducts';
import ChangeCurrency from '../components/adminPageComps/changeCurrency';


function AdminPage({ products, nova, setNova, selling, setSelling, }) {

    const login_value = 'allianceplus.kg@gmail.com';
    const password_value = 'alliancekg';
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const loginHand = (e) => {
        return setLogin(e.target.value);
    };

    const passHand = (e) => {
        return setPassword(e.target.value);
    };

    const signIn = () => {
        return login === login_value && password === password_value ? setIsAuthorized(true) : null;
    };

    const output = () => {
        setIsAuthorized(false);
        setLogin('');
        setPassword('');
    };

    if (!isAuthorized) {
        return (
            <div className='adminPage'>
                <h1 className='adminPage__title'>Админ панель</h1>
                <Link className='adminPage__toHome' to='/'>На главную</Link>
                <div className='container'>
                    <h2 className='adminPage__login-form--input-data'>Введите логин и пароль</h2>
                    <input
                        className='adminPage__login-form--login-field'
                        style={{ display: 'block' }}
                        onChange={loginHand}
                        type='email'
                        placeholder='login'
                        value={login}
                    />
                    <input
                        className='adminPage__login-form--password-field'
                        style={{ display: 'block' }}
                        onChange={passHand}
                        type='password'
                        placeholder='password'
                        value={password}
                    />
                    <button className='login-btn' type='button' onClick={signIn}>Войти</button>
                </div>
            </div>
        );
    }

    return (
        <div className='adminPage'>
            <h1 className='adminPage__title'>Админ панель</h1>
            <Link className='adminPage__toHome' to='/'>На главную</Link>
            <div className='container'>
                <button className='logout-btn' type='button' onClick={output}>Выйти</button>
                <ExcelToCSV />
                <ChangeCurrency />
                <AddImgProducts />
                <Novas products={products} nova={nova} setNova={setNova} />
                <Sales products={products} selling={selling} setSelling={setSelling} />
                <Bestsellers products={products} />
            </div>
        </div>
    );
}

export default AdminPage;
