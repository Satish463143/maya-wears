import React from 'react'
import {  useListForHomeQuery } from '../../api/collection.api';
import LoadingComponent from '../../Middlewares/Loading/Loading.component';
import './AllCollection.css'
import { Link } from 'react-router-dom';
import line_svg from "../../assets/images/headline-curve.svg";

const AllCollection = () => {
  const { data, error, isLoading } = useListForHomeQuery(null);
  if (isLoading) {
    return (
      <LoadingComponent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          backgroundColor: "#f9f9f9",
        }}
       />
      );
    }
    const collections = data?.result?.data;
  return (
    <div className="container">
        <div className="best__of__">
          <h1>Explore our Collections</h1>
          <img src={line_svg} alt="" srcSet="" />
        </div>
        <div className='allcollection_grid'>
            {collections.map((item, index)=> (
              <Link to={`/collection/${item.slug}/${item._id}`}>
                <div className='allcollection_item'>
                    {item?.category === "video" && (
                      <>
                        <div className="desktop_img">
                          <video autoPlay muted loop>
                            <source src={item?.desktopVideo} />
                          </video>
                        </div>
                        <div className="mobile_img">
                          <video autoPlay muted loop>
                            <source src={item?.mobileVideo} />
                          </video>
                        </div>
                      </>
                    )}
                    {item?.category === "image" && (
                      <>
                        <div className="desktop_img">
                          <img src={item?.desktopImage} alt="" />
                        </div>
                        <div className="mobile_img">
                          <img src={item?.mobileImage} alt="" />
                        </div>
                      </>
                    )} 
                  <div className='collection_content'>
                      <h1>{item.name}</h1>
                      <h3>{item.description}</h3>  
                      <div className='collection_content_button' >View Products</div>
                  </div>                     
                </div> 
              </Link> 
            ))}  
        </div>
    </div>
  );
};

export default AllCollection;
