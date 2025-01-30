import React from "react";
import { Link } from "react-router-dom";
import { useListForHomeQuery } from "../../api/collection.api";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";
import "./Collection.css";
import line_svg from "../../assets/images/headline-curve.svg";

const Collection = () => {
  const { data, error, isLoading } = useListForHomeQuery(null);
  if (isLoading){
    return <LoadingComponent
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        backgroundColor: '#f9f9f9',
      }}
     />
  } ;
  const collections = data?.result?.data || [];
  //only 3 collection will appear in home page
  const sortedCollection = collections.slice(0,3)

  return (
    <div className="container collectonssss">
      <div className="collections">
        <div className="best__of__">
          <h1>Explore our Collection</h1>
          <img src={line_svg} alt="" srcSet="" />
        </div>

        <div className="collection_grid">
          {sortedCollection.map((item, index) => (
            <div key={index} className="collection_box">
              <Link to={`/collection/${item.slug}/${item._id}`}>
                <div className="collection_box_img">
                  <img src={item.image} alt="" />
                  <div className="collection_box_img_overlay"></div>
                  <div className="collection_box_content">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <button>Explore {item.name}</button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
