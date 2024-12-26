import React, { useState } from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductForm from './ProductForm';
import { useNavigate } from 'react-router-dom'
import { useCreateProductMutation } from '../../../api/product.api';

const ProductAdd = () => {
    const [loading, setLoading] = useState(false)
    const [craeteProduct] = useCreateProductMutation()
    const navigate = useNavigate()

    const submitEvent = async (data) => {
        setLoading(true);
        try {
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
    
            const response = await craeteProduct(formData).unwrap();          
            toast.success("Product added successfully");
            navigate('/admin/product')
            
        } catch (exception) {
            console.error("Error while adding product:", exception);
            toast.error("Error while adding product");
        } finally {
            setLoading(false);
        }
    };

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
                    value='Add product'
                />
            </div>
        </div>
    )
}

export default ProductAdd