import React from 'react'
import './AllProductBanner.css'
import product_banner from '../../assets/images/desktopImage_4_banner.jpg'
import product_banner_mobile from '../../assets/images/mobileImage_4.jpg'

const AllProductBanner = () => {
  return (
    <div className='product_banner'>
        <div >
            <div className="product_desktop_img">
                <img src={product_banner} alt="" />  
                 <div className='img_overlay'></div>         
            </div>
            <div className="product_mobile_img">
              <img src={product_banner_mobile} alt="" />  
              <div className='img_overlay'></div>           
            </div>
            <div className='product_banner_content'>
                <h2>Discover Quality, Style, and Value </h2>
                <p> All in One Place!</p>
            </div>
        </div>
      </div>
  )
}

export default AllProductBanner