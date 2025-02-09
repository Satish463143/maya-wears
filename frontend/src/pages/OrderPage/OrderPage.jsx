import React from 'react'
import PlaceOrder from '../../Components/PlaceOrder/PlaceOrder'
import product_banner from '../../assets/images/desktopImage_4_banner.jpg'
import product_banner_mobile from '../../assets/images/mobileImage_4.jpg'
import CommonBanner from "../../Middlewares/CommonBanner/CommonBanner";

const OrderPage = () => {
  return (
    <div>
        <CommonBanner  product_banner={product_banner} product_banner_mobile={product_banner_mobile} title="Place Order"  />
        <PlaceOrder/>
    </div>
  )
}

export default OrderPage