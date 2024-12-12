import React from 'react'
import './OrderView.css'

const OrderView = ({title,image, quantity,size,price}) => {
    
  return (
    <div className='cart_box'>
        <div className="cart_image">
            <img src={image} alt="" />
        </div>
        <div className="ordr_cart_details">
            <h1>{title}</h1>
            <h2>Quantity: {quantity}</h2>
            <p>Size: {size}</p>
        </div>
        <div className="cart_price">
            <p>Rs.{price}.00/-</p>
        </div>
    </div>
  )
}

export default OrderView