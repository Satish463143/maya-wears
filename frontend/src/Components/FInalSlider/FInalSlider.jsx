import React from "react";
import Slider from "react-slick";
import { useListForHomeQuery } from "../../api/featuredProduct.api";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FInalSlider.css";

// Custom arrow components
const NextArrow = ({ onClick }) => (
  <div className="slick-arrow slick-next" onClick={onClick}>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="slick-arrow slick-prev" onClick={onClick}>
  </div>
);

const FInalSlider = () => {
  const { data, isLoading } = useListForHomeQuery(undefined,{
    refetchOnMountOrArgChange:false,
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    cacheTime: 1000 * 60 * 10,
  });
  const product = data?.result?.data || [];

  const settings = {
    dots: false, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 1, 
    slidesToScroll: 1, // Number of slides to scroll
    centerMode: true, // Center the active slide
    centerPadding: "10%", // Adjust padding to create the 10% - 80% - 10% layout
    adaptiveHeight: true, // Adjust height dynamically based on content
    nextArrow: <NextArrow />, // Custom right arrow
    prevArrow: <PrevArrow />, // Custom left arrow
  };

  if (isLoading) {
    return <LoadingComponent
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
      }} 
     />;
  }

  return (
    <div className="slider-container">
      {product.length > 0 ? (
        <Slider {...settings}>
          {product.map((item, index) => (
            <div className="carousel-cell" key={index}>
              <Link to={item.link}>
                <div className="slider-details">
                  <img
                    className="desktopImage"
                    src={item.desktopImage}
                    alt={item.title}
                    loading="lazy"
                  />
                  <img
                    className="mobileImage"
                    src={item.mobileImage}
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className="slider-details-content">
                    <h3>{item.title}</h3>
                    <p>{item.subTitle}</p>
                    <button>Shop now</button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FInalSlider;
