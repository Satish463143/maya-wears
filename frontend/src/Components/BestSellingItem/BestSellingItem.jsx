import React, { useContext } from 'react'
import './BestSellingItem.css'
import { StoreContext } from '../../context/StoreContext' 
import ProductItem from '../ProductItem/ProductItem'

const BestSellingItem = () => {
  const {ProductList} = useContext(StoreContext)
  return (
    <div className='bestSelling'>
        <h2>Best Selling</h2>
        <div className="container">
          <div className='best_flex'>
            {ProductList.map((item,index)=>{
              return <ProductItem key={index} id={item._id} image={item.image} title={item.title} crossPrice={item.crossPrice} price={item.price} quantity={item.quantity}/>
            })}
          </div>
       </div>
    </div>
  )
}

export default BestSellingItem