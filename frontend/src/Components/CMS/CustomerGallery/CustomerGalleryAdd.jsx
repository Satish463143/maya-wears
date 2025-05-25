import React, { useState } from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { useCreateMutation } from '../../../api/customergallery.api';
import CustomerGalleryForm from './CustomerGalleryForm';

const CustomerGalleryAdd = () => {
    const [loading, setLoading] = useState(false)
    const [addGallery] = useCreateMutation()
    const navigate = useNavigate()

    const submitEvent = async(data)=>{
        setLoading(true)
        try{
            const formData = new FormData()
            if (data.images && data.images.length > 0) {
                data.images.forEach((file) => formData.append("images", file));
            }
            await addGallery(formData).unwrap()
            toast.success("Photos added sucessfully")
            navigate('/admin/customerGallery')

        }catch(exception){
            toast.error(exception?.data?.message || 'Error while adding photos')
        }
        finally{
            setLoading(false)
        }  
    }   

  return (
    <div className='admin_margin_box'>
        <ToastContainer />
        <div className="admin_titles">
            <AdminTitle label1="Customer Gallery List" label2="/Add Gallery" url="/admin/gallery" />
            <div className='Dashboard_title'>
                <h1>Add Gallery</h1>
            </div>
        </div>
        <div className='banner_form'>
            <CustomerGalleryForm submitEvent={submitEvent} value='Add photos'loading={loading}/>
        </div>
    </div>
  )
}

export default CustomerGalleryAdd