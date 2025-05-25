import React, { useState } from 'react'
import './CartItem.css'
import { Link } from 'react-router-dom'
import { useUpdateCartMutation } from '../../api/cart.api'

const CartItem = ({ _id, title, slug, image, amount, quantity, price, size, deleteCartItem }) => {
    const [updateCart] = useUpdateCartMutation()
    const [itemLoading, setItemLoading] = useState(false);


    const updateQuantity = async (newQuantity) => {
        setItemLoading(true);
        try {
            // Call the updateCart mutation - the API expects cart item ID and quantity
            await updateCart({ cartItemId: _id, quantity: newQuantity }).unwrap();

            // Refetch the cart or update local state if needed
        } catch (exception) {
        }
        finally{
            setItemLoading(false)
        }
    }

    const sub = () => {
        if (quantity > 1) {
            updateQuantity(quantity - 1);
        }
    }

    const add = () => {
        if (quantity < 10) { // Limit the max quantity to 10
            updateQuantity(quantity + 1);
        }
    }

    return (
        <div className={`cart_grid `}>
            <div className="cart_img">
                <Link to={`/product/${slug}/${_id}`}>
                    <img src={image} alt={title} />
                </Link>
            </div>
            <div className='cart_title'>
                <h3>{title}</h3>
                <p style={{ padding: '5px 0' }}>Rs.{price}/-</p>
                <p style={{ paddingBottom: '5px' }}>Size: {size || "N/A"}</p>
                <div className='quantity' style={{ cursor: itemLoading ? 'not-allowed' : 'pointer', opacity:itemLoading? '0.5' : '1' }}>
                    <button onClick={sub} style={{ cursor: itemLoading ? 'not-allowed' : 'pointer', opacity:itemLoading? '0.5' : '1' }}>-</button>
                    <h4>{quantity}</h4>
                    <button onClick={add} style={{ cursor: itemLoading ? 'not-allowed' : 'pointer', opacity:itemLoading? '0.5' : '1' }}>+</button>
                </div>
            </div>
            <div className='cart_price'>
                <span onClick={deleteCartItem}>
                    <svg
                        style={{ enableBackground: 'new 0 0 24 24', cursor: 'pointer' }}
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
                            <path d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z" />
                        </g>
                    </svg>
                </span>
                <h5>Total: <br /> Rs.{amount}/-</h5>
            </div>
        </div>
    )
}

export default CartItem
