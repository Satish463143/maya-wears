import React from "react";
import "./ProductItem.css";
import { Link } from "react-router-dom";

const ProductItem = ({ _id, slug, images, title, price }) => {
  return (
    <>
      <Link to={`/product/${slug}/${_id}`}>
        <div className="item_div">
          <div className="img">
            <img src={images} alt="" />            
          </div>
          <div className="produc_content">
            <h2>{title}</h2>           
            <h3>NRP.{price}.00</h3>           
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductItem;
