import React, {useState} from "react";
import "./GalleryPage.css";
import product_banner from '../../assets/images/desktopImage_4_banner.jpg'
import product_banner_mobile from '../../assets/images/mobileImage_4.jpg'
import CommonBanner from "../../Middlewares/CommonBanner/CommonBanner";
import { useListAllGalleryQuery } from "../../api/gallery.api.js";
import LoadingComponent from "../../Middlewares/Loading/Loading.component.jsx";

const  GalleryPage=()=> {
  
  const [visibleCount, setVisibleCount] = useState(15);
  const {data,error,isLoading} = useListAllGalleryQuery({})

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
  
  const loadMore = () => {
      setVisibleCount(prevCount => prevCount + 10); // Load 9 more each time
  };

  return (
    <>
      <CommonBanner  product_banner={product_banner} product_banner_mobile={product_banner_mobile} title="Gallery"  />
      
      <div className="img_containor">
        {galleries.slice(0, visibleCount).map((item, index) => (
            <a href={item} target="_blank">
              <img src={item} key={index} alt="" />
            </a>
        ))}
        
      </div>
      
      {visibleCount < galleries.length && (
        <div className='load_more_btn' onClick={loadMore}>
          <button>See more images</button>            
        </div>
      )}

    </>
  );
}

export default GalleryPage;
