import React, { useState } from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductForm from './ProductForm';
import { useNavigate } from 'react-router-dom'
import productSvc from './Product.service';

const ProductAdd = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const submitEvent = async (data) => {
        setLoading(true)
        try {
            // const productData = {
            //     ...data,
            //     wearable: data.wearable.value,
            //     isFeatured: data.isFeatured.value,
            //     productCollections: data.productCollections.map((item) => item.value),
            // }
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("summary", data.summary || null);
            formData.append("description", data.description || null);
            formData.append("price", data.price);
            formData.append("promoCode", data.promoCode || null);
            formData.append("color", data.color || null);
            formData.append("fabric", data.fabric || null);
            formData.append("pattern", data.pattern || null);
            formData.append("discount", data.discount || null);
    
            // Handle nested fields
            formData.append("wearable", data.wearable?.value); // Send `value` of wearable
            data.sizes.forEach((size, index) => {
                formData.append(`sizes[${index}][size]`, size.size);
                formData.append(`sizes[${index}][quantity]`, size.quantity);
            });
    
            // Handle array fields
            data.productCollections?.forEach((collection) => {
                formData.append("productCollections[]", collection.value); // Send collection IDs
            });
    
            // Add images and files
            data.images?.forEach((file) => formData.append("images", file));
            if (data.mainImage) formData.append("mainImage", data.mainImage);
            if (data.featureDesktopImage) formData.append("featureDesktopImage", data.featureDesktopImage);
            if (data.featureMobileImage) formData.append("featureMobileImage", data.featureMobileImage);
            if (data.video) formData.append("video", data.video);
            // console.log(productData)
            await productSvc.postRequest('/product', formData, { auth: true, file: true })
            toast.success("product added sucessfully")
            // setTimeout(() => navigate('/admin/product'), 1000)

        } catch (exception) {
            console.log(exception)
            toast.error("Error while adding  product")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='admin_margin_box'>
            <ToastContainer />
            <div className="admin_titles">
                <AdminTitle label1=" Product List" label2="/Add Product" url="/admin/product" />
                <div className='Dashboard_title'>
                    <h1>Add Product</h1>
                </div>
            </div>
            <div className="banner_form">
                <ProductForm
                    submitEvent={submitEvent}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default ProductAdd