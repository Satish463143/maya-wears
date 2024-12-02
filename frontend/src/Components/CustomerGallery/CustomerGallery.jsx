import React from "react";
import "./CustomerGallery.css"; 

import image1 from "../../assets/images/img-1.jpeg";

function CustomerGallery() {
  return (
    <div className="div_container galleryyy">
      <div className="slider__name">
        <h1>#MayaNaiMaya</h1>
        <p className="share__text">Share your style with Maya</p>
        <p className="add__photo__text"> Add you Photo</p>
      </div>
      <div className="image__slider__main">
        <slider className="image__slider">
          <div className="img__1">
            <img src={image1} alt="" />
          </div>
        </slider>
      </div>
    </div>
  );
}
export default CustomerGallery;
