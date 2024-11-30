import React, { useState } from 'react'
import { useEditProductMutation, useListByIdQuery } from '../../../api/product.api'
import { toast,ToastContainer } from 'react-toastify'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'

const ProductEdit = () => {
  // const [editproduct, isLoading]  = useEditProductMutation()
  const [loading, setLoading] = useState()

  const [data,error, isLoading] = useListByIdQuery(null)

  const updateData = ()=>{
    setLoading(true)
    try{

    }catch(exception){
      console.log("error ", exception)
      toast.error('Error While Updating Product')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='admin_margin_box'>
      <ToastContainer />
      <div className="admin_titles">
        <AdminTitle label1=" Product List" label2="/Edit Product" url="/admin/product" />
        <div className='Dashboard_title'>
          <h1>Edit Product</h1>
        </div>
      </div>

      <div className="banner_form">

      </div>
    </div>
  )
}

export default ProductEdit