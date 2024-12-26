import React from "react";
import image1 from "../../assets/images/image2.png";
import image2 from "../../assets/images/image3.png";
import image3 from "../../assets/images/image4.png";
import image4 from "../../assets/images/image5.png";
import image5 from "../../assets/images/image6.png";
import image6 from "../../assets/images/six.jpg";
import image7 from "../../assets/images/two.png";
import image8 from "../../assets/images/img-1.jpeg";
import image9 from "../../assets/images/img-2.jpeg";
import image10 from "../../assets/images/img-3.jpeg";
import image11 from "../../assets/images/img-4.jpeg";
import image12 from "../../assets/images/img-1.jpeg";
import image13 from "../../assets/images/one.png";
import image14 from "../../assets/images/three.jpg";
import image15 from "../../assets/images/vest.png";
import "./GalleryPage.css";
import GalleryBanner from "../../Components/GalleryBanner/GalleryBanner.jsx";

function GalleryPage() {
  return (
    <>
      <GalleryBanner  />
      <div className="img_containor">
        <img src={image1} alt="" />
        <img src={image2} alt="" />
        <img src={image3} alt="" />
        <img src={image4} alt="" />
        <img src={image5} alt="" />
        <img src={image6} alt="" />
        <img src={image7} alt="" />
        <img src={image8} alt="" />
        <img src={image9} alt="" />
        <img src={image10} alt="" />
        <img src={image11} alt="" />
        <img src={image12} alt="" />
        <img src={image13} alt="" />
        <img src={image14} alt="" />
        <img src={image15} alt="" />
      </div>
    </>
  );
}

export default GalleryPage;
