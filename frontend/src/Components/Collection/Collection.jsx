import React from 'react'
import {Link} from 'react-router-dom'
import { useListForHomeQuery } from '../../api/collection.api'
import LoadingComponent from '../../Middlewares/Loading/Loading.component' 

const Collection = () => {

  const {data,error, isLoading} = useListForHomeQuery(null)
  if(isLoading) <LoadingComponent/>
  const collections = data?.result?.data || []

  return (
    <div className='div_container'>        
          {collections.map((item,index)=>(
            <div key={index}> 
              <Link to={`/collection/${item.slug}/${item._id}`}>
                <button>{item.name}</button>
              </Link> 
            </div>
            
          ))}                
    </div>
  )
}

export default Collection