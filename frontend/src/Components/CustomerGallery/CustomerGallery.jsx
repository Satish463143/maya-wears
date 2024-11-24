import React from "react";
import Slider from "react-slick";
import "./CustomerGallery.css"; 

import image1 from "../../assets/images/img-1.jpeg";
import image2 from "../../assets/images/img-2.jpeg";
import image3 from "../../assets/images/img-3.jpeg";
import image4 from "../../assets/images/img-4.jpeg";

function CustomerGallery() {
  return (
    <div className="div_container">
      <div className="slider__name">
        <h1>#MayaNaiMaya</h1>
        <p className="share__text">Share your style with Maya</p>
        <p className="add__photo__text"> Add you Photo</p>
      </div>
      <div className="image__slider__main">
        <Slider className="image__slider">
          <div className="img__1">
            <img src={image1} alt="" />
          </div>
          <div className="img__">
            <img src={image2} alt="" />
          </div>
          <div className="img__">
            <img src={image3} alt="" />
          </div>
          <div className="img__">
            <img src={image4} alt="" />
          </div>
        </Slider>
      </div>
    </div>
  );
}
export default CustomerGallery;
