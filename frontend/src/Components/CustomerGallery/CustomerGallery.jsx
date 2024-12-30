import React, { useState } from "react";
import "./CustomerGallery.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useListAllGalleryQuery } from "../../api/gallery.api";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";

function CustomerGallery() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); 
  const {data,error,isLoading} = useListAllGalleryQuery({page, limit,})

  console.log("API response:", data);
    if(isLoading){
        return <LoadingComponent/>
    }
    const galleries = data?.result?.allImages || [];


  return (
    <div className="div_container galleryyy">
      <div className="slider__name">
        <h1>#MayaNaiMaya</h1>
        <p className="share__text">Share your style with Maya</p>
      </div>
      <div className="cus__gallery">
        {galleries.map((item, index) => (
          <img key={index} src={item} alt="" />
        ))}
      </div>
    </div>
  );
}

export default CustomerGallery;
