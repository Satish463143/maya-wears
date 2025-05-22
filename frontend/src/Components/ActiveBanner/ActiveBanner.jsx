import React from 'react'
import { useListForHomeQuery } from '../../api/banners.api'
import LoadingComponent from '../../Middlewares/Loading/Loading.component'

const ActiveBanner = () => {
    const {data,error, isLoading} = useListForHomeQuery(undefined,{
      refetchOnMountOrArgChange:false,
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      cacheTime: 1000 * 60 * 10,
    })
    const banners = data?.result?.data || []
    if(isLoading) {
        return <LoadingComponent
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f9f9f9',
        }}
        />
    }

    return (
        <>
          {banners.length > 0 && 
            banners.map((item, index) => (
              <div className="banner" key={index} style={{marginBottom:'8px'}}>
                {item?.category === "video" && (
                  <>
                    <div className="desktop_img">
                      <video autoPlay muted loop loading="lazy">
                        <source src={item?.desktopVideo} type="video/mp4" />
                      </video>
                    </div>
                    <div className="mobile_img">
                      <video autoPlay muted loop loading="lazy">
                        <source src={item?.mobileVideo} type="video/mp4" />
                      </video>
                    </div>
                  </>
                )}
                {item?.category === "image" && (
                  <>
                    <div className="desktop_img">
                      <img src={item?.desktopImage} alt={item?.desktopImage} loading="lazy" />
                    </div>
                    <div className="mobile_img">
                      <img src={item?.mobileImage} alt={item?.mobileImage} loading="lazy" />
                    </div>
                  </>
                )}
                <div className="banner_content">
                  <h2>{item?.title}</h2>
                  <p>{item?.content}</p>
                  <a href={item?.link}><button>{item?.button}</button></a>                  
                </div>
              </div>
            ))
          }
        </>
      );
      
}

export default ActiveBanner