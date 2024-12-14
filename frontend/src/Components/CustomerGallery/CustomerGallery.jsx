import React, { useState } from "react";
import "./CustomerGallery.css";

// Import images
import one from "../../assets/images/one.png";
import two from "../../assets/images/two.png";
import three from "../../assets/images/three.jpg";
import four from "../../assets/images/four.jpg";
import five from "../../assets/images/five.jpg";
import six from "../../assets/images/six.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CustomerGallery() {
  const images = [one, two, three, four, five, six];
  const settings = {
    infinite: true, // Infinite scrolling
    speed: 500, // Animation speed
    slidesToShow: 1, // Show 4 elements at a time
    slidesToScroll: 1, 
    autoPlay:true,// Scroll one element at a time
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="div_container galleryyy">
      {/* Slider Header */}
      <div className="slider__name">
        <h1>#MayaNaiMaya</h1>
        <p className="share__text">Share your style with Maya</p>
        <p className="add__photo__text">Add your Photo</p>
      </div>

      <Slider {...settings}>
        {images.map((item, index)=>(
          <img key={index} src={item} alt="" />
        ))}
      </Slider>

     

    </div>
  );
}

// Custom Next Arrow
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
      <div
          className={className}
          style={{
              ...style,
              display: "block",
              // background: "#5BCEFA",
              borderRadius: "50%",
              border:'1px solid var(--pri_text)',
              right:'-20px',
              width:'30px',
              height:'30px',
              color:'var(--pri_text)',
              display:'flex',
              justifyContent:'center',
              alignItems:'center'
          }}
          onClick={onClick}
      />
  );
};

// Custom Previous Arrow
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
          ...style,
          display: "block",
          // background: "#5BCEFA",
          borderRadius: "50%",
          width:'30px',
          left:'-20px',
          border:'1px solid var(--pri_text)',
          height:'30px',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          zIndex:'99'        
      }}
      onClick={onClick}
    />
  );
};

export default CustomerGallery;
