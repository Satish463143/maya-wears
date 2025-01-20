import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useListOrderDetailByIdForAdminQuery, useUpdateOrderForAdminMutation,useListOrderForAdminQuery } from '../../../api/order.api'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import OrdersForm from './OrdersForm'
import './Orders.css'
import { toast } from 'react-toastify'

const AdminOrdersView = () => {
    const params = useParams()
    const [order, setOrder] = useState()
    const [loading, setLoading] = useState(false)
    const [editOrder] = useUpdateOrderForAdminMutation()
    const { data: orders, isLoading, error } = useListOrderDetailByIdForAdminQuery(params.id)
    const navigate = useNavigate()

    useEffect(() => {
        if (orders) {
          setOrder(orders.detail);            
        }
      }, [orders]);   

      const submitEvent =async(data)=>{
        setLoading(true)
        try{
            const submitData = {
                ...data,
                orderStatus:data.orderStatus.value
            }
            await editOrder({orderId:params.id, payload: submitData}).unwrap()
            toast.success("Order updated sucessfully")
            navigate('/admin/order_list')

        }catch(exception){
            console.log(exception)
            toast.error("Error while updating order")
        }
      }

  return (
    <div className='admin_margin_box'>
        <div className="admin_titles">
            <AdminTitle label1=" Order List" label2="/Order View" url="/admin/order_list" />
            <div className='Dashboard_title'>
            <h1>Order Details</h1>
            </div>
        </div>
        <div className='order_product_details'>
            <h1>Product Details</h1>
            {order && (
                <>
                    <div className="order_product_grid">
                        <div>
                            <img src={order.items[0].productImage} alt="" />
                        </div>
                        <div>
                            <div>
                                <label htmlFor="">Product title</label><br />
                                <input type="text" value={order.items.length > 0 ? order.items[0].title :'NA'} readOnly/>
                            </div>
                            <div>
                                <label htmlFor="">Ordered size</label><br />
                                <input type="text" value={order.items.length > 0 ? order.items[0].size :'NA'} readOnly/>
                            </div>
                            <div>
                                <label htmlFor="">Quantity</label><br />
                                <input type="text" value={order.items.length > 0 ? order.items[0].quantity :'NA'} readOnly/>
                            </div>
                        </div>
                        
                        
                    </div>
                </>
            )}
            
        
        
            <h1>Customer Details</h1>
            {
                order && (
                    <>
                        <div className="order_product_grid">
                            <div>
                                <label htmlFor="">Full name</label><br />
                                <input type="text" value={order?.customerId?.fullname} readOnly/>
                            </div>
                            <div>
                                <label htmlFor="">Email</label><br />
                                <input type="text" value={order?.customerId?.email} readOnly/>
                            </div>
                            <div>
                                <label htmlFor="">Phone number</label><br />
                                <input type="text" value={order?.customerId?.phone[0]} readOnly/> 
                            </div>
                            <div>
                                <label htmlFor="">Optional number</label><br />
                                <input type="text" value={order?.customerId?.optionalNumber} readOnly/>
                            </div>
                            <div>
                                <label htmlFor="">Address</label><br />
                                <input type="text" value={`${order?.customerId?.address}, ${order?.customerId?.city}`} readOnly/>
                            </div>
                            <div>
                                <label htmlFor="">Country</label><br />
                                <input type="text" value={order?.customerId?.country} readOnly/>
                            </div>
                            <div>
                                <label htmlFor="">Province</label><br />
                                <input type="text" value={order?.customerId?.province} readOnly/> 
                            </div>
                            <div>
                                <label htmlFor="">Landmark</label><br />
                                <input type="text" value={order?.customerId?.landMark} readOnly/>
                            </div>
                            <div>
                                <label htmlFor="">Postal code</label><br />
                                <input type="text" value={order?.customerId?.postalCode} readOnly/>
                            </div>
                        </div>                 
                    </>
                )
            }        
            <h1>Order Details</h1>
            {order && (
                <>
                    <div className="order_product_grid">
                        <div>
                            <label htmlFor="">Sub total</label><br />
                            <input type="text" value={`NPR. ${order?.subTotal}`} readOnly/> 
                        </div>
                        <div>
                            <label htmlFor="">Service Charge</label><br />
                            <input type="text" value={`NPR. ${order?.serviceCharge}`} readOnly/> 
                        </div>
                        <div>
                            <label htmlFor="">Vat</label><br />
                            <input type="text" value={`NPR. ${order?.vat}`} readOnly/>
                        </div>
                        <div>
                            <label htmlFor="">Discount</label><br />
                            <input type="text" value={`NPR. ${order?.discount}`} readOnly/>  
                        </div>
                        <div>
                            <label htmlFor="">Paymenet type</label><br />
                            <input type="text" value={order?.paymentType} readOnly/>  
                        </div> 
                        <div>
                            <label htmlFor="">Gross total</label><br />
                            <input type="text" value={`NPR. ${order?.total}`} readOnly/> 
                        </div>
                    </div>
                </>
            )}
        </div>
        <div className="order_status">
            <h1>Order Status</h1>
            <OrdersForm detail={
                {
                    orderStatus: {
                        label: order?.orderStatus === 'pending' && 'Pending' ||  order?.orderStatus === 'shipped' && 'Shipped' ||  order?.orderStatus === 'canceled' && 'Cancled' ||  order?.orderStatus === 'delevered' && 'Delevered',
                        value: order?.orderStatus
                      },
                }
            } submitEvent={submitEvent} loading={loading} />
        </div>
    </div>
  )
}

export default AdminOrdersView