import React from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const CustomerGalleryForm = ({submitEvent,loading,value}) => {
     const galleryDTO = Yup.object({
        images: Yup.array().min(1, 'Select atleast 1 image').required('Select atleast 1 image')
     })
     const {control, handleSubmit, setValue, formState:{errors} } = useForm({
             resolver: yupResolver(galleryDTO),
         })
  return (
   <form action="" onSubmit={handleSubmit(submitEvent)}>        
        <div className="from_grid">
            <div>
                <label>Select photos</label>
                <input
                    name='images'
                    type='file'
                    multiple
                    onChange={(e) => {
                        const images = Array.from(e.target.files); // Handle multiple files
                        setValue('images', images, { shouldValidate: true }); // Update form value
                    }}
                />
                {errors.images && <p style={{ color: 'red' }}>{errors.images.message}</p>}<br />
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center',  }}>            
            <input
                className='submit_btn'
                type="submit"
                value={value}
                disabled={loading}
                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
            />
        </div>
   </form>
  )
}

export default CustomerGalleryForm