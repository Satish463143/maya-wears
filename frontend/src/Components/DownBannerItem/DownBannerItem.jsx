import React, {  useState, useEffect } from 'react';
import './DownBannerItem.css';
import collectionSvc from '../CMS/Collection/Collection.service';

const DownBannerItem = () => {

  const [isSticky, setIsSticky] = useState(false);
  const [bannerData, setBannerData] =useState()
  
  const getAllBanner = async()=>{
    try{
      const response = await collectionSvc.getRequest('/banner_2/list')
      setBannerData(response.result.data[0])

    }catch(exception){
      console.log(exception)
    }
  }


  useEffect(()=>{
    getAllBanner()
  },[])
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
        {bannerData?.category === "video" && (
          <>
            <div className="down_desktop_img">
              <video autoPlay muted loop>
                <source src={bannerData?.desktopVideo} type="video/mp4" />
              </video>
            </div>
            <div className="down_mobile_img">
              <video autoPlay muted loop>
                <source src={bannerData?.mobileVideo} type="video/mp4" />
              </video>
            </div>
          </>
        )}
        {bannerData?.category === "image" && (
          <>
            <div className="down_desktop_img">
              <img src={bannerData?.desktopImage} alt="Desktop view" />
            </div>
            <div className="down_mobile_img">
              <img src={bannerData?.mobileImage} alt="Mobile view" />
            </div>
          </>
        )}
        <div className='down_banner_content'>
          <h2>{bannerData?.title }</h2>
          <p>{bannerData?.content }</p>
        </div>
      </div>
    </div>
  );
};

export default DownBannerItem;
