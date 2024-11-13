import {  useEffect } from "react";

import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckPermission = ({ allowedBy, children }) => {
 
  const loggedInUser = useSelector((root)=>{
    return root.user.loggedInUser
  })
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.role !== allowedBy) {
        toast.warn("You don't have permission to access this panel!!!");
        navigate('/');
      }
    } else {
      toast.error("Please login first", {
        onClose: () => navigate("/"), // Navigates after the toast shows
      });
    }
  }, [loggedInUser, allowedBy, navigate]); // Reacts to changes in `loggedInUser`

  if (loggedInUser && loggedInUser.role === allowedBy) {
    return children;
  }

  // Return null to prevent rendering unauthorized content
  return <ToastContainer/>;
};

export default CheckPermission;
