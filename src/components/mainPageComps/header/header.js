import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPage, getSearching, removeSearching} from "../../../redux/reducers/storeItems";
import allianceLogo from "../../../assets/allianceLogos/allianceLogoComputerWhatsappPlus.png"

const Header = () => {

    const dispatch = useDispatch();

    const searching = useSelector(s => s.storeItems.searching);

    const setSearchingHandler = (e) => {
        dispatch(getCurrentPage(1));
        dispatch(getSearching(e.target.value))
    };

    const formHandler = (e) => {
        e.preventDefault();
    };

    const windowTop = () => {
        return window.scrollTo(0, 0);
    };

    const burgerMenu = () => {
        document.getElementById('bgMenu').classList.toggle('active');
        return document.getElementById('navCateg').classList.toggle('active')
    };

    return (
        <nav className='header' id='top'>
            <div className="container">
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap"
                }}>
                    <Link onClick={windowTop} to='/'>
                        <img style={{width: "150px"}} src={allianceLogo} alt="pic"/>
                    </Link>
                    <Link onClick={() => {
                        windowTop()
                    }} to='/' className='logotype'>Alliance<span className='logotype__text'>Computers</span></Link>
                </div>

                {/*<Link onClick={() => {windowTop()}} to='/' className='logotype'>Alliance<span className='logotype__text'>Plus</span></Link>*/}
                <nav className='header__nav'>
                    <Link onClick={() => {
                        windowTop()
                    }} to='/' className="header__nav__link">Главная</Link>
                    <Link onClick={() => {
                        windowTop()
                    }} to='/new' className="header__nav__link">Новинки</Link>
                    <Link onClick={() => {
                        windowTop()
                    }} to='/bestsellers' className="header__nav__link">Лидеры продаж</Link>
                    <Link onClick={() => {
                        windowTop()
                    }} to='/shipping' className="header__nav__link">Доставка</Link>
                    <Link onClick={() => {
                        windowTop()
                    }} to='/sale' className="header__nav__link">Акции</Link>
                    <Link onClick={() => {
                        windowTop()
                    }} to='/contacts' className="header__nav__link">Контакты</Link>
                </nav>
            </div>

            <nav className="searching">

                <div id='bgMenu' className="burger-menu" onClick={burgerMenu} style={{display: "none"}}>
                    <span className="burger-menu__line"></span>
                </div>

                <nav className="searching__category">
                    <nav className='searching__category__nav'>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="th-list"
                             className="svg-inline--fa fa-th-list fa-w-16 searching__category__pic" role="img"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill=""
                                  d="M149.333 216v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-80c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zM125.333 32H24C10.745 32 0 42.745 0 56v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zm80 448H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm-24-424v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24zm24 264H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24z"></path>
                        </svg>
                    </nav>
                    <p className='searching__category__title'>Категории</p>
                </nav>
                <form onSubmit={formHandler} className='searching__form'>
                    <label className='searching__form__label'>
                        <input className='searching__form__label__input' type="text" placeholder='Искать...'
                               onChange={setSearchingHandler} value={searching} title='Поиск товаров'/>
                        {/*<button onClick={() => {*/}
                        {/*    dispatch(removeSearching());*/}
                        {/*    dispatch(getCurrentPage(1))*/}
                        {/*}} style={{*/}
                        {/*    display: `${searching.length === 0 ? 'none' : 'block'}`*/}
                        {/*}} className='searching__form__label__deleteBtn' type="button">&#10006;</button>*/}
                        <Link
                            // onClick={() => dispatch(getCurrentPage(1))}
                            to={`/search=${searching}`} className='searching__form__label__btn' type="submit">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search"
                                 className="svg-inline--fa fa-search fa-w-16 searching__form__label__btn__pic"
                                 role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill=""
                                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                            </svg>
                        </Link>
                    </label>
                </form>
                <nav className="searching__wishes">
                    <Link to='/wishes' className="searching__wishes__wish">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart"
                             className="svg-inline--fa fa-heart fa-w-16 searching__wishes__wish__pic" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill=""
                                  d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                        </svg>
                        <p className='searching__wishes__wish__title'>Желаемое</p>
                    </Link>
                    <Link to='/shopping' className="searching__wishes__cart">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart"
                             className="svg-inline--fa fa-shopping-cart fa-w-18 searching__wishes__cart__pic" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path fill=""
                                  d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path>
                        </svg>
                        <p className='searching__wishes__cart__title'>Корзина</p>
                    </Link>
                </nav>
            </nav>

            <a className='upBtn' href="#top">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-up"
                     className="svg-inline--fa fa-chevron-up fa-w-14 upBtn__pic" role="img"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512">
                    <path fill=""
                          d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path>
                </svg>
            </a>

        </nav>
    );
};

export default Header;