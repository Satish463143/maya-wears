import React, { useContext, useRef, useState } from 'react';
import './Banner.css';
import { StoreContext } from '../../context/StoreContext';

const Banner = () => {
  const {BannerContent} = useContext(StoreContext);
  const bannerData = BannerContent[0];
  // const videoRefDesktop = useRef(null);
  // const videoRefMobile = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(true);
  // const [isMuted, setIsMuted] = useState(true);

  // // Toggle play/pause functionality
  // const togglePlayPause = () => {
  //   if (isPlaying) {
  //     videoRefDesktop.current.pause();
  //     videoRefMobile.current.pause();
  //   } else {
  //     videoRefDesktop.current.play();
  //     videoRefMobile.current.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };

  // // Toggle mute/unmute functionality
  // const toggleMuteUnmute = () => {
  //   const isCurrentlyMuted = videoRefDesktop.current.muted;
  //   videoRefDesktop.current.muted = !isCurrentlyMuted;
  //   videoRefMobile.current.muted = !isCurrentlyMuted;
  //   setIsMuted(!isCurrentlyMuted);
  // };

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
