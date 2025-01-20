import React,{useState,useEffect} from 'react'
import * as Yup from 'yup'
import { DescriptionInput, FeaturedOptionsCompoent, TextInputComponent, WearableOptionsCompoent } from '../../../Middlewares/Form/Input.component'
import { useForm,useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useListAllQuery } from '../../../api/collection.api'
import LoadingComponent from '../../../Middlewares/Loading/Loading.component'
import Select from "react-select";
import '../../../pages/AdminPage/CMSLayout.css'

const ProductForm = ({submitEvent,loading,detail=null,value}) => {

    //fetch collection to set collection in product
    const [page, setPage] = useState(1);
    const [limit] = useState(10); 
    const {data,error, isLoading} = useListAllQuery({ page, limit })
    if(isLoading) <LoadingComponent/>
    const collectionList = data?.result

    const sizeDTO = Yup.object({
        size: Yup.string().min(1).max(5).required(), // e.g., "M", "L", etc.
        quantity: Yup.number().integer().min(0).required() // quantity as a non-negative integer
    });
    const productDTO = Yup.object({
        title:Yup.string().min(3).max(50).required(),
        summary:Yup.string().required().nullable().notRequired(),
        description:Yup.string().required().nullable().notRequired(),
        color:Yup.string().required().nullable().notRequired(),
        fabric:Yup.string().required().nullable().notRequired(),
        pattern:Yup.string().required().nullable().notRequired(),
        price: Yup.number()
        .transform((value, originalValue) => (originalValue === "" ? undefined : value)) // Handle empty string
        .min(0, "Price must be greater than or equal to 0.")
        .required("Price is required."),
        sizes:Yup.array('Must add at least one size').of(sizeDTO).min(1, 'At least one size is required').required(),
        wearable:Yup.object({
            label:Yup.string().matches(/^(Summer|Winter|Both)$/),
            value:Yup.string().matches(/^(Summer|Winter|Summer and Winter)$/)
        }),
        productCollections:Yup.array().required().nullable().notRequired().default([]),
        images: Yup.array(),
        mainImage: Yup.mixed().required('Main Image is required'),
        video: Yup.mixed().required().nullable().notRequired(),  
    })
    const {control, handleSubmit,register, setValue,getValues, formState:{errors} } = useForm({
        resolver: yupResolver(productDTO),
        defaultValues: {
            sizes: [{ size: '', quantity: 0 }]
        }
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'sizes'
    });

    useEffect(()=>{
        if(detail){
            setValue("title", detail.title)
            setValue("summary", detail.summary)
            setValue("description", detail.description)
            setValue("color", detail.color)
            setValue("fabric", detail.fabric)
            setValue("pattern", detail.pattern)
            setValue("price", detail.price)
            setValue("wearable", detail.wearable)
            setValue("images", detail.images || [])
            setValue("mainImage", detail.mainImage)
            setValue("video", detail.video)
            if (detail.sizes && detail.sizes.length > 0) {
                detail.sizes.forEach((size) => append(size));
            }        
            // Initialize collections
            if (detail.productCollections) {
            setValue("productCollections", detail.productCollections);
            }
        }
    },[detail, append, setValue])

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const existingImages = getValues("images") || [];
        setValue("images", [...existingImages, ...files]);
      };    
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
                <input
                    type="file"
                    onChange={(e) => setValue("mainImage", e.target.files[0])}
                />
                    {getValues("mainImage") && typeof getValues("mainImage") === "string" ? (
                    <img
                        src={getValues("mainImage")}
                        alt="Main"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                    ) : (
                    getValues("mainImage") && (
                        <img
                        src={URL.createObjectURL(getValues("mainImage"))}
                        alt="Main Preview"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                    )
                    )}
                <br />
            </div>
            <div>
                <label>Images</label>
                <input type="file" multiple onChange={handleImageUpload} />
                <div className="image-preview">
                    {(getValues("images") || []).map((image, index) => (
                        <div key={index} style={{ display: "inline-block", margin: "5px" }}>
                        {typeof image === "string" ? (
                            <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                        ) : (
                            <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                        )}
                        </div>
                    ))}
                    </div>
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
        <div style={{ display: 'flex', justifyContent: 'center',  }}>            
            <input className='submit_btn' type="submit" value={value} disabled={loading} style={{cursor:'pointer'}}/>
        </div>
    </form>
  )
}

export default ProductForm