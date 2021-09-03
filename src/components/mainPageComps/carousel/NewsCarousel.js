import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';
import electronics from '../../../img/electronics.jpg'
import important from '../../../img/important.jpg'
import sale from '../../../img/sale.jpg'
import arrive from '../../../img/arrive.jpg'
import {Link} from "react-router-dom";

const NewsCarousel = () => {
    return (
        <Carousel style={{maxWidth: "900px"}} infiniteLoop={true} stopOnHover={true} autoPlay={true} interval={5000} showArrows={true}
                  showThumbs={false}>
            <div>
                <img className='carousel-img' src={electronics} alt="pic" />
            </div>
            <Link to='/new' style={{display: "block"}}>
                <img className='carousel-img' src={arrive} alt="pic"/>
                <p className="carousel-text">Перейдите по ссылке и узнайте о недавно поступивших товарах!</p>
            </Link>
            <Link to='/sale' style={{display: "block"}}>
                <img className='carousel-img' src={sale} alt="pic"/>
                <p className="carousel-text">Перейдите по ссылке и успейте приобрести товары по хорошей скидке!</p>
            </Link>
        </Carousel>
    );
};

export default NewsCarousel;