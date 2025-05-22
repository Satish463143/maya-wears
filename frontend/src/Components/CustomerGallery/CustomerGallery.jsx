import React, { useState } from "react";
import "./CustomerGallery.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";
import { useListAllGalleryQuery } from "../../api/customergallery.api";

function CustomerGallery() {
  
  const {data,error,isLoading} = useListAllGalleryQuery({}, { 
    refetchOnMountOrArgChange: false, 
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 10 
  })


  if(isLoading){
      return <LoadingComponent
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        backgroundColor: '#f9f9f9',
      }}
      />
  }
  const galleries = data?.result?.allImages || [];
  // const sortedGallery = galleries.slice(0,10)
  return (
    <div className="container galleryyy">
      <div className="slider__name">
        <h1>#MayaNaiMaya</h1>
        <p className="share__text">Share your style with Maya</p>
      </div>
      <div className="cus__gallery">
        {galleries.map((item, index) => (
          <a href={item} key={index} target="_blank"><img  src={item} alt={item.split('/').pop()?.split('?')[0] || 'Maya-wears Image'} loading="lazy"/></a>          
        ))}
      </div>
    </div>
  );
}

export default CustomerGallery;
