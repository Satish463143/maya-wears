import React from 'react'
import './AdminTitle.css'
import { Link } from 'react-router-dom'

const AdminTitle = ({url,label1,label2}) => {
  return (
    <div>
        <div className='back_link'>
            <h4> &gt;&gt; </h4>
            <Link to='/admin'><h4> Dashboard </h4></Link>
            <h4>/</h4>
            <Link to={url}><h4> {label1}</h4></Link>
            <h4>{label2}</h4>
        </div> 
        <div className='hr'></div>
        
    </div>
  )
}

export default AdminTitle