import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { OptionsCompoentt,  TextAreaInput, TextInputComponent } from '../../../Middlewares/Form/Input.component'


const CollectionForm = ({submitEvent,loading,setImageFile,detail=null}) => {

    const collectionDTO = Yup.object({
        name: Yup.string().min(3).max(50).required(),
        description: Yup.string().min(3).max(50).nullable().optional().default(null),
        status: Yup.object({
            label:Yup.string().matches(/^(Active|Inactive)$/),
            value: Yup.string().matches(/^(active|inactive)$/).required()
        }).required(),
        image: Yup.string().required()
    })
     
    const { control, handleSubmit, setValue,  formState: { errors } } = useForm({
        resolver: yupResolver(collectionDTO)
    })

    useEffect(()=>{
        if(detail){
            setValue("name", detail.name)
            setValue("image", detail.image)
            setValue("description", detail.description)
            setValue("status", detail.status)

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
                <label htmlFor="status">status</label><br />
                <OptionsCompoentt
                    name="status"
                    control={control}
                    errMsg={errors?.status?.message}
                    required:true
                />
            </div>
            <div>
                <label htmlFor="image"> Image</label><br />
                <input
                    type='file'
                    onChange={(e) => {
                        const image = e.target.files['0']
                        setImageFile(image)
                        setValue('image', image)
                    }}
                /><br />
            </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            
            <input className='submit_btn' type="submit" value="Add Collection" disabled={loading}/>
        </div>
    </form>
  )
}

export default CollectionForm