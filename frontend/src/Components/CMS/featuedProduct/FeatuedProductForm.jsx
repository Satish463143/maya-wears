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
        desktopImage: Yup.mixed().nullable().notRequired(),
        mobileImage: Yup.mixed().nullable().notRequired(),
    })

    const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
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
    },[detail, setValue])

    const handleImageUpload = (e, fieldName) => {
        const files = Array.from(e.target.files);
        const existingImages = getValues(fieldName) || [];
        setValue(fieldName, [...existingImages, ...files]);
    };
    
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
                <label>Desktop Image</label>
                <input
                    type='file'
                    onChange={(e) => {
                        const image = e.target.files['0']
                        setValue('desktopImage', image)
                    }}
                /><br />
            </div>
            <div>
                <label>Mobile Image</label>
                <input
                    type='file'
                    onChange={(e) => {
                        const image = e.target.files['0']
                        setValue('mobileImage', image)
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