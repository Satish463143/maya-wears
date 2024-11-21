import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useListForHomeQuery } from '../../api/product.api'
import ProductCarouselItem from '../../Middlewares/ProductCarouselItem/ProductCarouselItem'
import LoadingComponent from '../../Middlewares/Loading/Loading.component'

const ProductCarousel = () => {
    const {data, error, isLoading}  = useListForHomeQuery(null)
    if(isLoading) <LoadingComponent/>
    const product  = data?.result?.data || []

    const filteredProduct  = product.filter(item=> item.isFeatured === true)

   const limitedFilteredProduct = filteredProduct.slice(0, 10);

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
    <div  className='div_container' style={{ marginTop: '100vh' }}>
        <div data-aos="fade-up">
            <Slider {...settings}>
                {limitedFilteredProduct.map(item=>(
                    <ProductCarouselItem key={item._id} _id={item._id} slug={item.slug}/>
                ))}
            </Slider>            
        </div>
    </div>
  )
}

export default ProductCarousel