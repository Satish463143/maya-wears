import React from 'react'
import './AllProducts.css'
import { useListForHomeQuery } from '../../api/product.api'
import AllProductItem from '../../Middlewares/AllProductItem/AllProductItem'
import LoadingComponent from '../../Middlewares/Loading/Loading.component'

const AllProducts = () => {

    const {data, error, isLoading}  = useListForHomeQuery(null)
    if(isLoading) return <LoadingComponent/>
    const products = data?.result?.data || null

  return (
    <div className='container'>
        <div>
            <div className="prouct_title">
                <div><span>Catogories</span><span>/</span>All Products</div>
            </div>
            <div className="products_grid">
                {products.map((item)=>(
                    <AllProductItem key={item._id} _id={item._id} slug={item.slug} images={item.mainImage} title={item.title} price={item.price}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default AllProducts