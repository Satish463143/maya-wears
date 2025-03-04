import React from 'react';
import './MyAccount.css';
import { useListOrderForUserQuery, useUpdateOrderForUserMutation } from '../../api/order.api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import line_svg from "../../assets/images/headline-curve.svg";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";

const MyAccount = () => {
    const loggedInUser = useSelector((root) => root.user.loggedInUser);   
    const { data, error, isLoading, refetch } = useListOrderForUserQuery({ page: 1, limit: 10, search: '' });
    const [cancleOrder] = useUpdateOrderForUserMutation()

    const deleteData = async(rowId)=>{
        try{
            await cancleOrder(rowId).unwrap()
            toast.success("Order canceled sucessfully")
            refetch();
        }catch(exception){
            console.log(exception)
            toast.error("An error occur while canceling the order.")
        }
    }

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
                    <img src={line_svg} alt="" srcSet="" />
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
                {hasOrders && (
                    // Show the order list if orders exist
                    <>
                    <div className="best__of__">
                        <h1>Order List</h1>
                        <img src={line_svg} alt="" srcSet="" />
                    </div>
                    <div className="order_list">
                        {orders.map((item,index) => (
                            <div className='user_order_list'>
                                <div className="order_id">
                                    <div className='order_total'>
                                        <h1><span>Order Id :</span>  {item?.orderId}</h1>
                                        <h1><span>Grand Total :</span>  {item?.total}</h1>
                                    </div>                                    
                                    <div className='border_div'></div>                                    
                                </div>
                                {item?.items.map((item,index)=>(
                                    <div className="user_order_list_item">
                                        <div className="user_order_list_item_image">
                                            <img src={item.productImage} alt="" />
                                        </div>
                                        <div className="user_order_list_item_content">
                                            <h1>{item.title}</h1>
                                            <h2><span>Quantity :</span>  {item.quantity}</h2>
                                            <h2><span> Size : </span> {item.size}</h2>                                            
                                        </div>
                                    </div>
                                ))}  

                                <div className='border_div' style={{marginBottom:'0px'}}></div> 
                                <div className="order_status">
                                    <h5>{item.orderStatus}</h5>
                                    {item.orderStatus === 'pending' && <p>Cancle order</p>}
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
