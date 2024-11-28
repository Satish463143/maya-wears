import React from "react";
import "./BestSellingItem.css";
import ProductItem from "../../Middlewares/ProductItem/ProductItem";
import { Link } from "react-router-dom";
import { useListForHomeQuery } from "../../api/product.api";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";
import line_svg from "../../assets/images/headline-curve.svg";

const BestSellingItem = () => {
  const { data, error, isLoading } = useListForHomeQuery(null);
  if (isLoading) <LoadingComponent />;

  const product = data?.result?.data || [];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const bestShuffleArray = shuffleArray([...product]);
  const limitedbestShuffleArray = bestShuffleArray.slice(0, 8);

  return (
    <div className="bestSelling div_container">
      <div>
        <div className="best__of__">
          <h1>Best of MAYA.</h1>
          <img src={line_svg} alt="" srcSet="" />
        </div>
        <div className="container best_container">
          <div className="best_flex">
            {limitedbestShuffleArray.map((item, index) => {
              return (
                <ProductItem
                  key={item._id}
                  slug={item.slug}
                  _id={item._id}
                  images={item.images?.[0]}
                  title={item.title}
                  price={item.price}
                />
              );
            })}
            <Link to="/all_product">
              <div className="view_all_box">View all</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingItem;
