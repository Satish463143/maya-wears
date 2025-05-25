import React, { useState } from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import collectionSvc from './Collection.service'
import { useNavigate } from 'react-router-dom'
import CollectionForm from './CollectionForm'
import { useCreateCollectionMutation, useListAllQuery } from '../../../api/collection.api';

const CollectionAdd = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const[createCollection] =  useCreateCollectionMutation()
    const submitEvent = async (data) => {
        setLoading(true);
        try {
            // Set up FormData to handle file upload
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description || "");  
            formData.append("status", data.status.value); 
            formData.append("category", data.category.value);
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

            await createCollection(formData).unwrap();            
            toast.success("Collection Created Successfully");
            navigate("/admin/collection");             
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
               <CollectionForm submitEvent={submitEvent} loading={loading} />
            </div>

        </div>
    )
}

export default CollectionAdd