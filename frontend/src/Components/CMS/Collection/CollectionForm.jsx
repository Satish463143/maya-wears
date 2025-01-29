import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { OptionsCompoentt,  TextAreaInput, TextInputComponent,CategoryOptionsCompoent } from '../../../Middlewares/Form/Input.component'


const CollectionForm = ({submitEvent,loading,value,detail=null}) => {
    

    const collectionDTO = Yup.object({
        name: Yup.string().min(3).max(50).required(),
        description: Yup.string().min(3).max(50).nullable().optional().default(null),
        status: Yup.object({
            label:Yup.string().matches(/^(Active|Inactive)$/),
            value: Yup.string().matches(/^(active|inactive)$/).required()
        }).required(),
        category: Yup.object({
            label: Yup.string().matches(/^(Image|Video)$/),
            value: Yup.string().matches(/^(image|video)$/).required()
        }).required(),
        desktopImage: Yup.mixed().nullable().notRequired(),
        mobileImage: Yup.mixed().nullable().notRequired(),
        desktopVideo: Yup.mixed().nullable().notRequired(),
        mobileVideo: Yup.mixed().nullable().notRequired(),
})     
    const { control, handleSubmit, setValue,  formState: { errors } } = useForm({
        resolver: yupResolver(collectionDTO)
    })

    useEffect(()=>{
        if(detail){
            setValue("name", detail.name)
            setValue("description", detail.description)
            setValue("status", detail.status)
            setValue("category", detail.category)
            setValue("desktopImage", detail.desktopImage)
            setValue("mobileImage", detail.mobileImage)
            setValue("desktopVideo", detail.desktopVideo)
            setValue("mobileVideo", detail.mobileVideo)
        }
    },[detail])

  return (
    <form onSubmit={handleSubmit(submitEvent)}>
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
                <label htmlFor="description">Description</label><br />
                <TextAreaInput
                    name="description"
                    control={control}
                    defaultValue=''
                    errMsg={errors?.content?.message}
                />
            </div>
            <div>
                <label htmlFor="category">Category</label><br />
                <CategoryOptionsCompoent 
                    name="category"
                    control={control}
                    errMsg={errors?.category?.message}
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
                <label htmlFor="mobileImage"> Mobile Image</label><br />
                <input
                    type='file'
                    onChange={(e) => {
                        const image = e.target.files['0']
                        setValue('mobileImage', image)
                    }}
                /><br />
            </div>
            <div>
                <label htmlFor="desktopImage"> Desktop Image</label><br />
                <input
                    type='file'
                    onChange={(e) => {
                        const image = e.target.files['0']
                        setValue('desktopImage', image)
                    }}
                /><br />
            </div>
             <div>
                <label htmlFor="desktopVideo"> Desktop Video</label><br />                
                <input
                    type='file'
                    onChange={(e) => {
                        const image = e.target.files['0']
                        setValue('desktopVideo', image)
                    }}
                /><br />
            </div>
            <div>
                <label htmlFor="mobileVideo"> Mobile Video</label><br />
                <input
                    type='file'
                    onChange={(e) => {
                        const image = e.target.files['0']
                        setValue('mobileVideo', image)
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

export default CollectionForm