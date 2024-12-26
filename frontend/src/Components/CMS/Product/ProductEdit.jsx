import React, { useState,useEffect } from 'react'
import { useEditProductMutation, useListByIdQuery } from '../../../api/product.api'
import { toast,ToastContainer } from 'react-toastify'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ProductForm from './ProductForm';

const ProductEdit = () => {
  // const [editproduct, isLoading]  = useEditProductMutation()
  const params = useParams()
  const [product, setProduct] = useState()
  const [loading, setLoading] = useState()
  const navigate = useNavigate()


  const {data:products,error, isLoading} = useListByIdQuery(params.id)
  const [editProduct] = useEditProductMutation()

    useEffect(()=>{
      if(products){
        setProduct(products.result)
      }
    },[products])
    console.log(product)

  const submitEvent = async(data)=>{
    setLoading(true)
    try{
       const formData = new FormData();          
        // Required fields
        formData.append("title", data.title);
        formData.append("price", data.price);

        // Optional fields with safe defaults
        formData.append("summary", data.summary || null);
        formData.append("description", data.description || null);
        formData.append("color", data.color || null);
        formData.append("fabric", data.fabric || null);
        formData.append("pattern", data.pattern || null);

        // Handle nested fields safely
        if (data.wearable?.value) {
            formData.append("wearable", data.wearable.value); // Send `value` only if it exists
        }
            
        if (data.sizes && data.sizes.length > 0) {
            data.sizes.forEach((size, index) => {
                formData.append(`sizes[${index}][size]`, size.size);
                formData.append(`sizes[${index}][quantity]`, size.quantity);
            });
        }

        if (data.productCollections && data.productCollections.length > 0) {
            data.productCollections.forEach((collection) => {
                formData.append("productCollections[]", collection.value); // Send collection IDs
            });
        }

        // Add images and files safely
        if (data.images && data.images.length > 0) {
            data.images.forEach((file) => formData.append("images", file));
        }
        if (data.mainImage) formData.append("mainImage", data.mainImage);
        if (data.video) formData.append("video", data.video);

        const response = await editProduct({id:params.id,  payload:formData}).unwrap();          
        toast.success("Product added successfully");
        navigate('/admin/product')


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
        <ProductForm detail={
                {
                    title:product?.title,
                    summary:product?.summary,
                    description:product?.description,
                    price:product?.price,
                    color:product?.color,
                    fabric:product?.fabric,
                    pattern:product?.pattern,
                    video:product?.video,
                    images:product?.images || [],
                    mainImage:product?.mainImage,                    
                    wearable: {
                      label: product?.wearable === 'Summer' && 'Summer' ||  product?.wearable === 'Winter' && 'Winter' ||  product?.wearable === 'Both' && 'Summer and Winter',
                      value: product?.wearable
                    },
                    sizes: product?.sizes || [], // Pass sizes directly
                    productCollections: product?.collections?.map((col) => ({
                      label: col.name,
                      value: col._id,
                    })) || [],
                }
            } 
            submitEvent={submitEvent}
            loading={loading}
            value='Update product'
        />
      </div>
    </div>
  )
}

export default ProductEdit