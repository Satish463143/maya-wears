import React, { useEffect, useState } from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import collectionSvc from './Collection.service'
import { useNavigate, useParams } from 'react-router-dom'
import CollectionForm from './CollectionForm'
import LoadingComponent from '../../../Middlewares/Loading/Loading.component';
import { useShowByIdQuery, useUpdateCollectionMutation, useListAllQuery } from '../../../api/collection.api';

const CollectionEdit = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [imageFile, setImageFile] = useState(null);
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

      if (imageFile) {
        formData.append("image", imageFile);  
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
                  image: collection.image
                  }
                : null
              }          
              submitEvent={submitEvent} value='Update collection' loading={loading} setImageFile={setImageFile} 
          />
      </div>

    </div>
  )
}

export default CollectionEdit