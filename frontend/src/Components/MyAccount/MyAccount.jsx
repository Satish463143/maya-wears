import React from 'react';
import './MyAccount.css';
import { useListOrderForUserQuery } from '../../api/order.api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MyAccountComponent from '../../Middlewares/MyAccountComponent/MyAccountComponent';

const MyAccount = () => {
    const loggedInUser = useSelector((root) => root.user.loggedInUser);

    if(!loggedInUser) {
        return <>
            <p className='container logged_in_message'>Please login to view my account</p>
        </>
    }

    const { data, error, isLoading } = useListOrderForUserQuery({ page: 1, limit: 10, search: '' });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const orders = data?.result;
    console.log(orders)
    const hasOrders = orders && orders.length > 0;

    // Extract additional personal details from the first order if orders exist
    const orderDetails = hasOrders ? orders[0] : null;

    return (
        <div className="container">
            <div className="my_account">
                <div className="personal_info">
                    
                    <div className="personal_info_grid">
                        {!loggedInUser ? (
                            // If no logged-in user, show login prompt                            
                            <div>
                                <h2>Please login first</h2>
                                <p>
                                    You need to log in to view your account details.{' '}
                                    <Link to="/login">Login</Link>
                                </p>
                            </div>
                        ) : hasOrders ? (
                            // If user is logged in and has orders, show personal details from the first order
                            <>
                                <h1>Personal Information</h1>
                                <div>
                                    <label htmlFor="">Full name</label><br />
                                    <input type="text" value={orderDetails?.customerId?.fullname} readOnly />
                                </div>
                                <div>
                                    <label htmlFor="">Email</label><br />
                                    <input type="text" value={orderDetails?.customerId?.email} readOnly />
                                </div>
                                <div>
                                    <label htmlFor="">Address</label><br />
                                    <input type="text" value={orderDetails?.customerId?.address} readOnly />
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
                    <div className="order_list">
                        <h1>Order List</h1>
                        <ul>
                            {orders.map((item,index) => (
                                <MyAccountComponent 
                                    key={index} 
                                    name={item.items[0].title} 
                                    image={item.items[0].productImage}                                     
                                    quantity={item.items[0].quantity} 
                                    size={item.items[0].size} 
                                    status={item.orderStatus}
                                    total={item.total}
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAccount;
