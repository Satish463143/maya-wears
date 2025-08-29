import React, { useMemo } from "react";
import "./Banner.css";
import {  useListForHomeQuery } from "../../api/mainBanner.api";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";

const Banner = React.memo(() => { 

  //calling banner api
  const {data, error, isLoading} = useListForHomeQuery(undefined,{
    refetchOnMountOrArgChange:false,
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    cacheTime: 1000 * 60 * 10,
  })

  // Memoize the banner data to prevent unnecessary re-computations
  const banner = useMemo(() => {
    return data?.result?.data[0];
  }, [data]);

  // Memoize the loading component to prevent re-creation
  const loadingComponent = useMemo(() => (
    <LoadingComponent 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
      }} 
    />
  ), []);

  if(isLoading) {
    return loadingComponent;
  }
 
  return (
    <div className="banner">
      {/* banner video */}
      {banner?.category === "video" && (
        <>
          <div className="desktop_img">
            <video autoPlay muted loop loading="lazy"  preload="metadata">
              <source src={banner.desktopVideo} />
            </video>
          </div>
          <div className="mobile_img">
            <video autoPlay muted loop loading="lazy"  preload="metadata">
              <source src={banner.mobileVideo} />
            </video>
          </div>
        </>
      )}
      {/* banner image */}
      {banner?.category === "image" && (
        <>
          <div className="desktop_img">
            <img src={banner.desktopImage} alt={banner.desktopImage} loading="lazy"  preload="metadata"/>
          </div>
          <div className="mobile_img">
            <img src={banner.mobileImage} alt={banner.mobileImage} loading="lazy"  preload="metadata"/>
          </div>
        </>
      )}
      {/* banner content */}
      <div className="banner_content">
        <h2 className="font-bold">{banner?.title} </h2>
        <p>{banner?.content}</p>
        <a href={banner?.link}><button>{banner?.button}</button></a>  
      </div>
    </div>
  );
});



export default Banner;
