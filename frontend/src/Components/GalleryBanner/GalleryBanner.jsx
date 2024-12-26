import React from 'react'
import './GalleryBanner.css'
import gallery_banner from '../../assets/images/desktopImage_4_banner.jpg'
import gallery_banner_mobile from '../../assets/images/mobileImage_4.jpg'

const AllProductBanner = () => {
  return (
    <div className='product_banner'>
        <div >
            <div className="product_desktop_img">
                <img src={gallery_banner} alt="" />  
                 <div className='img_overlay'></div>         
            </div>
            <div className="product_mobile_img">
              <img src={gallery_banner_mobile} alt="" />  
              <div className='img_overlay'></div>           
            </div>
            <div className='product_banner_content'>
                <h2>Gallery </h2>
                {/* <p> All in One Place!</p> */}
            </div>
        </div>
      </div>
  )
}

export default AllProductBanner