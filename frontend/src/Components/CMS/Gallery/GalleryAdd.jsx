import React, { useState } from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateMutation, useListAllGalleryQuery } from '../../../api/gallery.api';
import { useNavigate } from 'react-router-dom'
import GalleryForm from './GalleryForm';

const GalleryAdd = () => {
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
            navigate('/admin/gallery')

        }catch(exception){
            toast.error('Error while adding photos')
        }
        finally{
            setLoading(false)
        }  
    }   

  return (
    <div className='admin_margin_box'>
        <ToastContainer />
        <div className="admin_titles">
            <AdminTitle label1=" Gallery List" label2="/Add Gallery" url="/admin/gallery" />
            <div className='Dashboard_title'>
                <h1>Add Gallery</h1>
            </div>
        </div>
        <div className='banner_form'>
            <GalleryForm submitEvent={submitEvent} value='Add photos'loading={loading}/>
        </div>
    </div>
  )
}

export default GalleryAdd