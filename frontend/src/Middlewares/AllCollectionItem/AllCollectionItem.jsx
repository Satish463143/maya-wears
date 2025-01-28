import React from 'react'

const AllCollectionItem = ({ image, name, description}) => {
  return (
    <div className='allcollection_item'>
        <img src={image} alt="" />
        <div className='collection_content'>
            <h1>{name}</h1>
            <h3>{description}</h3>
            <button >View Product</button>
        </div>
    </div>
  )
}

export default AllCollectionItem