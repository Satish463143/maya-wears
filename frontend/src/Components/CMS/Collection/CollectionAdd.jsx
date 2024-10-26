import React, {useState} from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import * as Yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {toast} from 'react-toastify'

const CollectionAdd = () => {
    const [loading,setLoading] = useState(false)
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

    const submitEvent =(data)=>{
        setLoading(true)
        try{
            console.log(data)
        }catch(exception){
            console.error(exception)
            toast.error("Error while creating collection")
        }finally{
            setLoading(false)
        }
    }
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
                        <input type="text" name='name' required /><br />
                    </div>
                    <div>
                        <label htmlFor="content">Description</label><br />
                        <textarea type="text" name='content'/><br />
                    </div>
                    <div>
                        <label htmlFor="link">Status</label><br />
                        <select name="category" id="category" required >
                            <option value="">Set Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select><br />
                    </div>
                    <div>
                        <label htmlFor="image"> Image</label><br />
                        <input type="file" name='image'  required/><br />
                    </div>   
                </div>
                
                <div style={{display:'flex', justifyContent:'center'}}>
                    <input type="submit" value='Add Collection' name='addCollection' disabled={loading}/>
                </div>
            </form>
        </div>

    </div>
  )
}

export default CollectionAdd