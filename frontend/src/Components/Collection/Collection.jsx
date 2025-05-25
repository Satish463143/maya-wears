import React, { memo, useMemo, useCallback, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useListForHomeQuery } from "../../api/collection.api";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";
import { createOptimizedIntersectionObserver, prefersReducedMotion } from "../../utils/performance";
import "./Collection.css";
import line_svg from "../../assets/images/headline-curve.svg";

// Memoized CollectionItem component for better performance
const CollectionItem = memo(({ item, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const itemRef = useRef(null);
  const reducedMotion = prefersReducedMotion();

  // Optimized Intersection Observer for lazy loading
  useEffect(() => {
    const observer = createOptimizedIntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMediaLoad = useCallback(() => {
    setMediaLoaded(true);
  }, []);

  const handleMediaError = useCallback((e) => {
    // Media failed to load - error handled silently
  }, []);

  const mediaStyle = useMemo(() => ({
    opacity: mediaLoaded ? 1 : 0,
    transition: reducedMotion ? 'none' : 'opacity 0.3s ease'
  }), [mediaLoaded, reducedMotion]);

  return (
    <div ref={itemRef} className="collection_box" key={item._id || index}>
      <Link to={`/collection/${item.slug}/${item._id}`}>
        <div className="collection_box_img">
          {isVisible && (
            <>
              {item?.category === "video" && (
                <>
                  <div className="desktop_img">
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      preload="metadata"
                      onLoadedData={handleMediaLoad}
                      onError={handleMediaError}
                      style={mediaStyle}
                    >
                      <source src={item?.desktopVideo} type="video/mp4" />
                    </video>
                  </div>
                  <div className="mobile_img">
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      preload="metadata"
                      onLoadedData={handleMediaLoad}
                      onError={handleMediaError}
                      style={mediaStyle}
                    >
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
                      alt={item?.name || 'Collection image'} 
                      loading="lazy"
                      decoding="async"
                      onLoad={handleMediaLoad}
                      onError={handleMediaError}
                      style={mediaStyle}
                    />
                  </div>
                  <div className="mobile_img">
                    <img 
                      src={item?.mobileImage} 
                      alt={item?.name || 'Collection mobile image'} 
                      loading="lazy"
                      decoding="async"
                      onLoad={handleMediaLoad}
                      onError={handleMediaError}
                      style={mediaStyle}
                    />
                  </div>
                </>
              )}
            </>
          )}

          <div className="collection_box_img_overlay"></div>

          <div className="collection_box_content">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <button type="button">Explore {item.name}</button>
          </div>
        </div>
      </Link>
    </div>
  );
});

CollectionItem.displayName = 'CollectionItem';

const Collection = memo(() => {
  // Optimized query with better caching
  const { data, error, isLoading } = useListForHomeQuery(undefined, {
    refetchOnMountOrArgChange: false,
    staleTime: 1000 * 60 * 10, // Data stays fresh for 10 minutes
    cacheTime: 1000 * 60 * 30, // Cache for 30 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Memoize the sorted collection to avoid recalculation on every render
  const sortedCollection = useMemo(() => {
    const collections = data?.result?.data || [];
    return collections.slice(0, 3);
  }, [data?.result?.data]);

  // Early return for loading state
  if (isLoading) {
    return (
      <LoadingComponent
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          backgroundColor: '#f9f9f9',
        }}
      />
    );
  }

  // Early return for error state
  if (error) {
    return (
      <div className="collectonssss">
        <div className="collections">
          <div className="best__of__">
            <h1>Unable to load collections</h1>
            <p>Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="collectonssss">
      <div className="collections">
        <div className="best__of__">
          <h1>Explore our Collection</h1>
          <img 
            src={line_svg} 
            alt="Decorative line" 
            loading="lazy"
            decoding="async"
            width="auto"
            height="auto"
          />
        </div>

        <div className="collection_grid">
          {sortedCollection.map((item, index) => (
            <CollectionItem 
              key={item._id || `collection-${index}`} 
              item={item} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </div>
  );
});

Collection.displayName = 'Collection';

export default Collection;
