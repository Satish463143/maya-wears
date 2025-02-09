import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CategoryOptionsCompoent,  OptionsCompoentt,  TextAreaInput, TextInputComponent } from '../../../Middlewares/Form/Input.component'

const BannersForm = ({submitEvent,loading,detail=null,value}) => {
    const bannersDTO = Yup.object({
            title: Yup.string().min(3).max(50).required(),
            content: Yup.string().min(3).max(50).nullable().notRequired(),
            category: Yup.object({
                label: Yup.string().matches(/^(Image|Video)$/),
                value: Yup.string().matches(/^(image|video)$/).required()
            }).required(),
            status: Yup.object({
                label: Yup.string().matches(/^(Active|Inactive)$/),
                value: Yup.string().matches(/^(active|inactive)$/).required()
            }).required(),
            link: Yup.string().url().nullable().optional().default(null),
            button: Yup.string().nullable().optional().default(null),
            desktopImage: Yup.mixed().nullable().notRequired(),
            mobileImage: Yup.mixed().nullable().notRequired(),
            desktopVideo: Yup.mixed().nullable().notRequired(),
            mobileVideo: Yup.mixed().nullable().notRequired(),
        });
         
        const { control, handleSubmit, setValue,  formState: { errors } } = useForm({
            resolver: yupResolver(bannersDTO)
        })
        useEffect(()=>{
            if(detail){
                setValue("title", detail.title)
                setValue("content", detail.content)
                setValue("link", detail.link)
                setValue("button", detail.button)
                setValue("status", detail.status)
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
                <label htmlFor="button">Button</label><br />
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <input className='submit_btn' type="submit" value={value} disabled={loading} />
        </div>
    </form>
  )
}

export default BannersForm