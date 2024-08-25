import React, { useContext } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slides from '../Slides/Slides';
import { StoreContext } from '../../context/StoreContext';
import './ProductSlides.css';

const ProductSlides = () => {
  const { ProductList } = useContext(StoreContext);
  const bestSelling = ProductList.filter(item => item.category === "Best Selling");

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const bestShuffleArray = shuffleArray([...bestSelling]);
  const limitedbestShuffleArray = bestShuffleArray.slice(0, 8);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <div className='div_container ' style={{marginTop:'100vh',paddingTop:'50px'}}>
      <div className='container'>
        <div className='image_slide_box'>
          <Slider {...settings}>
            {limitedbestShuffleArray.map((item, index) => (
              <Slides
                key={index}
                logo={item.logo}
                id={item._id}
                image={item.image}
                title={item.title}
                price={item.price}
                dhakaPattern={item.dhakaPattern}
                availableSize={item.availableSize}
                fabric={item.fabric}
                styles={item.styles}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProductSlides;
