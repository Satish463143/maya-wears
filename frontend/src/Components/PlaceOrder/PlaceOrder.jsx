import React, { useState } from 'react'
import OrderView from '../OrderView/OrderView';
import { useListAllCartQuery,useDeledeEntireCartMutation } from '../../api/cart.api';
import Cookies from "js-cookie";
import { useCreateOrderMutation } from '../../api/order.api';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import PlaceOrderForm from './PlaceOrder.form';
import { useNavigate } from 'react-router-dom';
import "./PlaceOrder.css"

const PlaceOrder = () => {
    const [loading, setLoading] = useState(false)
    const customerId = useSelector((state) => state.customer.customerId);
    const [createOrder] = useCreateOrderMutation();
    const cartId = Cookies.get("cartId");
    const { data } = useListAllCartQuery(cartId ? { cartId } : null);
    const cartIdForOrder = data?.result?._id
    const cartList = data?.result?.items || [];
    const totalCartNumber = cartList.length;
    const [promoCode, setPromoCode] = useState('');
    const navigate = useNavigate()  
     

    const handlePromoCodeChange = (e) => {
      setPromoCode(e.target.value); 
    };

    const calculateTotal = (cartItems) => {
        return cartItems.reduce((total, item) => total + item.amount, 0);
    };
    const totalAmount = calculateTotal(cartList);
    const [deleteCart] = useDeledeEntireCartMutation()
    const submitEvent = async (data) => {
        setLoading(true);
        try {
          if (!customerId) {
            toast.error("Customer details are missing.");
            return;
          } 
          const paymentTypeValue = data.paymentType.value;  

          
          const orderData = {
            ...data,
            paymentType: paymentTypeValue,
            customerId,
            cartId:cartIdForOrder,
            promoCode,
            subTotal: totalAmount,  
            cartTotal: totalAmount, 
          };   
           
          const response = await createOrder(orderData).unwrap();
          toast.success("Order has been placed successfully!");

          //clear the cart when order is placed
          await deleteCart(cartIdForOrder).unwrap(); 
           
          navigate('/my_account')
          
        } catch (exception) {
          console.error(exception);
          toast.error("Error while placing order.");
        } finally {
          setLoading(false);
        }
      };
      const serviceCharge = (totalAmount=== 10000 ?  0 : 150 )
      const verifyPromo = ()=>{

      } 

  return (
    <div className='container'>
         <div className="order_details">
          <div className="order_box">
            <div className="order_title">
              <p>Order summary {`(${totalCartNumber})`}</p>
            </div>
            <hr />
            <div className="order_cartList">
              {cartList?.length > 0 ? (
                cartList.map((item) => (
                  <div>
                    <OrderView
                      key={item._id}
                      title={item.title}
                      quantity={item.quantity}
                      price={item.amount}
                      image={item.productImage}
                      size={item.size}
                    />
                  </div>
                ))
              ) : (
                <p style={{ margin: "50px 0", textAlign: "center" }}>
                  No items in the Cart
                </p>
              )}
            </div>
            <hr />
            <div className="order_promo">
              <div className="order_promo_title">                
                <form action="">
                  <input type="text" placeholder="Promo code" value={promoCode} onChange={handlePromoCodeChange} />
                </form>

              </div>
              <div className="promo_button">
                <button className="submit_btn hoverBotton cart__buy place_order_button" onClick={verifyPromo}> Apply Promo</button>
              </div>
            </div>
            <hr />
            <div >                              
                <PlaceOrderForm submitEvent={submitEvent}  loading={loading}/>              
            </div>
            <hr />
            <div className="order_total_box">
              <div className="order_total">
                <p>SubTotal:</p>
                <p>Rs.{totalAmount}.00/-</p>
              </div>
              <div className="order_total">
                <p>Service Charge:</p>
                <p>Rs.{totalAmount === 10000 ? "00" : "150"}.00/-</p>
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
                <p>Rs.{serviceCharge + totalAmount}.00/-</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default PlaceOrder