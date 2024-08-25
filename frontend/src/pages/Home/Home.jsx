import React, { useEffect } from 'react'
import './Home.css'
import Banner from '../../Components/Banner/Banner'
import BestSellingItem from '../../Components/BestSellingItem/BestSellingItem'
import DownBannerItem from '../../Components/DownBannerItem/DownBannerItem'
import Down_2_Banner from '../../Components/Down_2_Banner/Down_2_Banner'
import Down_3_Banner from '../../Components/Down_3_Banner/Down_3_Banner'
import GoogleReview from '../../Components/GoogleReview/GoogleReview'
import ProductSlides from '../../Components/ProductSlides/ProductSlides'
import Faq from '../../Components/Faq/Faq'

const Home = () => {
  
  return (
    <div>
        <Banner/>
        <ProductSlides/>        
        <DownBannerItem/>
        <BestSellingItem/>
        <Down_2_Banner/>
        <Down_3_Banner/>
        <GoogleReview/>  
        <Faq/>
    </div>
  )
}

export default Home