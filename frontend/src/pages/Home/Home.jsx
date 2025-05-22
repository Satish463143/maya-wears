import React from "react";
import "./Home.css";
import Banner from "../../Components/Banner/Banner";
import BestSellingItem from "../../Components/BestSellingItem/BestSellingItem";
import Faq from "../../Components/Faq/Faq";
import Collection from "../../Components/Collection/Collection";
import CustomerGallery from "../../Components/CustomerGallery/CustomerGallery";
import FInalSlider from "../../Components/FInalSlider/FInalSlider";
import ActiveBanner from "../../Components/ActiveBanner/ActiveBanner";

const Home = () => {
  return (
    <div>
      <Banner />   
      <FInalSlider/>        
      <ActiveBanner/>
      <Collection />
      <BestSellingItem />
      <CustomerGallery />
      <Faq />
    </div>
  );
};

export default Home;
