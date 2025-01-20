
import React, {useState,useEffect} from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { ToastContainer, toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom'
import BannersForm from './BannersForm';
import { useCreateMutation, useListAllQuery } from '../../../api/banners.api';

const BannersAdd = () => {
  const [laoding, setLoading] = useState()
  const [craeteBanner] = useCreateMutation()
  const navigate = useNavigate()
  
  const submitEvent = async(data)=>{
    setLoading(true);
        try{
          const formData = new FormData();
          // Append form fields
          formData.append("title", data.title);
          formData.append("content", data.content || "");
          formData.append("link", data.link || "");
          formData.append("category", data.category.value);
          formData.append("status", data.status.value);
  
          // Append files conditionally
          if (data.mobileImage instanceof File) {
              formData.append("mobileImage", data.mobileImage);
          }
          if (data.desktopImage instanceof File) {
              formData.append("desktopImage", data.desktopImage);
          }
          if (data.mobileVideo instanceof File) {
              formData.append("mobileVideo", data.mobileVideo);
          }
          if (data.desktopVideo instanceof File) {
              formData.append("desktopVideo", data.desktopVideo);
          }           
            await craeteBanner(formData).unwrap();
            toast.success("Banner created Successfully");
            navigate('/admin/banners')
        }catch(exception){
            let errorMessage = "Error while creating banner";
            toast.error(errorMessage);
            console.error(exception, "Error here");
        }finally{
            setLoading(false)
        }


  }
  return (
    <div className='admin_margin_box'>
       <div className="admin_titles">
            <AdminTitle label1=" Banner List" label2="/Add Banner" url="/admin/banners"/>
            <div className='Dashboard_title'>
                <h1>Add Banner </h1>
            </div>
        </div>
        <ToastContainer />
        <div className="banner_form">
          <BannersForm submitEvent={submitEvent} loading={laoding} value='Add Banner'/>
        </div>
    </div>
  )
}

export default BannersAdd