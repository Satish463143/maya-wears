import React, { useState, useEffect } from 'react'
import './CollectionComponent.css'
import { useParams, useSearchParams } from 'react-router-dom'
import { useListProductFromCollectionQuery,useShowByIdQuery } from '../../api/collection.api';
import ProductItem from '../../Middlewares/ProductItem/ProductItem';

import product_banner from '../../assets/images/desktopImage_4_banner.jpg'
import product_banner_mobile from '../../assets/images/mobileImage_4.jpg'

const CollectionComponent = () => {
    const { id } = useParams();
    const {data, error, isLoading} = useListProductFromCollectionQuery(id)
    const products = data?.result; 

   const {data:collections} = useShowByIdQuery(id)

   const collectionById = collections?.result

           
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching products!</div>;  

  return (
    <>
      <div className='product_banner'>
      <div >
          <div className="product_desktop_img">
              <img src={product_banner} alt="" />  
                <div className='img_overlay'></div>         
          </div>
          <div className="product_mobile_img">
            <img src={product_banner_mobile} alt="" />  
            <div className='img_overlay'></div>           
          </div>
          <div className='product_banner_content'>
              <h2>Explore {collectionById.name} </h2>
              <p> All in One Place!</p>
          </div>
      </div>
    </div>
    
      <div className="container" style={{marginTop:'50px'}}>
      <div className="prouct_title">
        <div><span>{collectionById.name} </span><span>/ </span>All Products</div>
      </div>
        <div className='collection products_grid'>
          {products.map((item,index)=>(
            <ProductItem key={item._id} _id={item._id} slug={item.slug} images={item.mainImage} title={item.title} price={item.price}/>
          ))}
          </div>
      </div>
    </>
  )
}

export default CollectionComponent