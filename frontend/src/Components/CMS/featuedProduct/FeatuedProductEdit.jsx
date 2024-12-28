import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { useShowByIdQuery,useListAllQuery, useUpdateMutation } from '../../../api/featuredProduct.api'
import FeatuedProductForm from './FeatuedProductForm'
import { toast } from 'react-toastify'

const FeatuedProductEdit = () => {
  const params = useParams()
  const [product, setProduct] = useState()
  const [loading, setLoading] = useState(false)

  const [editFeaturedProduct] = useUpdateMutation()
  const {data: products, error, isLoading} = useShowByIdQuery(params.id)
  const { refetch} = useListAllQuery()
  const navigate = useNavigate()

  useEffect(()=>{
    if(products){
      setProduct(products.result)
    }
  },[products])

  
  const submitEvent = async(data)=>{
    setLoading(true)
    const fromData = new FormData();
      fromData.append("status", data.status.value); // Add status as a string
      fromData.append("title", data.title); // Add other fields
      fromData.append("subTitle", data.subTitle);
      fromData.append("link", data.link);
      fromData.append("desktopImage", data.desktopImage); // Add file
      fromData.append("mobileImage", data.mobileImage);
    try{
      await editFeaturedProduct({id:params.id, payload: fromData})
      toast.success("product updated sucessfully")      
      navigate('/admin/featured_product')
      refetch()
      
    }catch(exception){
      console.log(exception)
      toast.error("Error while updating prouct")
    }
    finally{
      setLoading(false)
    }
    
  }

  return (
    <div className='admin_margin_box'>
      <div className="admin_titles">
        <AdminTitle label1=" Product List" label2="/Edit Product" url="/admin/featured_product" />
        <div className='Dashboard_title'>
        <h1>Edit product</h1>
        </div>
      </div>
      <div className="banner_form">
            <h1>Order Status</h1>
            <FeatuedProductForm detail={
                {
                    title:product?.title,
                    subTitle:product?.subTitle,
                    link:product?.link,
                    status: {
                      label: product?.status === 'active' ? 'Active': 'Inactive',
                      value: product?.status
                    },
                    desktopImage:product?.desktopImage,
                    mobileImage:product?.mobileImage,
                }
            } submitEvent={submitEvent} loading={loading} value='Update product'/>
        </div>

    </div>
  )
}

export default FeatuedProductEdit