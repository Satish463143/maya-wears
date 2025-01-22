import React from 'react'
import {Link} from 'react-router-dom'
import { useListForHomeQuery } from '../../api/collection.api'
import LoadingComponent from '../../Middlewares/Loading/Loading.component' 
import './Collection.css'

const Collection = () => {

  const {data,error, isLoading} = useListForHomeQuery(null)
  if(isLoading) <LoadingComponent/>
  const collections = data?.result?.data || []

  return (
    <div className='container collectonssss'>  
    <div className="collections">
      <h1>Explore our collection</h1>

      <div className="collection_grid">
        {collections.map((item,index)=>(
            <div key={index} className='collection_box'>
              <Link to={`/collection/${item.slug}/${item._id}`}> 
                <div className="collection_box_img">
                  <img src={item.image} alt=""/>
                  <div className="collection_box_img_overlay"></div>
                  <div className="collection_box_content">                  
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>                    
                    <button>Explore {item.name}</button>        
                  </div>
                  
                </div> 
              </Link>
            </div>            
          ))}
      </div>      
    </div>               
    </div>
  )
}

export default Collection