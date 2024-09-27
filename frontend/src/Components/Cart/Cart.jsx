import React, { useContext } from 'react'
import './Cart.css'
import CartItem from '../../Middlewares/CartItem/CartItem'
import { StoreContext } from '../../context/StoreContext'

const Cart = ({isCartActive , toogleCart,}) => {
    const {cartList,removeFromCartList} = useContext(StoreContext)
    const netTotal = cartList.reduce((total,product)=>total+product.price * product.counter,0);
  return (
    
    <div className={`cart ${isCartActive?'cart_active': ''}`}>
        <div className={`cart_overlay ${isCartActive? 'no-scroll' : ''}`} onClick={toogleCart}></div>
        <div className='cart_container' >
            <div className='cart_container_div'></div>
                <div className='cart_details'>
                    <div className='cross_btn'>
                        <span onClick={toogleCart}>
                            <svg
                                style={{ enableBackground: 'new 0 0 24 24' }}
                                version="1.1"
                                viewBox="0 0 24 24"
                                width='30px'
                                height='30px'
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
                        <h2 className='headers'>My Cart</h2>
                    </div>
                    <hr />
                    <div className='cart_details_box'>
                        {cartList.length>0 ? (
                            cartList.map(product =>(  
                                <div>     
                                    <CartItem key={product._id} {...product} removeFromCartList={removeFromCartList}/>                                   
                                    <hr />                                    
                                </div> 
                            ))
                        ):(
                            <p style={{margin:'50px 0', textAlign:'center'}}>No items in the Cart</p>
                        )}
                        </div> 
                        <div className='checkout_btn'>
                            <button>
                                Checkout
                            </button>
                            <button>
                                Rs./-{netTotal}
                            </button>

                        </div>
                </div>            
        </div>
    </div>
  )
}

export default Cart