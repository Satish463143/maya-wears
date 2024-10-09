import React from 'react'
import './CollectionComponent.css'
import { useParams, useSearchParams } from 'react-router-dom'

const CollectionComponent = () => {
    const params = useParams()
    const [query, setQuery] = useSearchParams()
    console.log(query.get('page'))
  return (
    <div className='collection'>
        <p>Collection details of {params.slug}</p>
    </div>
  )
}

export default CollectionComponent