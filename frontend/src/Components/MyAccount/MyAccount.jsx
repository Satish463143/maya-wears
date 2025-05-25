import React, {useEffect} from 'react';
import './MyAccount.css';
import { useListOrderForUserQuery, useUpdateOrderForUserMutation } from '../../api/order.api';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import line_svg from "../../assets/images/headline-curve.svg";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";
import Swal from 'sweetalert2'
import authSvc from '../../pages/LoginPage/auth.service';
import { getLoggedInUserRedux, logoutUser } from '../../reducer/user.reducer';

const MyAccount = () => {
    const loggedInUser = useSelector((root) => root.user.loggedInUser); 
     
    const { data, error, isLoading, refetch } = useListOrderForUserQuery({ page: 1, limit: 10, search: '' });
    const [cancleOrder] = useUpdateOrderForUserMutation()
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (!loggedInUser) {
            dispatch(getLoggedInUserRedux()); // Fetch user details if missing
        }
    }, [loggedInUser, dispatch]);

    if (!loggedInUser) {
        return <LoadingComponent 
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                backgroundColor: '#f9f9f9',
            }} 
        />; 
    }
   


    const deleteData = async(rowId)=>{        
            try{
                const result = await Swal.fire({
                    title: "Are you sure want to cancle your order?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, cancel it!",
                    cancelButtonText: "No, let it be",
                  })
                  if(result.isConfirmed){
                    await cancleOrder(rowId).unwrap()
                    toast.success("Order canceled sucessfully")
                    refetch();
                }
    
            }catch(exception){
                toast.error("Error canceling order")
            }
    }
    const logout = async () => {
        try {
            toast.loading("Logging out...");            
            // Call the logout endpoint to clear tokens in the database
            await authSvc.postRequest('/auth/logout');

            // Remove tokens from localStorage
            localStorage.removeItem('_at');
            localStorage.removeItem('_rt');

            //dispatch the logout 
            dispatch(logoutUser());
    
            toast.dismiss(); // Remove the loading toast
            toast.success("You have been logged out successfully")
            setTimeout(() => {
                navigate('/');
            }, 1000);
            
        } catch (error) {
            toast.dismiss();
            toast.error("Logout failed, please try again");
        }
    };

    if (isLoading) {
        return <LoadingComponent
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            backgroundColor: '#f9f9f9',
          }} 
         />;
      }
    const orders = data?.result;
    const hasOrders = orders && orders.length > 0;

    // Extract additional personal details from the first order if orders exist
    const orderDetails = hasOrders ? orders[0] : null;

    return (
        <div className="container">
            <div className="my_account">
                <div className="best__of__">
                    <h1>Personal Information</h1>
                    <img src={line_svg} alt="" loading='lazy'/>
                </div>
                <div className="personal_info">  
                    <div className="personal_info_grid">
                        <div className="first_letter">
                            <h1>{loggedInUser?.name.slice(0,1)}</h1>
                        </div>
                        <div className="infos">
                            <h1><strong>{loggedInUser?.name}</strong></h1>
                            <h1>{loggedInUser?.email}</h1>
                        </div>
                    </div>
                    <div className="personal_info_contact">
                        {hasOrders ? (
                            // If user is logged in and has orders, show personal details from the first order
                            <> 
                                <h1>Contact details</h1>
                                <div>
                                    <label htmlFor="">Address</label><br />
                                    <input type="text" value={orderDetails?.customerId?.address} readOnly /><br /> <br />
                                </div>
                                <div>
                                    <label htmlFor="">Phone Number</label><br />
                                    <input type="text" value={orderDetails?.customerId?.phone} readOnly />
                                </div>
                            </>
                        ) : (
                            // If user is logged in but has no orders, show a prompt to shop
                            <div>
                                <h2>No orders yet</h2>
                                <p>
                                    Continue to shop <Link to="/all_product">View products</Link>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className='admin_box ' style={{marginTop:'20px', cursor:'pointer',maxWidth:'400px'}} onClick={logout}>
                    <div>
                    <span>
                        <svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
                        <g transform="translate(0 -1028.4)"><path d="m12 1039.4c-1.277 0-2.4943 0.2-3.5938 0.7 0.6485 1.3 2.0108 2.3 3.5938 2.3s2.945-1 3.594-2.3c-1.1-0.5-2.317-0.7-3.594-0.7z" fill="#95a5a6"/>
                            <path d="m8.4062 1041.1c-2.8856 1.3-4.9781 4-5.3437 7.3 0 1.1 0.8329 2 1.9375 2h14c1.105 0 1.938-0.9 1.938-2-0.366-3.3-2.459-6-5.344-7.3-0.649 1.3-2.011 2.3-3.594 2.3s-2.9453-1-3.5938-2.3z" fill="#d35400"/>
                            <path d="m8.4062 1040.1c-2.8856 1.3-4.9781 4-5.3437 7.3 0 1.1 0.8329 2 1.9375 2h14c1.105 0 1.938-0.9 1.938-2-0.366-3.3-2.459-6-5.344-7.3-0.649 1.3-2.011 2.3-3.594 2.3s-2.9453-1-3.5938-2.3z" fill="#e67e22"/>
                            <path d="m12 11c-1.147 0-2.2412 0.232-3.25 0.625 0.9405 0.616 2.047 1 3.25 1 1.206 0 2.308-0.381 3.25-1-1.009-0.393-2.103-0.625-3.25-0.625z" fill="#7f8c8d" transform="translate(0 1028.4)"/>
                            <path d="m17 4a5 5 0 1 1 -10 0 5 5 0 1 1 10 0z" fill="#060060" transform="translate(0 1031.4)"/>
                            <path d="m8.4062 1040.1c-0.3172 0.2-0.6094 0.3-0.9062 0.5 0.8153 1.6 2.541 2.8 4.5 2.8s3.685-1.2 4.5-2.8c-0.297-0.2-0.589-0.3-0.906-0.5-0.649 1.3-2.011 2.3-3.594 2.3s-2.9453-1-3.5938-2.3z" fill="#d35400" />
                        </g>
                        </svg>
                    </span>
                    </div>
                    <div >
                        <p style={{color:'white', textDecoration:'underLine'}}>Log Out</p>
                    </div>
                </div>
                {hasOrders && (
                    // Show the order list if orders exist
                    <>
                    <div className="best__of__">
                        <h1>Order List</h1>
                        <img src={line_svg} alt="" srcSet="" loading='lazy'/>
                    </div>
                    <div className="order_list">
                        {orders.map((item,index) => (
                            <div key={item._id} className='user_order_list'>
                                <div className="order_id">
                                    <div className='order_total'>
                                        <h1><span>Order Id :</span>  {item?.orderId}</h1>
                                        <h1><span>Grand Total :</span>  Rs.{item?.total.toFixed(2)}/-</h1>
                                    </div>                                    
                                    <div className='border_div'></div>                                    
                                </div>
                                {item?.items.map((orderItem,itemIndex)=>(
                                    <div key={`${item._id}-${orderItem.productId || orderItem._id || itemIndex}`} className="user_order_list_item">
                                        <div className="user_order_list_item_image">
                                            <img src={orderItem.productImage} alt={orderItem.productImage} loading='lazy'/>
                                        </div>
                                        <div className="user_order_list_item_content">
                                            <h1>{orderItem.title}</h1>
                                            <h2><span>Quantity :</span>  {orderItem.quantity}</h2>
                                            <h2><span> Size : </span> {orderItem.size}</h2>                                            
                                        </div>
                                    </div>
                                ))}  

                                <div className='border_div' style={{marginBottom:'0px'}}></div> 
                                <div className="order_status">
                                    <h5>{item.orderStatus}</h5>
                                    {item.orderStatus === 'pending' && <p onClick={() => deleteData(item._id)}>Cancle order</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyAccount;
