import React,{useRef, useLayoutEffect} from 'react'
import { useListForHomeQuery } from '../../api/featuredProduct.api'
import Flickity from "flickity";
import "flickity/css/flickity.css";
import LoadingComponent from '../../Middlewares/Loading/Loading.component';
import './FInalSlider.css'
import { Link } from 'react-router-dom';

const FInalSlider = () => {
    const carouselRef = useRef(null);
    const { data, error, isLoading } = useListForHomeQuery();   
    
    const product = data?.result?.data || [];


 useLayoutEffect(() => {
    if (carouselRef.current) {
      const flkty = new Flickity(carouselRef.current, {
        wrapAround: true,
        contain: true,
      });

    //   return () => {
    //     // Clean up Flickity instance
    //     if (flkty) {
    //       flkty.destroy();
    //     }
    //   };
    }
  });
  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div>
        <div class="carousel" ref={carouselRef} data-flickity='{ "wrapAround": true }'>
            {product.length > 0 ? (
                product.map((item, index) => (
                    <div class="carousel-cell" key={index}>  
                        <Link to={item.link}>                      
                            <div className="slider_details">                            
                                <img className='desktopImage' src={item.desktopImage} alt="" />
                                <img className='mobileImage' src={item.mobileImage} alt="" />
                                <div className="slider_details_content">
                                    <h3>{item.title}</h3>
                                    <p>{item.subTitle}</p>
                                    <button>Shop now</button>
                                </div>
                            </div>
                        </Link> 
                    </div>
                ))
                ) : (
                <p></p>
            )}            
        </div>
    </div>
    
  )
}

export default FInalSlider