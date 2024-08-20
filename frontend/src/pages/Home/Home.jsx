import React, { useEffect } from 'react'
import './Home.css'
import Banner from '../../Components/Banner/Banner'
import BestSellingItem from '../../Components/BestSellingItem/BestSellingItem'

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
    </div>
  )
}

export default Home