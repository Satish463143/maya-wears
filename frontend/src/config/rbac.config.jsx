import { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckPermission = ({ allowedBy, children }) => {
  const { loggedInUser } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.role !== allowedBy) {
        toast.warn("You don't have permission to access this panel!!!", {
          onClose: () => navigate("/"), // Navigates after the toast shows
        });
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
  return null;
};

export default CheckPermission;
