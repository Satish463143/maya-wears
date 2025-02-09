import React from "react";
import "./AllProductPage.css";
import AllProducts from "../../Components/AllProducts/AllProducts";
import product_banner from '../../assets/images/desktopImage_4_banner.jpg'
import product_banner_mobile from '../../assets/images/mobileImage_4.jpg'
import CommonBanner from "../../Middlewares/CommonBanner/CommonBanner";
const AllProductPage = () => {
  return (
    <div>
      <CommonBanner  product_banner={product_banner} product_banner_mobile={product_banner_mobile} title="Discover Quality, Style, and Value" subtitle="All in One Place!"  />      
      <AllProducts />
    </div>
  );
};

export default AllProductPage;
