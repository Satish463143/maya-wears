import React from 'react'
import './CollectionComponent.css'
import { useParams} from 'react-router-dom'
import { useListProductFromCollectionQuery,useShowByIdQuery } from '../../api/collection.api';
import ProductItem from '../../Middlewares/ProductItem/ProductItem';

import product_banner from '../../assets/images/desktopImage_4_banner.jpg'
import product_banner_mobile from '../../assets/images/mobileImage_4.jpg'
import LoadingComponent from '../../Middlewares/Loading/Loading.component';
import CommonBanner from '../../Middlewares/CommonBanner/CommonBanner';

const CollectionComponent = () => {
    const { id } = useParams();
    const {data, error, isLoading} = useListProductFromCollectionQuery(id)
    const products = data?.result; 

   const {data:collections} = useShowByIdQuery(id)

   const collectionById = collections?.result           
    if (isLoading) return <LoadingComponent 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        backgroundColor: '#f9f9f9',
      }}
    />;
    if (error) return <div>Error fetching products!</div>;  

  return (
    <>
      <CommonBanner product_banner={product_banner} product_banner_mobile={product_banner_mobile} title={`Explore ${collectionById?.name}`} subtitle="All in One Place"/>
    
      <div className="container" style={{marginTop:'50px'}}>
        <div className="prouct_title">
          <div><span>{collectionById?.name} </span><span>/ </span>All Products</div>
        </div>
        <div className="products_grid">
            {products.map((item,index)=>(
              <ProductItem key={item._id} _id={item._id} slug={item.slug} images={item.mainImage} title={item.title} price={item.price}/>
            ))}
          </div>
      </div>
    </>
  )
} 

export default CollectionComponent