import React, { memo } from 'react'
import { useListForHomeQuery } from '../../api/banners.api'
import LoadingComponent from '../../Middlewares/Loading/Loading.component'

const ActiveBanner = memo(() => {
    const {data, error, isLoading} = useListForHomeQuery(undefined, {
      refetchOnMountOrArgChange: false,
      staleTime: 1000 * 60 * 10, // Data stays fresh for 10 minutes
      cacheTime: 1000 * 60 * 20, // Keep in cache for 20 minutes
    });

    if(isLoading) {
        return <LoadingComponent
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: 'transparent',
        }}
        />
    }

    if (error || !data?.result?.data) {
        return null; // Gracefully handle errors
    }

    const banners = data.result.data;

    return (
        <>
          {banners.length > 0 && 
            banners.map((item, index) => (
              <div className="banner" key={item._id || index} style={{marginBottom:'8px'}}>
                {item?.category === "video" && (
                  <>
                    <div className="desktop_img">
                      <video autoPlay muted loop loading="lazy" preload="metadata">
                        <source src={item?.desktopVideo} type="video/mp4" />
                      </video>
                    </div>
                    <div className="mobile_img">
                      <video autoPlay muted loop loading="lazy" preload="metadata">
                        <source src={item?.mobileVideo} type="video/mp4" />
                      </video>
                    </div>
                  </>
                )}
                {item?.category === "image" && (
                  <>
                    <div className="desktop_img">
                      <img 
                        src={item?.desktopImage} 
                        alt={item?.title || "Banner"} 
                        loading="lazy" 
                        decoding="async"
                      />
                    </div>
                    <div className="mobile_img">
                      <img 
                        src={item?.mobileImage} 
                        alt={item?.title || "Banner"} 
                        loading="lazy" 
                        decoding="async"
                      />
                    </div>
                  </>
                )}
                {(item?.title || item?.content || item?.button) && (
                  <div className="banner_content">
                    {item?.title && <h2>{item.title}</h2>}
                    {item?.content && <p>{item.content}</p>}
                    {item?.button && item?.link && (
                      <a href={item.link} rel="noopener noreferrer">
                        <button>{item.button}</button>
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))
          }
        </>
      );
      
});

ActiveBanner.displayName = 'ActiveBanner';

export default ActiveBanner