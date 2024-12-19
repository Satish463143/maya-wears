import React, { useState } from "react";
import "./CustomerGallery.css";

// Import images
import one from "../../assets/images/image2.png";
import two from "../../assets/images/image3.png";
import three from "../../assets/images/image4.png";
import four from "../../assets/images/image5.png";
import five from "../../assets/images/image6.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CustomerGallery() {
  const images = [one, two, three, four, five];

  return (
    <div className="div_container galleryyy">
      {/* Slider Header */}
      <div className="slider__name">
        <h1>#MayaNaiMaya</h1>
        <p className="share__text">Share your style with Maya</p>
        <p className="add__photo__text">Add your Photo</p>
      </div>
      <div className="cus__gallery">
        {images.map((item, index) => (
          <img key={index} src={item} alt="" />
        ))}
      </div>
    </div>
  );
}

export default CustomerGallery;
