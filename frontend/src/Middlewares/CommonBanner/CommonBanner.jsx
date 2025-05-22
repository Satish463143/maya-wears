import React from 'react'
import './CommonBanner.css'

const CommonBanner = ({product_banner,product_banner_mobile,title,subtitle}) => {
  return (
    <div className='product_banner'>
        <div >
            <div className="product_desktop_img">
                <img src={product_banner} alt={product_banner} loading='lazy'/>  
                <div className='img_overlay'></div>         
            </div>
            <div className="product_mobile_img">
                <img src={product_banner_mobile} alt={product_banner_mobile} loading='lazy'/>  
                <div className='img_overlay'></div>           
            </div>
            <div className='product_banner_content'>
                <h2>{title} </h2>
                <p>{subtitle}</p>
            </div>
        </div>
    </div>
  )
}

export default CommonBanner