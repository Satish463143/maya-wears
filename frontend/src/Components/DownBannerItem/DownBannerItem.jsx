import React, { useContext, useState, useEffect } from 'react';
import './DownBannerItem.css';
import { StoreContext } from '../../context/StoreContext';

const DownBannerItem = () => {
  const { DownBannerContent } = useContext(StoreContext);
  const downBannerData = DownBannerContent?.[0] || {};

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const stickyDiv = document.getElementById('stickyDiv');
      if (stickyDiv) {
        const stickyOffset = stickyDiv.offsetTop;

        if (window.scrollY > stickyOffset) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="stickyDiv" className={`down_banner div_container sticky-div ${isSticky ? 'sticky' : ''}`}>
      <div data-aos="fade-up">
        {downBannerData.category === "Video" && (
          <>
            <div className="down_desktop_img">
              <video autoPlay muted loop>
                <source src={downBannerData.desktopVideo} type="video/mp4" />
              </video>
            </div>
            <div className="down_mobile_img">
              <video autoPlay muted loop>
                <source src={downBannerData.mobileVideo} type="video/mp4" />
              </video>
            </div>
          </>
        )}
        {downBannerData.category === "Image" && (
          <>
            <div className="down_desktop_img">
              <img src={downBannerData.desktopImage} alt="Desktop view" />
            </div>
            <div className="down_mobile_img">
              <img src={downBannerData.mobileImage} alt="Mobile view" />
            </div>
          </>
        )}
        <div className='down_banner_content'>
          <h2>{downBannerData.title || "Default Title"}</h2>
          <p>{downBannerData.content || "Default Content"}</p>
        </div>
      </div>
    </div>
  );
};

export default DownBannerItem;
