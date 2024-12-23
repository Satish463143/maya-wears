import React, { useEffect, useState } from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import collectionSvc from './Collection.service'
import { useNavigate, useParams } from 'react-router-dom'
import CollectionForm from './CollectionForm'
import LoadingComponent from '../../../Middlewares/Loading/Loading.component';

const CollectionEdit = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [imageFile, setImageFile] = useState(null);
  const [collection, setCollection] = useState()
  const params = useParams();

  const getDetail = async () => {
    try {
      const detail = await collectionSvc.getRequest("/collection/" + params.id, { auth: true })
      setCollection(detail.result)
      setLoading(false)
    } catch (exception) {
      console.log(exception)
      toast.error("Error while fetching collection", {
        onClose: () => navigate("/admin/collection"), // Navigates after the toast shows
      });
    }
  }

  useEffect(() => {
    getDetail()
  }, [])

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


      await collectionSvc.putRequest("/collection/" + params.id, formData, { auth: true, file: true });

      toast.success("Collection Updated Successfully");
      setTimeout(() => navigate("/admin/collection"), 1000);

    } catch (exception) {
      // Default error message
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
        {loading ? <><LoadingComponent /></> :
          <>
            <CollectionForm detail={
              {
                name: collection.name,
                description: collection.description,
                status: {
                  label: collection.status === 'active' ? 'Active' : 'Inactive',
                  value: collection.status
                },
                image: collection.image
              }
            } submitEvent={submitEvent} loading={loading} setImageFile={setImageFile} />
          </>}
      </div>

    </div>
  )
}

export default CollectionEdit