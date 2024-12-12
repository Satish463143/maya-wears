import React, { useState } from 'react'
import './CheckOutPage.css'
import { Link } from 'react-router-dom'
import CheckOut from '../../Components/CheckOut/CheckOut'
import OrderView from '../../Components/OrderView/OrderView'
import Cookies from 'js-cookie'
import { useListAllCartQuery } from "../../api/cart.api";
import { useSelector } from 'react-redux'
import { useCreateCustomerMutation } from '../../api/customer.api'
import { toast } from 'react-toastify'
import { useCreateOrderMutation } from '../../api/order.api'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PaymentOptionsCompoent } from '../../Middlewares/Form/Input.component'

const CheckOutPage = ({toggleCart}) => {
  const [loading, setLoading] = useState(false)
  const [customerId, setCustomerId] = useState(null);
  const cartId = Cookies.get('cartId');
  const {data} = useListAllCartQuery(cartId ? { cartId } : null)
  const cartList  = data?.result?.items || []
  const totalCartNumber = cartList.length

  const loggedInUser = useSelector((root) => {
    return root.user.loggedInUser;
  });
 

  const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.amount, 0);
  };
  const totalAmount = calculateTotal(cartList);

   // Initialize hooks for mutations
   const [createCustomer] = useCreateCustomerMutation();
   const [createOrder] = useCreateOrderMutation();


   const submitEvent = async (data) => {
    setLoading(true);
    try {
      const response = await createCustomer(data).unwrap();
      setCustomerId(response?.customerId);
      toast.success("Customer details saved successfully!");

    } catch (exception) {
      console.error(exception);
      toast.error("Error while saving customer details.");
    } finally {
      setLoading(false);
    }
  };

  const orderDto = Yup.object({
    paymentType: Yup.object({
      label:Yup.string().matches(/^(Cash on delivery|Pay by E-sewa)$/),
      value: Yup.string().matches(/^(Cash on delivery|Esewa)$/).required()
      }).required(),

  })
  
const placeOrder = async (data) => {
  setLoading(true);
  try {
    if (!customerId) {
      toast.error("Customer details are missing.");
      return;
    }

    const orderData = {
      ...data,
      paymentType: data.paymentType.value,
      customerId,
      cartId,
    };

    const response = await createOrder(orderData).unwrap();
    toast.success("Order has been placed successfully!");

  } catch (exception) {
    console.error(exception);
    toast.error("Error while placing order.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container">
      <div className='checkout_page'>
        <div className='checkout_box'>
          {!loggedInUser && (
              <div className="checkout_title">
                <p>
                  Have an account? <span><Link to="/login">Log in</Link></span>
                </p>
              </div>
            )}         
          <div className="checkout_form">
            <CheckOut submitEvent={submitEvent}  loading={loading} isloggedIn={!!loggedInUser}/>
          </div>          
        </div>
        <div className="order_details">
          <div className='order_box'>
            <div className="order_title">
                <p>Order summary {`(${totalCartNumber})`}</p>
                <span onClick={toggleCart}>Edit Cart</span>            
            </div>
            <hr/>
            <div className="order_cartList">
            {cartList?.length>0 ? (
                cartList.map(item =>(  
                    <div>     
                        <OrderView key={item._id} title={item.title} quantity={item.quantity} price={item.amount} image={item.productImage}  size={item.size} />                                                                      
                    </div> 
                ))
            ):(
                <p style={{margin:'50px 0', textAlign:'center'}}>No items in the Cart</p>
            )}
            </div> 
            <hr/> 
            <div className="order_promo">
              <div className="order_promo_title">
                <span style={{display:'flex', alignItems:'center',gap:'5px'}}>
                  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px">
                    <rect fill="none" height="256" width="256" />
                    <path
                      d="M92.7,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4l-120,120A7.9,7.9,0,0,1,92.7,216Z"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="12"
                    />
                    <line
                      x1="136"
                      y1="64"
                      x2="192"
                      y2="120"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="12"
                    />
                    <polyline
                      points="160 192 200 152 192 120"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="12"
                    />
                    <line
                      x1="40.5"
                      y1="160.5"
                      x2="95.5"
                      y2="215.5"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="12"
                    />
                  </svg>
                  <p>Enter promo code</p>
                </span>
                <form action="">
                  <input type="text" placeholder='Promo code' />
                </form>
              </div>        
            </div>  
            <hr />
            <div className="order_promo">
              <div className="order_promo_title">
                <span style={{display:'flex', alignItems:'center',gap:'5px'}}>
                  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px">
                    <rect fill="none" height="256" width="256" />
                    <path
                      d="M92.7,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4l-120,120A7.9,7.9,0,0,1,92.7,216Z"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="12"
                    />
                    <line
                      x1="136"
                      y1="64"
                      x2="192"
                      y2="120"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="12"
                    />
                    <polyline
                      points="160 192 200 152 192 120"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="12"
                    />
                    <line
                      x1="40.5"
                      y1="160.5"
                      x2="95.5"
                      y2="215.5"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="12"
                    />
                  </svg>
                  <p>Select payment option</p>
                </span>
                <form onSubmit={handleSubmit(placeOrder)}>
                  <PaymentOptionsCompoent
                    name="paymentType"
                    control={control}
                    errMsg={errors?.paymentType?.message}
                    required
                  />
                  <button type="submit" disabled={loading}>
                    Place Order
                  </button>
                </form>
              </div>        
            </div> 
            <hr />
            <div className="order_total_box">
              <div className="order_total">
                <p>SubTotal:</p>
                <p>Rs.{totalAmount}.00/-</p>                
              </div>
              <div className="order_total">
                <p>Service Charge:</p>
                <p>Rs.{totalAmount === 10000 ? '0' : '150'}.00/-</p>                
              </div>
              <div className="order_total">
                <p>Tax:</p>
                <p>Rs.00.00/-</p>                
              </div>
              <div className="order_total">
                <p>Discount:</p>
                <p>Rs.00.00/-</p>                
              </div>
              <div className="order_total">
                <p>Gross Total:</p>
                <p>Rs.5000.00/-</p>                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOutPage