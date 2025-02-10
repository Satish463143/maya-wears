import React, { useState } from "react";
import "./CheckOutPage.css";
import { Link,useNavigate } from "react-router-dom";
import CheckOut from "../../Components/CheckOut/CheckOut";
import { useDispatch, useSelector } from "react-redux";
import { useCreateCustomerMutation } from "../../api/customer.api";
import { toast } from "react-toastify";
import { setCustomerId } from "../../reducer/customer.reducer";
import product_banner from '../../assets/images/desktopImage_4_banner.jpg'
import product_banner_mobile from '../../assets/images/mobileImage_4.jpg'
import CommonBanner from "../../Middlewares/CommonBanner/CommonBanner";


const CheckOutPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  // Initialize hooks for mutations
  const [createCustomer] = useCreateCustomerMutation(); 

  const submitEvent = async (data) => {
    setLoading(true);
    try {
      const response = await createCustomer(data).unwrap();
      // Dispatch the action to store customer ID in the customer reducer
      dispatch(setCustomerId(response?.deatils?._id));
      toast.success("Customer details saved successfully!");
      navigate('/order');
    } catch (exception) {
      console.error(exception);
      toast.error("Error while saving customer details.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <CommonBanner  product_banner={product_banner} product_banner_mobile={product_banner_mobile} title="Checkout"  />
      <div className="container">      
        <div className="checkout_page">
          {/* <h1 className="checkout__name">Checkout</h1> */}
          <div className="checkout_box">
            <div className="checkout_form">
              <CheckOut
                submitEvent={submitEvent}
                loading={loading}
              />
            </div>
          </div>      
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
