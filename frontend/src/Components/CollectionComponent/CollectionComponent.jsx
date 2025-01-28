import React, { useState, useEffect } from 'react'
import './CollectionComponent.css'
import { useParams, useSearchParams } from 'react-router-dom'
import { useListProductFromCollectionQuery } from '../../api/collection.api';
import ProductItem from '../../Middlewares/ProductItem/ProductItem';

const CollectionComponent = () => {
    const { id } = useParams();
    const {data, error, isLoading} = useListProductFromCollectionQuery(id)
    const products = data?.result; // Get the products array

           
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching products!</div>;  

  return (
    <div className="container">
      <div className='collection products_grid'>
        {products.map((item,index)=>(
          <ProductItem key={item._id} _id={item._id} slug={item.slug} images={item.mainImage} title={item.title} price={item.price}/>
        ))}
        </div>
    </div>
  )
}

export default CollectionComponent