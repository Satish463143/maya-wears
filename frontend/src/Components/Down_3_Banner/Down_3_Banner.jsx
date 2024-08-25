import React,{useContext} from 'react'
import { StoreContext } from '../../context/StoreContext';

const Down_3_Banner = () => {
    const {Down_3_BannerContent} = useContext(StoreContext);
    const downBannerData = Down_3_BannerContent[0];
    return (
      <div className='down_banner div_container' style={{paddingTop:'3px'}}>
        {downBannerData?.category === "Video" && (
          <>
              <div className="down_desktop_img">
              <video  autoPlay muted loop>
                <source src={downBannerData?.desktopVideo} type="video/mp4" />
              </video>
            </div>
            <div className="down_mobile_img">
              <video autoPlay muted loop>
                <source src={downBannerData?.mobielVideo} type="video/mp4" />
              </video>
            </div>
          </>
        ) }
        {downBannerData?.category === "Image" && (
          <>
            <div className="down_desktop_img">
                <img src={downBannerData?.desktopImage} alt="" />            
            </div>
            <div className="down_mobile_img">
              <img src={downBannerData?.mobileImage} alt="" />             
            </div>
          </>
        ) }
        <div className='down_banner_content'>
          <h2>{downBannerData?.title || "abc"} </h2>
          <p>{downBannerData?.content}</p>
        </div>
      </div>
    )
  }

export default Down_3_Banner