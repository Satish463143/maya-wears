import React from 'react'
import { Link } from 'react-router-dom'

const EditButton = ({editUrl}) => {
  return (
    <Link to={editUrl}>
        <button className="edit_btn" style={{ marginBottom: '10px' }}>Edit</button>
    </Link>
  )
}

export default EditButton