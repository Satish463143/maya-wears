import React from 'react'

const CollectionForm = () => {
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
                    required
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