import React,{useEffect,useState} from 'react'
import collectionSvc from '../CMS/Collection/Collection.service';
const Down_2_Banner = () => {
    
    const [bannerData, setBannerData] =useState()
  
  const getAllBanner = async()=>{
    try{
      const response = await collectionSvc.getRequest('/banner_3/list')
      setBannerData(response.result.data[0])

    }catch(exception){
      console.log(exception)
    }
  }


  useEffect(()=>{
    getAllBanner()
  },[])
    return (
      <div className='down_banner div_container'>
        <div data-aos="fade-up">
        {bannerData?.category === "video" && (
          <>
              <div className="down_desktop_img">
              <video  autoPlay muted loop>
                <source src={bannerData?.desktopVideo} type="video/mp4" />
              </video>
            </div>
            <div className="down_mobile_img">
              <video autoPlay muted loop>
                <source src={bannerData?.mobielVideo} type="video/mp4" />
              </video>
            </div>
          </>
        ) }
        {bannerData?.category === "image" && (
          <>
            <div className="down_desktop_img">
                <img src={bannerData?.desktopImage} alt="" />            
            </div>
            <div className="down_mobile_img">
              <img src={bannerData?.mobileImage} alt="" />             
            </div>
          </>
        ) }
        <div className='down_banner_content'>
          <h2>{bannerData?.title} </h2>
          <p>{bannerData?.content}</p>
        </div>
        </div>
      </div>
    )
  }

export default Down_2_Banner