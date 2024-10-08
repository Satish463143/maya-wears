import React, { useState } from 'react'
import './CartItem.css'

const CartItem = ({_id,title, image, color, price,selectedSize,removeFromCartList}) => {
    const [counter, setCounter] = useState(1);
   
    const sub = ()=>{
        if(counter > 1 ){
            setCounter(counter-1);
        }
    }
    const add = ()=>{
        if(counter<10){
            setCounter(counter+1)
        }
    }
    const totalPrice = counter*price;
    
  return (
    <div className='cart_grid'>
        <div className="cart_img">
            <img src={image} alt="" />
        </div>
        <div className='cart_title'>
            <h3>{title}</h3>
            <p style={{padding:'5px 0'}}>{color}</p>
            <p style={{ paddingBottom: '5px' }}>Size: {selectedSize || "N/A"}</p>
            <div className='quantity'>
                <button onClick={sub}>-</button>
                    <h4>{counter}</h4>
                <button onClick={add}>+</button>
            </div>
        </div>
        <div className='cart_price'>
            <span>
                <svg
                    style={{ enableBackground: 'new 0 0 24 24',cursor:'pointer' }}
                    onClick={() => removeFromCartList(_id)}
                    version="1.1"
                    viewBox="0 0 24 24"
                    width='20px'
                    height='20px'
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <style type="text/css">
                    {`.st0{opacity:0.2;fill:none;stroke:#000000;stroke-width:5.000000e-02;stroke-miterlimit:10;}`}
                    </style>
                    <g id="grid_system" />
                    <g id="_icons">
                    <path d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z"/>
                    </g>
                </svg>
            </span>
            <h5>Rs.{totalPrice}/-</h5>
        </div>
    </div>
  )
}

export default CartItem