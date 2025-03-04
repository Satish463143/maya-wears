import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CategoryOptionsCompoent,  TextAreaInput, TextInputComponent } from '../../../Middlewares/Form/Input.component'



const BannerForm = ({submitEvent,loading,detail=null}) => {

    const bannerDTO = Yup.object({
        title: Yup.string().min(3).max(50).required(),
        content: Yup.string().min(3).max(50).nullable().optional().default(null),
        category: Yup.object({
            label: Yup.string().matches(/^(Image|Video)$/),
            value: Yup.string().matches(/^(image|video)$/).required()
        }).required(),
        link: Yup.string().url().nullable().optional().default(null),
        button: Yup.string().nullable().optional().default(null),
        desktopImage: Yup.mixed().required("Desktop Image is required"),
        mobileImage: Yup.mixed().required("Mobile Image is required"),
        desktopVideo: Yup.mixed().required("Desktop Video is required"),
        mobileVideo: Yup.mixed().required("Mobile Video is required")
    });
     
    const { control, handleSubmit, setValue,  formState: { errors } } = useForm({
        resolver: yupResolver(bannerDTO)
    })

    useEffect(()=>{
        if(detail){
            setValue("title", detail.title)
            setValue("content", detail.content)
            setValue("link", detail.link)
            setValue("button", detail.button)
            setValue("category", detail.category)
            setValue("desktopImage", detail.desktopImage)
            setValue("mobileImage", detail.mobileImage)
            setValue("desktopVideo", detail.desktopVideo)
            setValue("mobileVideo", detail.mobileVideo)

        }
    },[detail, setValue])
  return (
    <form onSubmit={handleSubmit(submitEvent)}>
        <h3>Content</h3>
        <div className="from_grid">
            <div>
                <label htmlFor="title">Title</label><br />
                <TextInputComponent
                    name="title"
                    control={control}
                    type='text'
                    defaultValue=''
                    errMsg={errors?.title?.message}
                    required:true

                />
            </div>
            <div>
                <label htmlFor="content">Content</label><br />
                <TextAreaInput
                    name="content"
                    control={control}
                    defaultValue=''
                    errMsg={errors?.content?.message}
                />
            </div>
            <div>
                <label htmlFor="link">Link</label><br />
                <TextInputComponent
                    name="link"
                    control={control}
                    type='text'
                    defaultValue=''
                    errMsg={errors?.link?.message}
                />
            </div>
            <div>
                <label htmlFor="button">Button 1</label><br />
                <TextInputComponent
                    name="button"
                    control={control}
                    type='text'
                    defaultValue=''
                    errMsg={errors?.button?.message}
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
                <label htmlFor="mobileImage"> Mobile Image</label><br />
                <input
                    type='file'
                    onChange={(e) => {
                        const image = e.target.files['0']
                        setValue('mobileImage', image)
                    }}
                /><br />
            </div>
             {/* } */}
            {/* {selectedCategory === 'image' &&  */}
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
            {/* } */}
            {/* {selectedCategory === 'video' && */}
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
            {/* } */}
            {/* {selectedCategory === 'video' &&  */}
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
            {/* } */}
            
            
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <input className='submit_btn' type="submit" value="Update Banner" disabled={loading} />
        </div>
    </form>
  )
}

export default BannerForm