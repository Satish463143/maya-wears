import React from 'react'

const MyAccountComponent = ({id,image,name,quantity,size,total,status}) => {
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <td>Product Image</td>
                    <td>Product Name</td>
                    <td>Quantity</td>
                    <td>Size</td>
                    <td>Total</td>
                    <td>Status</td>
                    <td></td>
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
              </tr>
            </tbody>
        </table>
    </div>
  )
}

export default MyAccountComponent