import React, { useRef, useEffect, useLayoutEffect } from "react";
import "./ProductSliders3.css"; // Ensure this does not conflict with Flickity styles
import { useListForHomeQuery } from "../../api/product.api";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";
import Flickity from "flickity";
import "flickity/css/flickity.css"; // Ensure Flickity CSS is loaded
import { Link } from "react-router-dom";

const ProductSliders3 = () => {
  const { data, isLoading } = useListForHomeQuery(null);

  // Reference to the carousel element
  const carouselRef = useRef(null);

  useLayoutEffect(() => {
    // Only initialize Flickity if the carouselRef is populated
    if (carouselRef.current) {
      const flkty = new Flickity(carouselRef.current, {
        wrapAround: true,
        contain: true,
      });

      return () => {
        // Clean up Flickity instance
        if (flkty) {
          flkty.destroy();
        }
      };
    }
  }); // Empty dependency array ensures this runs once when the component mounts

  // Handle loading state early
  if (isLoading) return <LoadingComponent />;

  // Safely access product data
  const product = data?.result?.data || [];
  const filteredProduct = product.filter((item) => item.isFeatured);
  const limitedFilteredProduct = filteredProduct.slice(0, 10);

  return (
    <div className="div_container_slider">
      <div className="carousel" ref={carouselRef} data-flickity='{ "wrapAround":true }'>
        {limitedFilteredProduct.map((item, index) => (
          <div className="carousel-cell second_car_data" key={index}>
            <Link to={`product/${item.slug}/${item._id}`}>
              <img  className="featured_desktop"  src={item.featureDesktopImage} alt={`Product ${index}`} />
              <img
                className="featured_mobile"
                src={item.featureMobileImage}
                alt={`Product ${index}`}
              />
              <div className="second_car_data">
                <h2>Made for MAYALUSS</h2>
                <p>Crafting Creative</p>
                <button>Buy Now</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSliders3;
