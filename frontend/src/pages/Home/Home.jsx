import React, { useEffect } from 'react'
import './Home.css'
import Banner from '../../Components/Banner/Banner'
import BestSellingItem from '../../Components/BestSellingItem/BestSellingItem'
import DownBannerItem from '../../Components/DownBannerItem/DownBannerItem'
import HotSellingItem from '../../Components/hotSellingItem/hotSellingItem'
import Down_2_Banner from '../../Components/Down_2_Banner/Down_2_Banner'
import Down_3_Banner from '../../Components/Down_3_Banner/Down_3_Banner'
import GoogleReview from '../../Components/GoogleReview/GoogleReview'

const Home = () => {
  const adjustContainerWidth = () => {
    document.querySelectorAll('.container').forEach(element => {
      if (window.innerWidth > 1400) {
        element.style.maxWidth = '1400px';
      }else{
        element.style.maxWidth = '90%';
      }
      });
    };
    useEffect(()=>{
      window.addEventListener('resize',adjustContainerWidth);
      adjustContainerWidth();
      return()=>{
       window.removeEventListener('resize',adjustContainerWidth)
      }
    })
  return (
    <div>
        <Banner/>
        <BestSellingItem/>
        <DownBannerItem/>
        <HotSellingItem/>
        <Down_2_Banner/>
        <Down_3_Banner/>
        <GoogleReview/>
    </div>
  )
}

export default Home