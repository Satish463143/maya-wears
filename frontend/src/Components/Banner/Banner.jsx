import React, { useContext, useEffect, useRef, useState } from 'react';
import './Banner.css';
import { StoreContext } from '../../context/StoreContext';

const Banner = () => {
  const {BannerContent} = useContext(StoreContext);
  const bannerData = BannerContent[0];

  const [bannerData1, setBannerData] =useState()
  const getAllBanner = ()=>{
    const response=[
      {
        _id:"",
        title:"",
        category:"",
        link:"",
        desktopImage:"",
        mobileImage:"",
        desktopVideo:"",
        mobileVideo:""
      }
    ]

    setBannerData(response)
  }


  useEffect(()=>{
    getAllBanner()
  },[])


  return (
    <div className="banner">
      {bannerData?.category === "Video" && (
        <>
            <div className="desktop_img">
            <video  autoPlay muted loop>
              <source src={bannerData?.desktopVideo} type="video/mp4" />
            </video>
          </div>
          <div className="mobile_img">
            <video autoPlay muted loop>
              <source src={bannerData?.mobielVideo} type="video/mp4" />
            </video>
          </div>
        </>
      ) }
      {bannerData?.category === "Image" && (
        <>
          <div className="desktop_img">
              <img src={bannerData?.desktopImage} alt="" />            
          </div>
          <div className="mobile_img">
            <img src={bannerData?.mobileImage} alt="" />             
          </div>
        </>
      ) }
      

      {/* Controls */}
      {/* <div className="controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? <img src="../src/assets/images/resume.png" />: <img src="../src/assets/images/Play.webp" />}
        </button>
        <button onClick={toggleMuteUnmute}>
          {isMuted ? <img src="../src/assets/images/unmute.png" /> : <img src="../src/assets/images/mute.png" />}
        </button>
      </div> */}
      <div className='banner_content' data-aos="fade-up">
        <h2>{bannerData?.title || "abc"} </h2>
        <p>{bannerData?.content}</p>
      </div>
    </div>
  );
};

export default Banner;
