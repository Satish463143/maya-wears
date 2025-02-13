import React,{useEffect} from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextInputComponent } from '../../../Middlewares/Form/Input.component'
const PromoForm = ({submitEvent,loading,detail=null,value}) => {

    const promoDTO = Yup.object({
        promoName:Yup.string().min(3).max(50).required(),
        promoCode:Yup.string().required(),
        discount:Yup.number().required(),
        validFrom:Yup.date().required(),
        validTo:Yup.date().required(),
    })
    const { control, handleSubmit, setValue,  formState: { errors } } = useForm({
            resolver: yupResolver(promoDTO)
        })

    useEffect(()=>{
    if(detail){
        setValue("promoName", detail.promoName)
        setValue("promoCode", detail.promoCode)
        setValue("discount", detail.discount)
        setValue("validFrom", detail.validFrom)
        setValue("validTo", detail.validTo)   
    }
    },[detail, setValue])
  return (
    <form  onSubmit={handleSubmit(submitEvent)}>
        <h3>Content</h3>
        <div className="from_grid">
            <div>
                <label htmlFor="promoName">Promo Name</label><br />
                <TextInputComponent
                    name="promoName"
                    control={control}
                    type='text'
                    defaultValue=''
                    errMsg={errors?.promoName?.message}
                    required:true
                />
            </div>
            <div>
                <label htmlFor="promoCode">Promo Code</label><br />
                <TextInputComponent
                    name="promoCode"
                    control={control}
                    type='text'
                    defaultValue=''
                    errMsg={errors?.promoCode?.message}
                    required:true
                />
            </div>
            <div>
                <label htmlFor="discount">Discount (in %)</label><br />
                <TextInputComponent
                    name="discount"
                    control={control}
                    type='number'
                    defaultValue=''
                    errMsg={errors?.discount?.message}
                    required:true
                />
            </div>
            <div>
                <label htmlFor="validFrom">Valid From (mm/dd/yyyy)</label><br />
                <TextInputComponent
                    name="validFrom"
                    control={control}
                    type='date'
                    defaultValue=''
                    errMsg={errors?.validFrom?.message}
                    required:true
                />
            </div>
            <div>
                <label htmlFor="validTo">Valid To (mm/dd/yyyy)</label><br />
                <TextInputComponent
                    name="validTo"
                    control={control}
                    type='date'
                    defaultValue=''
                    errMsg={errors?.validTo?.message}
                    required:true
                />
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <input className='submit_btn' type="submit" value={value} disabled={loading} />
        </div>
    </form>
  )
}

export default PromoForm