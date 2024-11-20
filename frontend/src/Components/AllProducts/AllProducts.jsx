import React from 'react'
import './AllProducts.css'
import { useListForHomeQuery } from '../../api/product.api'
import ProductItem from '../../Middlewares/ProductItem/ProductItem'

const AllProducts = () => {

    const {data, error, isLoading}  = useListForHomeQuery(null)
    const products = data?.result?.data || null

  return (
    <div className='container'>
        <div data-aos="fade-up">
            <div className="prouct_title">
                <h1>"Find Your Perfect Match – Explore Our Collection!"</h1>
            </div>
            <div className="products_grid">
                {products.map((item)=>(
                    <ProductItem key={item._id} _id={item._id} slug={item.slug} images={item.images[0]} title={item.title} price={item.price}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default AllProducts