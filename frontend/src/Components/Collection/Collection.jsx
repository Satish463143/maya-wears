import React from 'react'
import {Link} from 'react-router-dom'

const Collection = () => {
  return (
    <div className='div_container'>
        <Link to='/collection/collection-one'>
            <button>Collection one</button> 
        </Link>
        
    </div>
  )
}

export default Collection