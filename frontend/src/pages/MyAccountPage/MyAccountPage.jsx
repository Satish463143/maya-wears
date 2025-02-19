import React from 'react'
import MyAccount from '../../Components/MyAccount/MyAccount'
import product_banner from '../../assets/images/desktopImage_4_banner.jpg'
import product_banner_mobile from '../../assets/images/mobileImage_4.jpg'
import CommonBanner from "../../Middlewares/CommonBanner/CommonBanner";

const MyAccountPage = () => {
  return (
    <div>
      <CommonBanner  product_banner={product_banner} product_banner_mobile={product_banner_mobile} title="My Account"  />
      <MyAccount/>      
    </div>
  )
}

export default MyAccountPage