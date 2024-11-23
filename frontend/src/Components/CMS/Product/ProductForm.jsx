import React from 'react'
import * as Yup from 'yup'
import { DescriptionInput, FeaturedOptionsCompoent, TextInputComponent, WearableOptionsCompoent } from '../../../Middlewares/Form/Input.component'
import { useForm,useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useListAllQuery } from '../../../api/collection.api'
import LoadingComponent from '../../../Middlewares/Loading/Loading.component'
import Select from "react-select";
import '../../../pages/AdminPage/CMSLayout.css'

const ProductForm = ({submitEvent,loading,detail=null}) => {
    const {data,error, isLoading} = useListAllQuery(null)
    if(isLoading) <LoadingComponent/>
    const collectionList = data?.result

    const sizeDTO = Yup.object({
        size: Yup.string().min(1).max(5).required(), // e.g., "M", "L", etc.
        quantity: Yup.number().integer().min(0).required() // quantity as a non-negative integer
    });
    const productDTO = Yup.object({
        title:Yup.string().min(3).max(50).required(),
        summary:Yup.string().nullable().optional().default(null),
        description:Yup.string().nullable().optional().default(null),
        promoCode:Yup.string().nullable().optional().default(null),
        discount:Yup.number().nullable().optional().default(null),
        color:Yup.string().nullable().optional().default(null),
        fabric:Yup.string().nullable().optional().default(null),
        pattern:Yup.string().nullable().optional().default(null),
        price:Yup.number().required('Price is required'),
        sizes:Yup.array().of(sizeDTO).min(1, 'At least one size is required').required(),
        wearable:Yup.object({
            label:Yup.string().matches(/^(Summer|Winter|Both)$/),
            value:Yup.string().matches(/^(Summer|Winter|Summer and Winter)$/)
        }),
        productCollections:Yup.array().nullable().optional().default([]),
        isFeatured:Yup.object({
            lable:Yup.string().matches(/^(Yes|No)$/),
            value:Yup.string().matches(/^(true|false)$/)
        }),

        images: Yup.array().of(Yup.mixed().required("Gallery Images are required")),
        mainImage: Yup.mixed().required("Main image is required"),
        featureDesktopImage:Yup.string(),
        featureMobileImage:Yup.string(),
        video: Yup.mixed().nullable(),  
    })
    const {control, handleSubmit,register, setValue, formState:{errors} } = useForm({
        resolver: yupResolver(productDTO),
        defaultValues: {
            sizes: [{ size: '', quantity: 0 }]
        }
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'sizes'
    });
  return (
    <form onSubmit={handleSubmit(submitEvent)}>
        <h3>Content</h3>
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
                <label htmlFor="description">Description</label><br />
                <DescriptionInput
                    name='description'
                    control={control}
                    type='text'
                    defaultValue=''
                    errMsg={errors?.description?.message}
                />
            </div>
            <div>
                <label htmlFor="summary">Summary</label><br />
                <DescriptionInput
                    name='summary'
                    control={control}
                    type='text'
                    defaultValue=''
                    errMsg={errors?.summary?.message}
                />
            </div>
        </div>
        <h3>Details</h3>
        <div className="from_grid">
            <div>
                <label htmlFor="price">Price</label><br />
                <TextInputComponent
                    name='price'
                    control={control}
                    type='text'
                    defaultValue=''
                    errMsg={errors?.price?.message}
                />
            </div>
            <div>
                <label htmlFor="color">Color</label><br />
                <TextInputComponent
                    name='color'
                    control={control}
                    type='text'
                    defaultValue=''
                    errMsg={errors?.color?.message}
                />
            </div>
            <div>
                <label htmlFor="fabric">Fabric</label><br />
                <TextInputComponent
                    name='fabric'
                    control={control}
                    type='text'
                    defaultValue=''
                    errMsg={errors?.fabric?.message}
                />
            </div>
            <div>
                <label htmlFor="pattern">Pattern</label><br />
                <TextInputComponent
                    name='pattern'
                    control={control}
                    type='text'
                    defaultValue=''
                    errMsg={errors?.pattern?.message}
                />
            </div>
            <div>
                <label htmlFor="pattern">Wearable</label><br />
                <WearableOptionsCompoent
                    name='wearable'
                    control={control}
                    errMsg={errors?.wearable?.message}
                />
            </div>
            
        </div>
        <h3 style={{marginTop:'30px'}}>Sizes</h3>
        <div className="from_grid">
            {fields.map((item, index) => (
                <div key={item.id} style={{ marginBottom: '10px' }}>
                    <label>
                        Size:
                        <input style={{padding:'10px'}}
                            {...register(`sizes.${index}.size`)}
                            placeholder="Size (e.g., M, L)"
                        />
                        {errors.sizes?.[index]?.size && <p style={{ color: 'red' }}>{errors.sizes[index].size.message}</p>}
                    </label>

                    <label>
                        Quantity:
                        <input
                            type="number"
                            {...register(`sizes.${index}.quantity`)}
                            placeholder="Quantity"
                        />
                        {errors.sizes?.[index]?.quantity && <p style={{ color: 'red' }}>{errors.sizes[index].quantity.message}</p>}
                    </label>

                    <button type="button" onClick={() => remove(index)} style={{background:'#d74747', padding:'5px 10px', borderRadius:'5px'}}>
                        Remove Size
                    </button>
                </div>
            ))}

            <button type="button" onClick={() => append({ size: '', quantity: 0 })} style={{background:'#babaeb', padding:'5px 10px', borderRadius:'5px'}}>
                Add Another Size
            </button>
        </div>
        <h3 style={{marginTop:'30px'}}>Other Details</h3>
        <div className="from_grid">            
            <div>
                <label htmlFor="promoCode">Promo Code</label><br />
                <TextInputComponent
                    name='promoCode'
                    control={control}
                    type='text'
                    defaultValue=''
                    errMsg={errors?.promoCode?.message}
                />
            </div>
            <div>
                <label htmlFor="discount">Disocunt (In %)</label><br />
                <TextInputComponent
                    name='discount'
                    control={control}
                    defaultValue=''
                    errMsg={errors?.discount?.message}
                />
            </div>
            <div>
                <label htmlFor="productCollections">Product Collections</label>
                <Controller
                    name="productCollections"
                    control={control}
                    render={({ field }) => (
                    <Select
                        {...field}
                        options={collectionList? collectionList.map((collection) => ({
                        value: collection._id,
                        label: collection.name,
                        })) 
                        : []
                    }

                        isMulti
                        placeholder="Select collections"
                    />
                    )}
                />
                {errors?.productCollections && (
                    <span style={{ color: "red", fontStyle: "italic" }}>
                    {errors.productCollections.message}
                    </span>
                )}
            </div>
        </div>
        <h3 style={{marginTop:'30px'}}>Media</h3>
        <div className="from_grid">
            <div>
                <label htmlFor="mainImage">Main Images</label><br />
                <Controller
                    name="mainImage"
                    control={control}
                    render={({ field }) => (
                        <input
                        type="file"
                        onChange={(e) => field.onChange(e.target.files[0])}
                        />
                    )}
                /><br />
            </div>
            <div>
                <label htmlFor="images"> Images gallery</label><br />
                <input
                    name='images'
                    type='file'
                    multiple
                    onChange={(e) => {
                        const image = Array.from(e.target.files)
                        setValue('images', image)
                    }}
                /><br />
            </div>
            <div>
                <label htmlFor="video"> Video</label><br />
                <input
                    name='video'
                    type='file'
                    onChange={(e) => {
                        const video = e.target.files['0']
                        setValue('video', video)
                    }}
                /><br />
            </div>
        </div>
        <h3 style={{marginTop:'30px'}}>Other Details</h3>
        <div className="from_grid">
            <div>
                <label htmlFor="pattern">Is Featured</label><br />
                <FeaturedOptionsCompoent
                    name='isFeatured'
                    control={control}
                    errMsg={errors?.isFeatured?.message}
                    required:true
                />
            </div>
            <div>
                <label htmlFor="featureDesktopImage">Featured Desktop Image</label><br />
                <Controller
                    name="featureDesktopImage"
                    control={control}
                    render={({ field }) => (
                        <input
                        type="file"
                        onChange={(e) => field.onChange(e.target.files[0])}
                        />
                    )}
                /><br />
            </div>
            <div>
                <label htmlFor="featureMobileImage">Featured Mobile Image</label><br />
                <Controller
                    name="featureMobileImage"
                    control={control}
                    render={({ field }) => (
                        <input
                        type="file"
                        onChange={(e) => field.onChange(e.target.files[0])}
                        />
                    )}
                /><br />
            </div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'center',  }}>            
            <input className='submit_btn' type="submit" value="Add Product" disabled={loading} style={{cursor:'pointer'}}/>
        </div>
    </form>
  )
}

export default ProductForm