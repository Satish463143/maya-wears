import React, {useState} from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import * as Yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {toast} from 'react-toastify'
import { OptionsCompoentt, SelectInputField, SubmitButton, TextAreaInput, TextInputComponent } from '../../../Middlewares/Form/Input.component'
import collectionSvc from './Collection.service'
import { useNavigate } from 'react-router-dom'

const CollectionAdd = () => {
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()


    const collectionDTO = Yup.object({
        name:Yup.string().min(3).max(50).required(),
        decription:Yup.string().min(3).max(50).nullable().optional().default(null),
        status:Yup.object({
            value:Yup.string().matches(/^(active|inactive)$/).required()
        }).required(),
        image:Yup.string().required()
    })
    const {control, handleSubmit, setValue, setError, formState:{errors}} = useForm({
        resolver:yupResolver(collectionDTO)
    })

    const submitEvent = async (data) => {
        setLoading(true);
        try {
            console.log('Form Data:', data);  // Log data to check the structure
            
            // Set up FormData to handle file upload
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description || "");  // Make sure this aligns with server field name
            formData.append("status", data.status.value);  // Adjust based on object structure
            formData.append("image", data.image);  // Ensure file upload
    
            await collectionSvc.postRequest("/collection", formData, { auth: true, file: true });
            toast.success("Collection Created Successfully");
            navigate("/admin/collection");
        } catch (exception) {
            console.error(exception, "Error here");
            toast.error("Error while creating collection");
        } finally {
            setLoading(false);
        }
    };
    
      return (
    <div className='admin_margin_box'>
      <div className="admin_titles">
        <AdminTitle label1=" Collection List" label2="/Add Collection" url="/admin/collection"/>
        <div className='Dashboard_title'>
            <h1>Add Collection</h1>
        </div>
      </div>

      <div className="banner_form">
            <form  onSubmit={handleSubmit(submitEvent)}>
                <h3>Content</h3>
                <div className="from_grid">
                    <div>
                        <label htmlFor="name">Collection Name</label><br />
                       <TextInputComponent
                            name="name"
                            control={control}
                            type='text'
                            defaultValue=''
                            errMsg={errors?.name?.message}
                            required:true
                       
                       />
                    </div>
                    <div>
                        <label htmlFor="decription">Description</label><br />
                        <TextAreaInput
                            name="decription"
                            control={control}
                            defaultValue=''
                            errMsg={errors?.content?.message}
                        />
                    </div>
                    <div>
                        <label htmlFor="status">status</label><br />
                        <OptionsCompoentt 
                            name="status"
                            control={control}
                            errMsg={errors?.status?.message}
                            required:true
                        />
                    </div>
                    <div>
                        <label htmlFor="image"> Image</label><br />
                        <input 
                            type='file'
                            onChange={(e)=>{
                                const image = e.target.files['0']
                                setValue('image',image)
                            }}
                            required
                        /><br />
                    </div>   
                </div>
                
                <div style={{display:'flex', justifyContent:'center'}}>
                    <SubmitButton
                        value= "Add Collection"
                    />
                </div>
            </form>
        </div>

    </div>
  )
}

export default CollectionAdd