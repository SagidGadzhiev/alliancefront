import React, { useState } from 'react';
import ProdCardCategs from '../components/productCardComps/prodCardCategs/prodCardCategs';

function AboutUs() {
  const [, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='aboutUs'>
      <div className='container' style={{ display: 'flex' }}>
        <ProdCardCategs paginate={paginate} />
        <div className='aboutUs__description'>
          <h2 className='aboutUs__description__title'>О компании AlliancePlus</h2>
          <ul className='aboutUs__description__list'>
            <li className='aboutUs__description__list__text'></li>
            <li className='aboutUs__description__list__text'></li>
            <li className='aboutUs__description__list__text'></li>
            <li className='aboutUs__description__list__text'></li>
            <li className='aboutUs__description__list__text'></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
