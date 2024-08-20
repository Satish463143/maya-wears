import React, { useRef, useState } from 'react';
import './Banner.css';

const Banner = () => {
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
      <div className="desktop_img">
        <video  autoPlay muted loop>
          <source src="../src/assets/images/Rafting.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="mobile_img">
        <video autoPlay muted loop>
          <source src="../src/assets/images/skating.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Controls */}
      {/* <div className="controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? <img src="../src/assets/images/resume.png" />: <img src="../src/assets/images/Play.webp" />}
        </button>
        <button onClick={toggleMuteUnmute}>
          {isMuted ? <img src="../src/assets/images/unmute.png" /> : <img src="../src/assets/images/mute.png" />}
        </button>
      </div> */}
      <div className='banner_content'>
        <h2>This is the main video </h2>
        <p>Welcome to the satish site and Myawears</p>
      </div>
    </div>
  );
};

export default Banner;
