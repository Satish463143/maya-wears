import React, {useState} from "react";
import "./GalleryPage.css";
import GalleryBanner from "../../Components/GalleryBanner/GalleryBanner.jsx";
import { useListAllGalleryQuery } from "../../api/gallery.api.js";
import LoadingComponent from "../../Middlewares/Loading/Loading.component.jsx";

const  GalleryPage=()=> {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); 
  const {data,error,isLoading} = useListAllGalleryQuery({page, limit,})

  console.log("API response:", data);
    if(isLoading){
        return <LoadingComponent/>
    }
    const galleries = data?.result?.allImages || [];
  return (
    <>
      <GalleryBanner  />
      <div className="img_containor">
        {galleries.map((item, index)=>(
          <a href={item} target="_blank">
            <img src={item} key={index} alt="" />
          </a>
        ))}
      </div>
    </>
  );
}

export default GalleryPage;
