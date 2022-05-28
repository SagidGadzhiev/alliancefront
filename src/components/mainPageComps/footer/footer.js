import React from 'react';
import { Link } from 'react-router-dom';
import allianceLogo from '../../../assets/allianceLogos/allianceComputers.png';

function Footer() {
  const windowTop = () => window.scrollTo(0, 0);

  return (
    <footer className='footer' id='foot'>
      <div className='container'>
        <div className='footer__block'>
          <div className='footer__block__label footer__block__footerNews'>

            <div style={{
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <Link onClick={windowTop} to='/'>
                <img style={{ width: '100px' }} src={allianceLogo} alt='pic' />
              </Link>
              {/* <Link onClick={() => { */}
              {/*    windowTop() */}
              {/* }} to='/' className='logotype'>Alliance<span className='logotype__text'>Plus</span></Link> */}
            </div>

            {/* <Link onClick={() => {windowTop()}} to='/' className='logotype'>Alliance<span className='logotype__text'>Plus</span></Link> */}
            <p className='footer__block__aboutShop'>
              AllianceComputers.kg - интернет-магазин по продаже
              компьютерной техники.
            </p>
          </div>
          <div className='footer__block__aboutUs footer__block__footerNews'>
            <p className='footer__block__text'>О магазине</p>
            <div className='footer__block__list'>
              <Link
                onClick={() => {
                  windowTop();
                }}
                to='/aboutUs'
                className='footer__block__list__link'
              >
                О нас
              </Link>
              <Link
                onClick={() => {
                  windowTop();
                }}
                to='/contacts'
                className='footer__block__list__link'
              >
                Контакты
              </Link>
            </div>
          </div>
          <div className='footer__block__help footer__block__footerNews'>
            <p className='footer__block__text'>Помощь</p>
            <div className='footer__block__list'>
              <Link
                onClick={() => {
                  windowTop();
                }}
                to='/shipping'
                className='footer__block__list__link'
              >
                Оформление заказа, доставка
              </Link>
              {/* <Link onClick={() => { */}
              {/*    windowTop() */}
              {/* }} to='/' className='footer__block__list__link'>Гарантия, обмен, возврат</Link> */}
            </div>
          </div>
          <div className='footer__block__other footer__block__footerNews'>
            <p className='footer__block__text'>Разное</p>
            <div className='footer__block__list'>
              <Link
                onClick={() => {
                  windowTop();
                }}
                to='/sale'
                className='footer__block__list__link'
              >
                Акции, скидки
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
