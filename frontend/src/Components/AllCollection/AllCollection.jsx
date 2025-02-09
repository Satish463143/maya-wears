import React from "react";
import { useListForHomeQuery } from "../../api/collection.api";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";
import AllCollectionItem from "../../Middlewares/AllCollectionItem/AllCollectionItem";
import "./AllCollection.css";
import { Link } from "react-router-dom";

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
  const collections = data?.result?.data || [];
  console.log(collections);

  return (
    <div className="container">
      <div className="allcollection_grid">
        {collections.map((item, index) => (
          <Link to={`/collection/${item.slug}/${item._id}`}>
            <AllCollectionItem
              key={index}
              image={item.desktopImage}
              name={item.name}
              description={item.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCollection;
