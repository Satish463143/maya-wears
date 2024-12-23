import React, { useState } from "react";
import "./CheckOutPage.css";
import { Link,useNavigate } from "react-router-dom";
import CheckOut from "../../Components/CheckOut/CheckOut";
import { useDispatch, useSelector } from "react-redux";
import { useCreateCustomerMutation } from "../../api/customer.api";
import { toast } from "react-toastify";
import { setCustomerId } from "../../reducer/customer.reducer";


const CheckOutPage = ({ toggleCart }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const loggedInUser = useSelector((root) => {
    return root.user.loggedInUser;
  });
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
    <div className="container">
      <div className="checkout_page">

        <div className="checkout_box">
          {/* {!loggedInUser && (
            <div className="checkout_title">
              <p>
                Have an account?{" "}
                <span>
                  <Link to="/login">Log in</Link>
                </span>
              </p>
            </div>
          )} */}
          <div className="checkout_form">
            <CheckOut
              submitEvent={submitEvent}
              loading={loading}
              // isloggedIn={!!loggedInUser}
            />
          </div>
        </div>       
        <h1 className="checkout__name">Checkout</h1>
      </div>
    </div>
  );
};

export default CheckOutPage;
