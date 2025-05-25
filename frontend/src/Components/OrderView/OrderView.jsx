import React from 'react'
import './OrderView.css'

const OrderView = ({title,image, quantity,size,price}) => {
    
  return (
    <div className='cart_box'>
        <div className="cart_image">
            <img src={image} alt={image} loading='lazy'/>
        </div>
        <div className="ordr_cart_details">
            <h1 className='text-xl' style={{fontWeight: '500'}}>{title}</h1>
            <h2>Quantity: {quantity}</h2>
            <p>Size: {size}</p>
            <p  style={{fontWeight: '500'}} className='order_summary_price'>Rs.{price}.00/-</p>
        </div>
        <div className="cart_price grid_order_summary_price">
            <p  style={{fontWeight: '500'}}>Rs.{price}.00/-</p>
        </div>
    </div>
  )
}

export default OrderView