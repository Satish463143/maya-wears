import React, {useState} from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useShowByIdQuery, useUpdateMutation } from '../../../api/promo.api'
import PromoForm from './PromoForm'

const PromoEdit = () => {
   const [loading,setLoading] = useState(false) 
    const params = useParams();
    const navigate = useNavigate() 
  
    const {data, error, isLoading} = useShowByIdQuery(params.id)
    const [editPromo] = useUpdateMutation()
  
    const promos = data?.result

    const submitEvent = async(data)=>{
      setLoading(true)
      const submitData = {
        ...data
      }
      try{
        await editPromo({id:params.id, payload:submitData}).unwrap()
        toast.success("promo updated sucesssfully")
        navigate('/admin/promo_code')

      }catch(exception){
        toast.error("Error while updating promos")

      }finally{
        setLoading(false)
        
      }
      

    }
  return (
    <div className='admin_margin_box'>
        <div className="admin_titles">
            <AdminTitle label1=" Promo List" label2="/Edit_Banner" url="/admin/promo_code"/>
            <div className='Dashboard_title'>
                <h1>Edit Promo Code </h1>
            </div>
        </div>
        <ToastContainer />
        <div className="banner_form">
          <PromoForm
           detail={
            promos
                ? {
                      promoName: promos.promoName,
                      promoCode: promos.promoCode,                      
                      discount: promos.discount,
                      button: promos.button,
                      validFrom: promos.validFrom ? promos.validFrom.split('T')[0] : '',
                      validTo: promos.validTo ? promos.validTo.split('T')[0] : '',                      
                  }
                : null
              }          
            submitEvent={submitEvent} value='Update Banner'
          />
        </div>
    </div>
  )
}

export default PromoEdit