import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useListForHomeQuery } from '../../api/product.api';
import ProductCarouselItem from '../../Middlewares/ProductCarouselItem/ProductCarouselItem';
import LoadingComponent from '../../Middlewares/Loading/Loading.component';

const ProductCarousel = () => {
    const { data, error, isLoading } = useListForHomeQuery(null);

    // Return Loading component if data is still loading
    if (isLoading) return <LoadingComponent />;

    const product = data?.result?.data || [];
    const filteredProduct = product.filter(item => item.isFeatured === true);
    const limitedFilteredProduct = filteredProduct.slice(0, 10);

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        variableWidth: true, // Enable custom widths for slides
    };
    

    return (
        <div className='div_container' style={{ marginTop: '100vh' }}>
            <div>
                <Slider {...settings}>
                    {limitedFilteredProduct.map(item => (
                        <div className="carousel-item" key={item._id}>
                            <ProductCarouselItem
                                _id={item._id}
                                slug={item.slug}
                                featureDesktopImage={item.featureDesktopImage}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ProductCarousel;
