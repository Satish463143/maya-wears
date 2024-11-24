import React from 'react'
import {Link} from 'react-router-dom'
import { useListForHomeQuery } from '../../api/collection.api'
import LoadingComponent from '../../Middlewares/Loading/Loading.component' 

const Collection = () => {
  const {data,error, isLoading} = useListForHomeQuery(null)
  // console.log('collectiondata',data)
  if(isLoading) <LoadingComponent/>
  const collections = data?.result?.data || []
  return (
    <div className='div_container'>
        <Link to='/collection/collection-one'>
          {collections.map((key,index)=>(
            <button>{key.name}</button> 
            
          ))}
            
            {/* <button>Collection one</button> */}
        </Link>        
    </div>
  )
}

export default Collection