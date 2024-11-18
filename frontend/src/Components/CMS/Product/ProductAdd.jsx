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
            const productData = {
                ...data,
                wearable: data.wearable.value,
                isFeatured: data.isFeatured.value
            }
            console.log(productData)
            const response = await productSvc.postRequest('/product', productData, { file: true })
            console.log(response)
            toast.success(response.message)
            // setTimeout(()=> navigate('/admin/product'))

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