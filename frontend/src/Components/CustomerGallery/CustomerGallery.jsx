import React, { useState } from "react";
import "./CustomerGallery.css";

// Import images
import one from "../../assets/images/one.png";
import two from "../../assets/images/two.png";
import three from "../../assets/images/three.jpg";
import four from "../../assets/images/four.jpg";
import five from "../../assets/images/five.jpg";
import six from "../../assets/images/six.jpg";

function CustomerGallery() {
  const images = [one, two, three, four, five, six];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handlers for navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="div_container galleryyy">
      {/* Slider Header */}
      <div className="slider__name">
        <h1>#MayaNaiMaya</h1>
        <p className="share__text">Share your style with Maya</p>
        <p className="add__photo__text">Add your Photo</p>
      </div>

      {/* Slider */}
      <div className="image__slider__main">
        <div className="slider">
          <button className="prev" onClick={handlePrev}>
            ❮
          </button>
          <img
            src={images[currentIndex]}
            alt={`slide ${currentIndex + 1}`}
            className="slider-image"
          />
          <button className="next" onClick={handleNext}>
            ❯
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="dots-container">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerGallery;
