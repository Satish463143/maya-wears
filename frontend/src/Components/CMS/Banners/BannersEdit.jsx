import React, {useState,useEffect} from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useListAllQuery, useShowByIdQuery, useUpdateMutation } from '../../../api/banners.api'
import BannersForm from './BannersForm'

const BannersEdit = () => {
  const [loading,setLoading] = useState(false) 
  const [banners, setBanners] = useState()
  const params = useParams();
  const navigate = useNavigate() 

  const {data:banner, error, isLoading} = useShowByIdQuery(params.id)
  const [editBanner] = useUpdateMutation()

  useEffect(()=>{
    if(banner){
      setBanners(banner.result)
    }
  },[banner])

  const submitEvent =async(data)=>{
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
        await editBanner({id:params.id, payload:formData}).unwrap();
        toast.success("Banner updated Successfully");
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
            <AdminTitle label1=" Banner 1 List" label2="/Edit_Banner" url="/admin/banners"/>
            <div className='Dashboard_title'>
                <h1>Edit Banner </h1>
            </div>
        </div>
        <ToastContainer />
        <div className="banner_form">
          <BannersForm
           detail={
            banners
                ? {
                      title: banners.title,
                      content: banners.content,
                      category: {
                          label: banners.category === "image" ? "Image" : "Video",
                          value: banners.category,
                      },
                      status: {
                          label: banners.status === "active" ? "Active" : "Inactive",
                          value: banners.status,
                      },
                      link: banners.link,
                      desktopImage: banners.desktopImage,
                      mobileImage: banners.mobileImage,
                      desktopVideo: banners.desktopVideo,
                      mobileVideo: banners.mobileVideo,
                  }
                : null
              }          
            submitEvent={submitEvent} value='Update Banner'
          />
        </div>
    </div>
  )
}

export default BannersEdit