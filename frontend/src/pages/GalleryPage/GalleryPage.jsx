import React, {useState} from "react";
import "./GalleryPage.css";
import GalleryBanner from "../../Components/GalleryBanner/GalleryBanner.jsx";
import { useListAllGalleryQuery } from "../../api/gallery.api.js";
import LoadingComponent from "../../Middlewares/Loading/Loading.component.jsx";

const  GalleryPage=()=> {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); 
  const [visibleCount, setVisibleCount] = useState(15);
  const {data,error,isLoading} = useListAllGalleryQuery({page, limit,})

    if(isLoading){
        return <LoadingComponent
          
        />
    }
  const galleries = data?.result?.allImages || [];
  
  const loadMore = () => {
      setVisibleCount(prevCount => prevCount + 10); // Load 9 more each time
  };

  return (
    <>
      <GalleryBanner  />
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
