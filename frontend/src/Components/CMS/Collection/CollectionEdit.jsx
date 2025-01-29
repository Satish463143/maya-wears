import React, { useEffect, useState } from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom'
import CollectionForm from './CollectionForm'
import { useShowByIdQuery, useUpdateCollectionMutation } from '../../../api/collection.api';

const CollectionEdit = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [collection, setCollection] = useState()
  

  const {data:collections,error,isLoading} = useShowByIdQuery(params.id)
  const [updateCollection] = useUpdateCollectionMutation()

  useEffect(()=>{
    if(collections){
      setCollection(collections?.result)
    }
  },[collections])
 

  const submitEvent = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");  
      formData.append("status", data.status.value);  
      formData.append("category", data.category.value);

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

      if (typeof data.image === 'string') {
        delete formData.image
      }
      await updateCollection({id:params.id, payload:formData}).unwrap();

      toast.success("Collection Updated Successfully");
      navigate('/admin/collection')
    } catch (exception) {
      let errorMessage = "Error while updating collection";
      toast.error(errorMessage);
      console.error(exception, "Error here");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='admin_margin_box'>
      <ToastContainer />
      <div className="admin_titles">
        <AdminTitle label1=" Collection List" label2="/Edit Collection" url="/admin/collection" />
        <div className='Dashboard_title'>
          <h1>Edit Collection</h1>
        </div>
      </div>

      <div className="banner_form">        
            <CollectionForm
              detail={
              collection
                ? {
                  name: collection.name,
                  description: collection.description,
                  status: {
                    label: collection.status === 'active' ? 'Active' : 'Inactive',
                    value: collection.status
                  },
                  category: {
                    label: banners.category === "image" ? "Image" : "Video",
                    value: banners.category,
                  },
                  desktopImage: banners.desktopImage,
                  mobileImage: banners.mobileImage,
                  desktopVideo: banners.desktopVideo,
                  mobileVideo: banners.mobileVideo,
                  }
                : null
              }          
              submitEvent={submitEvent} value='Update collection' loading={loading}  
          />
      </div>

    </div>
  )
}

export default CollectionEdit