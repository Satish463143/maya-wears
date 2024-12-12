import React, {  useContext } from 'react'
import './Cart.css'
import CartItem from '../../Middlewares/CartItem/CartItem'
import { useListAllCartQuery, useDeleteCartMutation } from "../../api/cart.api";
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

const Cart = ({isCartActive , toogleCart,}) => {
    const cartId = Cookies.get('cartId');
    const {data, refetch} = useListAllCartQuery(cartId ? { cartId } : null)
    const [deleteCart] = useDeleteCartMutation()

    const cartList  = data?.result?.items || []

    const calculateTotal = (cartItems) => {
        return cartItems.reduce((total, item) => total + item.amount, 0);
    };
    const totalAmount = calculateTotal(cartList);

    const handleDelete = async (cartItemId) => {
        try {
            const cartId = Cookies.get('cartId'); // Get the cartId for anonymous users
            const token = localStorage.getItem('_at'); // Check if the user is logged in
    
            // Perform the delete operation based on whether the user is logged in or not
            if (token) {
                // If the user is logged in, use the token for authentication
                await deleteCart(cartItemId).unwrap();
            } else if (cartId) {
                // If the user is not logged in, use the cartId for the anonymous user's cart
                await deleteCart({ cartId, cartItemId }).unwrap();
            }
    
            // Refetch the cart or update the state if necessary
            refetch(); // Refetch the cart data to reflect the updated cart
        } catch (exception) {
            console.log(exception);
        }
    }
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
                    {cartList?.length>0 ? (
                        cartList.map(item =>(  
                            <div>     
                                <CartItem key={item._id}title={item.productId.title} quantity={item.quantity} amount={item.amount} _id={item._id} slug={item.productId.slug} image={item.productImage} price= {item.price} size={item.size}  deleteCartItem={() => handleDelete(item._id)} />                                   
                                <hr />                                    
                            </div> 
                        ))
                    ):(
                        <p style={{margin:'50px 0', textAlign:'center'}}>No items in the Cart</p>
                    )}
                </div> 
                <div className='checkout_btn' onClick={toogleCart}>
                    <Link to='/check_out' >
                        <button>
                            Checkout
                        </button>
                        <button>
                            Rs.{totalAmount}/-
                        </button>
                    </Link>
                </div>
            </div>            
        </div>
    </div>
  )
}

export default Cart
