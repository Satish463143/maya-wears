import React from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const CustomerGalleryImage = ({image,deleteAction,rowId,link}) => {
    const handleDelete = async(e)=>{
            e.preventDefault()
            try{
                const result = await Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                  })
                  if(result.isConfirmed){
                    deleteAction(rowId)
                  }
    
            }catch(exception){
                console.log(exception)
                toast.error("Error deleting data")
            }
        }
  return (
    <div className="gallery_image">
        <a href={link} target='_blank'>
            <img src={image} alt="" />
        </a>
        <span>
            <Link onClick={handleDelete}>
                <svg
                    id="Icons"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    width='24px'
                    height='24px'
                >
                    <defs>
                    <style>{'.cls-1{fill:#232323;}'}</style>
                    </defs>
                    <path
                    className="cls-1"
                    d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm4.707,14.293a1,1,0,1,1-1.414,1.414L12,13.414,8.707,16.707a1,1,0,1,1-1.414-1.414L10.586,12,7.293,8.707A1,1,0,1,1,8.707,7.293L12,10.586l3.293-3.293a1,1,0,1,1,1.414,1.414L13.414,12Z"
                    />
                </svg>
            </Link>
        </span>
    </div>
    
  )
}

export default CustomerGalleryImage