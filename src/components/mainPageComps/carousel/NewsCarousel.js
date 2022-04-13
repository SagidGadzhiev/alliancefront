import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import allianceSlide from '../../../img/allianceSlide.png';
import allianceSlideNotebooks from '../../../img/allianceSlideNotebooks.png';
import allianceSlideAccessory from '../../../img/allianceSlideAccessory.png';
import { useDispatch } from 'react-redux';
import { clearCurrentProducts } from '../../../redux/reducers/storeItems';


const NewsCarousel = () => {

    const dispatch = useDispatch();

    return (
        <Carousel className='carousel-wrap'
                  infiniteLoop={true}
                  stopOnHover={true}
                  // autoPlay={true}
                  // interval={5000}
                  showArrows={true}
                  showThumbs={false}
        >
            <Link onClick={() => dispatch(clearCurrentProducts())} className='carousel-wrap__block'
                  to='/type/Процессоры'>
                <img className='carousel-img' src={allianceSlide} alt="pic" />
            </Link>
            <Link onClick={() => dispatch(clearCurrentProducts())} className='carousel-wrap__block' to='/type/Notebook'>
                <img className='carousel-img' src={allianceSlideNotebooks} alt="pic" />
            </Link>
            <Link onClick={() => dispatch(clearCurrentProducts())} className='carousel-wrap__block'
                  to='/type/Клавиатуры'>
                <img className='carousel-img' src={allianceSlideAccessory} alt="pic" />
            </Link>
        </Carousel>
    );
};

export default NewsCarousel;
