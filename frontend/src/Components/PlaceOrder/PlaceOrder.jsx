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
import { useApplyPromoMutation } from '../../api/promo.api';
import OrderDetails from '../../Middlewares/OrderDetails/OrderDetails';

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
    const [promoApply] = useApplyPromoMutation()
    const [discount, setDiscount] = useState(0)    
    const [orderDetails, setOrderDetails] = useState() 
    const [isActive, setIsActive] = useState(false)

    const toggleOrderDetails = () => {
      setIsActive(!isActive);
    };

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
          setOrderDetails(response?.details)
          setIsActive(true)
          //clear the cart when order is placed
          await deleteCart(cartIdForOrder).unwrap(); 
          
        } catch (exception) {
          console.error(exception);
          toast.error("Error while placing order.");
        } finally {
          setLoading(false);
        }
      };
      const serviceCharge = (totalAmount >= 10000 ?  0 : 150 )

      const verifyPromo = async () => {
        try {
            const promo =promoCode;
            console.log('value', promo)
            const response = await promoApply(promo).unwrap();  // ✅ Add 'await' here
            setDiscount(response?.discount);  // ✅ Fix response structure
            console.log('Promo Applied:', response);
        } catch (error) {
            console.log('Promo Error:', error);
            toast.error(error?.data?.message || "Invalid promo code");
        }
    }
      const discountAmount = ((discount) / 100 ) * totalAmount  
    
      
      const grandTotal = (totalAmount - discountAmount + serviceCharge) 

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
                <p>Rs.{discountAmount.toFixed(2)}/-</p>
              </div>
              <div className="order_total">
                <p>Gross Total:</p>
                <p>Rs.{grandTotal.toFixed(2)}/-</p>
              </div>
            </div>
          </div>
        </div>

        <OrderDetails
          isActive={isActive}
          toggleOrderDetails={toggleOrderDetails}
          orderDetails={orderDetails}
        />

    </div>
  )
}

export default PlaceOrder