import React from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const MyAccountComponent = ({id,image,name,quantity,size,total,status,ordersStatus,deleteAction,rowId}) => {
  const handleDelete = async(e)=>{
          e.preventDefault()
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
                  deleteAction(rowId)
                }
  
          }catch(exception){
              console.log(exception)
              toast.error("Error canceling order")
          }
      }
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Size</th>
                    <th>Total</th>
                    <th>Status</th>
                    {ordersStatus === 'pending' && <th>Action</th> }                    
                </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src={image} alt={name} /></td>
                <td><h1>{name}</h1></td>
                <td><h1>{quantity}</h1></td>
                <td><h1>{size}</h1></td>
                <td><h1>Rs.{total}/-</h1></td>
                <td>{status}</td>
                {ordersStatus === 'pending' && <td onClick={handleDelete}>Cancel Order</td> } 
              </tr>
            </tbody>
        </table>
    </div>
  )
}

export default MyAccountComponent