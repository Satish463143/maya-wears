import React,{useEffect} from 'react'
import * as Yup from 'yup'
import { useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { OptionsCompoentt, TextInputComponent } from '../../../Middlewares/Form/Input.component'


const FeatuedProductForm = ({submitEvent,loading,detail=null,value}) => {

    const productDTO = Yup.object({
        title:Yup.string().min(2).max(50).required('Title filed is required'),
        subTitle:Yup.string().required().nullable().notRequired(),
        link:Yup.string().required('Link is required'),
        status: Yup.object({
            label:Yup.string().matches(/^(Active|Inactive)$/),
            value: Yup.string().matches(/^(active|inactive)$/).required('Please select a status')
        }).required(),
        desktopImage:Yup.mixed().required('Desktop image is required'),
        mobileImage:Yup.mixed().required('Mobile image is required'),
    })

    const { control, handleSubmit, setValue,  formState: { errors } } = useForm({
            resolver: yupResolver(productDTO)
        }) 

    useEffect(()=>{
        if(detail){
            setValue("title", detail.title)
            setValue("subTitle", detail.subTitle)
            setValue("link", detail.link)
            setValue("desktopImage", detail.desktopImage)
            setValue("mobileImage", detail.mobileImage)
            setValue("status", detail.status)    
        }
    },[detail])
    
  return (
    <form action="" onSubmit={handleSubmit(submitEvent)}>
        <div className="from_grid">
            <div>
                <label htmlFor="title">Product Title</label><br />
                <TextInputComponent
                    name='title'
                    control={control}
                    type='text'
                    defaultValue=''
                    errMsg={errors?.title?.message}
                    required:true
                />
            </div>
            <div>
                <label htmlFor="title">Product sub title</label><br />
                <TextInputComponent
                    name='subTitle'
                    control={control}
                    type='text'
                    defaultValue=''
                    errMsg={errors?.subTitle?.message}
                    required:true
                />
            </div>
            <div>
                <label htmlFor="title">Link</label><br />
                <TextInputComponent
                    name='link'
                    control={control}
                    type='text'
                    defaultValue=''
                    errMsg={errors?.link?.message}
                    required:true
                />
            </div>
            <div>
                <label htmlFor="status">Status</label><br />
                <OptionsCompoentt
                    name="status"
                    control={control}
                    errMsg={errors?.status?.message}
                    required:true
                />
            </div>
            <div>
                <label htmlFor="desktopImage"> Desktop image</label><br />
                <input
                    type='file'
                    onChange={(e) => {
                        const desktopImage = e.target.files['0']
                        setValue('desktopImage', desktopImage)
                    }}
                /><br />
            </div>
            <div>
                <label htmlFor="mobileImage"> Mobile image</label><br />
                <input
                    type='file'
                    onChange={(e) => {
                        const mobileImage = e.target.files['0']
                        setValue('mobileImage', mobileImage)
                    }}
                /><br />
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center'}}>            
            <input className='submit_btn' type="submit" value={value} disabled={loading} style={{cursor:'pointer'}}/>
        </div>
    </form>
  )
}

export default FeatuedProductForm