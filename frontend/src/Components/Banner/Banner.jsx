import React, {  useEffect, useState } from "react";
import "./Banner.css";
import collectionSvc from "../CMS/Collection/Collection.service";
import { useListAllQuery, useListForHomeQuery } from "../../api/mainBanner.api";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";

const Banner = () => { 

  const {data, error, isLoading} = useListForHomeQuery(undefined,{
    refetchOnMountOrArgChange:false,
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    cacheTime: 1000 * 60 * 10,
  })

  if(isLoading) {
    return <LoadingComponent 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
      }} 
    />
  }
 
  const banner =  data?.result?.data[0]
  
  return (
    <div className="banner">
      {banner.category === "video" && (
        <>
          <div className="desktop_img">
            <video autoPlay muted loop>
              <source src={banner.desktopVideo} />
            </video>
          </div>
          <div className="mobile_img">
            <video autoPlay muted loop>
              <source src={banner.mobileVideo} />
            </video>
          </div>
        </>
      )}
      {banner.category === "image" && (
        <>
          <div className="desktop_img">
            <img src={banner.desktopImage} alt="" />
          </div>
          <div className="mobile_img">
            <img src={banner.mobileImage} alt="" />
          </div>
        </>
      )}
      <div className="banner_content">
        <h2 className="font-bold">{banner.title} </h2>
        <p>{banner.content}</p>
        <a href={banner.link}><button>{banner.button}</button></a>  
      </div>
    </div>
  );
};


export default Banner;
