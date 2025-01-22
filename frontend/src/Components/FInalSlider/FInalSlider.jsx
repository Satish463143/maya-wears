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
  const { data, isLoading } = useListForHomeQuery();
  const product = data?.result?.data || [];

  const settings = {
    dots: false, // Enable navigation dots
    infinite: true, // Enable infinite looping
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Number of slides to show
    slidesToScroll: 1, // Number of slides to scroll
    centerMode: true, // Center the active slide
    centerPadding: "10%", // Adjust padding to create the 10% - 80% - 10% layout
    adaptiveHeight: true, // Adjust height dynamically based on content
    nextArrow: <NextArrow />, // Custom right arrow
    prevArrow: <PrevArrow />, // Custom left arrow
  };

  if (isLoading) {
    return <LoadingComponent />;
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
                  />
                  <img
                    className="mobileImage"
                    src={item.mobileImage}
                    alt={item.title}
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
        <p>No products available</p>
      )}
    </div>
  );
};

export default FInalSlider;
