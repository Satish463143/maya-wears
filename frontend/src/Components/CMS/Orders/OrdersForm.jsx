import React,{useEffect} from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { OrderStatusOptionsCompoent } from '../../../Middlewares/Form/Input.component'

const OrdersForm = ({submitEvent,loading,detail=null}) => {

    const orderDTO = Yup.object({
        orderStatus: Yup.object({
                    label:Yup.string().matches(/^(Pending|Shipped|Canceled|Delevered)$/),
                    value: Yup.string().matches(/^(pending|shipped|canceled|delevered)$/).required()
                }).required()
    })
    const { control, handleSubmit, setValue,  formState: { errors } } = useForm({
            resolver: yupResolver(orderDTO)
        })
        useEffect(()=>{
            if(detail){
                setValue("orderStatus", detail.orderStatus)                   
            }
        },[detail])
    
  return (
    <form action="" onSubmit={handleSubmit(submitEvent)}>
        <OrderStatusOptionsCompoent
            name="orderStatus"
            control={control}
            errMsg={errors?.status?.message}
            required:true
        />
        <div style={{ display: 'flex', justifyContent: 'center'}}>            
            <input className='submit_btn' type="submit" value="Update order" disabled={loading} style={{cursor:'pointer'}}/>
        </div>

    </form>
  )
}

export default OrdersForm