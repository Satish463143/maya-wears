import React, {  useEffect, useState } from "react";
import "./Banner.css";
import collectionSvc from "../CMS/Collection/Collection.service";

const Banner = () => {
  const [bannerData, setBannerData] = useState();

  const getAllBanner = async () => {
    try {
      const response = await collectionSvc.getRequest("/banner_1/list");
      setBannerData(response.result.data[0]);
    } catch (exception) {
      console.log(exception);
    }
  };

  useEffect(() => {
    getAllBanner();
  }, []);

  return (
    <div className="banner">
      {bannerData?.category === "video" && (
        <>
          <div className="desktop_img">
            <video autoPlay muted loop>
              <source src={bannerData?.desktopVideo} />
            </video>
          </div>
          <div className="mobile_img">
            <video autoPlay muted loop>
              <source src={bannerData?.mobileVideo} />
            </video>
          </div>
        </>
      )}
      {bannerData?.category === "image" && (
        <>
          <div className="desktop_img">
            <img src={bannerData?.desktopImage} alt="" />
          </div>
          <div className="mobile_img">
            <img src={bannerData?.mobileImage} alt="" />
          </div>
        </>
      )}

      <div className="banner_content">
        <h2>{bannerData?.title} </h2>
        <p>{bannerData?.content}</p>
        <button>Buy Now</button>
      </div>
    </div>
  );
};

export default Banner;
