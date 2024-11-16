import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slides from '../../Middlewares/Slides/Slides';
import './ProductSlides.css';
import { useListForHomeQuery } from '../../api/product.api';
import LoadingComponent from '../../Middlewares/Loading/Loading.component';

const ProductSlides = () => {
  const { data, isLoading } = useListForHomeQuery(null);

  if (isLoading) return <LoadingComponent />;

  // Ensure we have an array, even if the API returns undefined or null
  const featuredProduct = data?.result?.data || [];

  // Filter for featured products
  const filteredProduct = featuredProduct.filter(item => item.isFeatured === true);

  // Limit the results to 8
  const limitedFilteredProduct = filteredProduct.slice(0, 8);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Adjust to show one product per slide
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <div className='div_container' style={{ marginTop: '100vh', paddingTop: '50px' }}>
      <div data-aos="fade-up">
        <div className='container'>
          <div className='image_slide_box'>
            <Slider {...settings}>
              {limitedFilteredProduct.map(item => (
                <Slides
                  key={item._id} // Ensure this key is unique
                  _id={item._id}
                  image={item.images?.[0] || 'defaultImage.jpg'} // Handle cases where `images` might be undefined
                  title={item.title}
                  price={item.price}
                  pattern={item.pattern}
                  sizes={item.sizes?.map((sizeObj, index) => 
                    index === item.sizes.length - 1 ? sizeObj.size : `${sizeObj.size}, `
                  ).join('') || 'N/A'} 
                  fabric={item.fabric}
                  wearable={item.wearable}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlides;
