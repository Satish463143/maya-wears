import React, {useState} from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { ToastContainer, toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom'
import PromoForm from './PromoForm';
import { useCreateMutation } from '../../../api/promo.api';

const PromoAdd = () => {
  const [laoding, setLoading] = useState(false)
  const [createPromo] = useCreateMutation()
  const navigate = useNavigate()
  const submitEvent = async(data)=>{
    setLoading(true)
    const submitData = {
      ...data
    }
    try{
      const response = await createPromo(submitData).unwrap()
      toast.success("promo added sucessfully")
      navigate('/admin/promo_code')
    }catch(exception){
      if (exception.status === 400) {
        //Object.keys({email:""})=>["email"].map((filed))
        Object.keys(exception.data.result).map((field) => {
          setError(field, { message: exception.data.result[field] });
        });
      }
      toast.error(exception.data.message);
    }
    finally{
      setLoading(false)
    } 

  }
  return (
    <div className='admin_margin_box'>
       <div className="admin_titles">
            <AdminTitle label1=" Promo List" label2="/Add Promo" url="/admin/promo_code"/>
            <div className='Dashboard_title'>
                <h1>Add Promo </h1>
            </div>
        </div>
        <ToastContainer />
        <div className="banner_form">
          <PromoForm submitEvent={submitEvent} loading={laoding} value='Add Promo'/>
        </div>
    </div>
  )
}

export default PromoAdd