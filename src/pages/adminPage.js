import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ExcelToCSV from '../components/adminPageComps/excelCSVconverter';
import useDebounce from '../hooks/useDebounce';
import { useSelector } from 'react-redux';

function AdminPage({
  products, nova, setNova, selling, setSelling,
}) {

  const currency = useSelector(s => s.storeItems.currency);

  const debouncedInput = useDebounce(getAllProducts, 500);
  const [novaProd, setNovaProd] = useState('');
  const [saleProd, setSaleProd] = useState('');
  const [input, setInput] = useState('');
  const [productsArray, setProductsArray] = useState([]);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [pushLogin, setPushLogin] = useState('');
  const [pushPassword, setPushPassword] = useState('');
  const [newCurrencyValue, setNewCurrencyValue] = useState('');

  useEffect(() => {
    function fetchData() {
      return axios('https://allianceplusserver.herokuapp.com/products')
        .then(({ data }) => setProductsArray(data));
    }

    fetchData().then((res) => res);
  }, []);

  const inputHandler = (e) => {
    setInput(e.target.value);
    return debouncedInput();
  };

  function getAllProducts() {
    return axios('https://allianceplusserver.herokuapp.com/products').then(({ data }) => setProductsArray(data));
  }

  async function addImg(prod, prodId, url) {
    await axios.patch(`https://allianceplusserver.herokuapp.com/image/${prodId}`, { ...prod, img: url }).then();
    return setInput('');
  }

  async function addNovaProd() {
    await axios.post('https://allianceplusserver.herokuapp.com/nova', nova).then();
    setNova([]);
    return setNovaProd('');
  }

  async function addSaleProd() {
    await axios.post('https://allianceplusserver.herokuapp.com/sale', selling).then();
    setSelling([]);
    return setSaleProd('');
  }

  function loginHand(e) {
    return setPushLogin(e.target.value);
  }

  function passHand(e) {
    return setPushPassword(e.target.value);
  }

  function signIn(log, pas) {
    setLogin(log);
    setPassword(pas);
    setPushLogin('');
    setPushPassword('');
  }

  function output() {
    setLogin('');
    setPassword('');
  }

  if (login !== 'allianceplus.kg@gmail.com' || password !== 'alliancekg') {
    return (
      <div className='adminPage'>
        <h1 className='adminPage__title'>Админ панель</h1>
        <Link className='adminPage__toHome' to='/'>На главную</Link>
        <div className='container'>
          <h2
            className='adminPage__login-form--input-data'
          >
            Введите логин и пароль
          </h2>
          <input
            className='adminPage__login-form--login-field'
            style={{ display: 'block' }}
            onChange={loginHand}
            type='email'
            placeholder='login'
            value={pushLogin}
          />
          <input
            className='adminPage__login-form--password-field'
            style={{ display: 'block' }}
            onChange={passHand}
            type='password'
            placeholder='password'
            value={pushPassword}
          />
          <button
            className='login-btn'
            type='button'
            onClick={() => signIn(pushLogin, pushPassword)}
          >
            Войти
          </button>
          {
            login === '' && password === '' ? null
                :
                login !== 'allianceplus.kg@gmail.com' || password !== 'alliancekg'
                ? (<p className='incorrect-data'>Неверный логин или пароль</p>)
                : null
          }
        </div>
      </div>
    );
  }

  return (
    <div className='adminPage'>
      <h1 className='adminPage__title'>Админ панель</h1>
      <Link className='adminPage__toHome' to='/'>На главную</Link>
      <div className='container'>
        <ExcelToCSV />
        <form style={{margin: '10px 0'}} onSubmit={async (e) => {
          e.preventDefault();
          await axios.put('https://allianceplusserver.herokuapp.com/currency', { currency: newCurrencyValue });
          setNewCurrencyValue('');
        }}>
          <label>
            Текущий курс на сайте 1USD = {currency}KGS
            <br/>
            <input value={newCurrencyValue} onChange={(e) => setNewCurrencyValue(e.target.value)} type="number"
                   placeholder='Введите новый курс...' />
          </label>
          <button onClick={async () => {
            await axios.put('https://allianceplusserver.herokuapp.com/currency', { currency: newCurrencyValue });
            setNewCurrencyValue('');
          }} type="submit">Изменить курс
          </button>
        </form>
        <button
          className='logout-btn'
          type='button'
          onClick={output}
        >
          Выйти
        </button>
        <div className='empty-images-container'>
          {
            productsArray.filter((i) => i.img === '').map((i) => (
                <div className='empty-images-container__block' key={i.id}>
                  <p className='empty-images-container__block--text'>id-товара :{i.id}</p>
                  <p className='empty-images-container__block--text'>Код-товара :{i.code}</p>
                  <p className='empty-images-container__block--text'>Название товара :<br />{' '}{i.product}</p>
                  <p className='empty-images-container__block--text'>Класс :{i.class}</p>
                  <p className='empty-images-container__block--text'>Категория :{i.category}</p>
                  <p className='empty-images-container__block--text'>Подкатегория :{i.subcategory}</p>
                  <p className='empty-images-container__block--text'>URL-картинки :{i.img}</p>
                  <input
                      placeholder='Input image url to this field'
                      style={{ width: '100%', height: '40px' }}
                      onChange={inputHandler}
                      type='text'
                  />
                  <button
                      style={{ width: '100%', height: '40px', cursor: 'pointer' }}
                      type='submit'
                      onClick={() => addImg(i, i.id, input)}
                  >
                    Добавить картинку
                  </button>
                </div>
            ))
          }
        </div>
        <p
            style={{ marginTop: '30px', fontWeight: 'bold' }}
            className='nullImgCount'
        >
          Продуктов без картинок :{productsArray.filter((i) => i.img === '').length}
        </p>
        <div
            style={{ marginTop: '50px' }}
        >
          <h2 style={{ marginBottom: '20px' }}>Добавление нового товара</h2>
          <input
            style={{ width: '100%', height: '40px' }}
            onChange={(e) => setNovaProd(e.target.value)}
            type='text'
            placeholder='Введите код товара'
            value={novaProd}
          />
          <button
            style={{ width: '100%', height: '40px', marginTop: 10, cursor: 'pointer', }}
            type='submit'
            onClick={() => {
              setNova(products.filter((i) => i.code === novaProd));
            }}
          >
            Найти товар
          </button>
          <button
            disabled={nova.length === 0}
            style={{ width: '100%', height: '40px', marginTop: 10, cursor: 'pointer', }}
            type='submit'
            onClick={() => addNovaProd(novaProd)}
          >
            Добавить новый товар
          </button>
        </div>
        {
          nova.map((i) => (
              <div key={i.id}>
                <img
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                    src={i.img}
                    alt=''
                />
                <p>ID :{i.id}</p>
                <p>Код товара :{i.code}</p>
                <p>Название :{i.product}</p>
                <p>Класс :{i.class}</p>
                <p>Категория :{i.category}</p>
                <p>Под категория :{i.subcategory}</p>
                <p>Цена :{i.price}</p>
                <p>Количество :{i.count}</p>
                <p>Единица :{i.unit}</p>
                <p>Комментарий(гарантия) :{i.comment}</p>
              </div>
          ))
        }
        <div
            style={{ marginTop: '50px' }}
        >
          <h2 style={{ marginBottom: '20px' }}>Добавление акционного товара</h2>
          <input
            style={{ width: '100%', height: '40px' }}
            onChange={(e) => setSaleProd(e.target.value)}
            type='text'
            placeholder='Введите код товара'
            value={saleProd}
          />
          <button
            style={{ width: '100%', height: '40px', marginTop: 10, cursor: 'pointer', }}
            type='submit'
            onClick={() => {setSelling(products.filter((i) => i.code === saleProd));}}
          >
            Найти товар
          </button>
          <button
            disabled={selling.length === 0}
            style={{ width: '100%', height: '40px', marginTop: 10, cursor: 'pointer', }}
            type='submit'
            onClick={() => addSaleProd(saleProd)}
          >
            Добавить новый акционный товар
          </button>
        </div>
        {
          selling.map((i) => (
              <div key={i.id}>
                {
                  i.img === '' ?
                      null
                      :
                      <img
                          style={{ width: '100px', height: '100px', objectFit: 'contain', objectPosition: 'center' }}
                          src={i.img}
                          alt=''
                      />
                }
                <p>ID :{i.id}</p>
                <p>Код товара :{i.code}</p>
                <p>Название :{i.product}</p>
                <p>Класс :{i.class}</p>
                <p>Категория :{i.category}</p><p>Под категория :{i.subcategory}</p>
                <p>Цена :{i.price}</p>
                <p>Количество :{i.count}</p>
                <p>Единица :{i.unit}</p>
                <p>Комментарий(гарантия) :{i.comment}</p>
              </div>
          ))
        }
      </div>
    </div>
  );
}

export default AdminPage;
