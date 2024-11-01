import React, { useState } from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import collectionSvc from './Collection.service'
import { useNavigate } from 'react-router-dom'
import CollectionForm from './CollectionForm'

const CollectionAdd = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [imageFile, setImageFile] = useState(null);

    

    const submitEvent = async (data) => {
        setLoading(true);
        try {
            // Set up FormData to handle file upload
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description || "");  // Make sure this aligns with server field name
            formData.append("status", data.status.value);  // Adjust based on object structure
            formData.append("image", imageFile);  // Ensure file upload

            await collectionSvc.postRequest("/collection", formData, { auth: true, file: true });
            
            // toast.success("Collection Created Successfully");
            // navigate("/admin/collection");
            toast.success("Collection Created Successfully", {
                onClose: () => navigate("/admin/collection"), // Navigates after the toast shows
              }); 
            
        } catch (exception) {
             // Default error message
            let errorMessage = "Error while creating collection";

            // Check if response has data and specific field errors
            if (exception.data) {
                const data = exception.data;
        
                if (data.result) {
                    // Use field-specific errors
                    errorMessage = Object.values(data.result).join(", ");
                } else if (data.message) {
                    errorMessage = data.message;
                }
            }

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
                <AdminTitle label1=" Collection List" label2="/Add Collection" url="/admin/collection" />
                <div className='Dashboard_title'>
                    <h1>Add Collection</h1>
                </div>
            </div>

            <div className="banner_form">
               <CollectionForm submitEvent={submitEvent} loading={loading} setImageFile={setImageFile} />
            </div>

        </div>
    )
}

export default CollectionAdd