import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import allianceSlide from '../../../assets/img/allianceSlide.png';
import allianceSlideNotebooks from '../../../assets/img/allianceSlideNotebooks.png';
import allianceSlideAccessory from '../../../assets/img/allianceSlideAccessory.png';
import andaseatChair from '../../../assets/img/andaseatChairs.jpg';
import hikvisionImg from '../../../assets/img/hikvision.jpg';
import aerocoolChairs from '../../../assets/img/aerocoolChairs.jpg';
import { clearCurrentProducts } from '../../../redux/reducers/storeItems';
import allProductsLogos from '../../../assets/allianceLogos/AllProductsLogos.png';


function NewsCarousel() {
  const dispatch = useDispatch();

  return (
    <Carousel
      className='carousel-wrap'
      autoPlay={5000}
      infiniteLoop
      stopOnHover
      showArrows={true}
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
    >
      <Link
          onClick={() => dispatch(clearCurrentProducts())}
          className='carousel-wrap__block'
          to='/'
      >
        <img className='carousel-img' src={allProductsLogos} alt='pic' />
      </Link>
      <Link
          onClick={() => dispatch(clearCurrentProducts())}
          className='carousel-wrap__block'
          to='/subcategory/IP купольные'
      >
        <img className='carousel-img' src={hikvisionImg} alt='pic' />
      </Link>
      <Link
          onClick={() => dispatch(clearCurrentProducts())}
          className='carousel-wrap__block'
          to='/type/Игровая мебель'
      >
        <img className='carousel-img fill_img' src={andaseatChair} alt='pic' />
      </Link>
      <Link
          onClick={() => dispatch(clearCurrentProducts())}
          className='carousel-wrap__block'
          to='/type/Игровая мебель'
      >
        <img className='carousel-img fill_img' src={aerocoolChairs} alt='pic' />
      </Link>
      <Link
        onClick={() => dispatch(clearCurrentProducts())}
        className='carousel-wrap__block'
        to='/type/Процессоры'
      >
        <img className='carousel-img' src={allianceSlide} alt='pic' />
      </Link>
      <Link onClick={() => dispatch(clearCurrentProducts())} className='carousel-wrap__block' to='/type/Notebook'>
        <img className='carousel-img' src={allianceSlideNotebooks} alt='pic' />
      </Link>
      <Link
        onClick={() => dispatch(clearCurrentProducts())}
        className='carousel-wrap__block'
        to='/type/Клавиатуры'
      >
        <img className='carousel-img' src={allianceSlideAccessory} alt='pic' />
      </Link>
    </Carousel>
  );
}

export default NewsCarousel;
