import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './OrderDetails.css'
import { useSelector } from 'react-redux'

const OrderDetails = ({isActive, toggleOrderDetails, orderDetails}) => {
    const [isLoggedIn, setLoggedIn] = useState(false)
    const loggedInUser = useSelector((state)=> state.user.loggedInUser)

    useEffect(()=>{
        if(loggedInUser){
            setLoggedIn(true)
        }
    },[loggedInUser])
    
  return (
    <div className={`order_details_box ${isActive ? 'active_order_details' : ''}`}>
        <Link to ={`${isLoggedIn ?  '/my_account'  : '/'}`}><div className="order_overlay"  onClick={toggleOrderDetails}></div></Link>
        <div className="order_details_content">                    
            <div className="details_content">
                <div className='details_content_box'>
                    <span>
                        <svg baseProfile="tiny" height="30px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="30px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M16.972,6.251c-0.967-0.538-2.185-0.188-2.72,0.777l-3.713,6.682l-2.125-2.125c-0.781-0.781-2.047-0.781-2.828,0  c-0.781,0.781-0.781,2.047,0,2.828l4,4C9.964,18.792,10.474,19,11,19c0.092,0,0.185-0.006,0.277-0.02  c0.621-0.087,1.166-0.46,1.471-1.009l5-9C18.285,8.005,17.937,6.788,16.972,6.251z"/></svg>
                    </span>
                    <h1>Order has been placed sucessfully</h1>
                    <h3>Order Summary</h3>
                    <div className="order_details_items">
                        {orderDetails?.items.map((item,index)=>(
                            <div style={{display:'flex', alignItems:'center', gap:'30px', marginBottom:'20px'}}>
                                <img src={item?.productImage} alt={item?.productImage} loading='lazy'/>
                                <div>
                                    <p>Size: {item.size}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>                                
                            </div>
                        ))}
                    </div>
                    <p><strong>Order ID:</strong> {orderDetails?.orderId}</p>
                    <p><strong>Total Amount:</strong> Rs.{orderDetails?.total}</p>
                    <p><strong>Payment Type:</strong> {orderDetails?.paymentType}</p>
                    <h1>( Delivery will take place in next 2-3 working days. )</h1>
                </div>
                <Link to = {`${isLoggedIn ?  '/my_account'  : '/'}`}>
                    <div className="order_details_button"  onClick={toggleOrderDetails}>
                        Continue
                    </div>
                </Link>                
            </div>
        </div>
        
    </div>
  )
}

export default OrderDetails