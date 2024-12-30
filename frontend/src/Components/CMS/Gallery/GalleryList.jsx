import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle';
import { useDeleteGalleryMutation, useListAllGalleryQuery } from '../../../api/gallery.api';
import { toast } from 'react-toastify';
import './Gallery.css'
import GalleryImage from './GalleryImage';
import LoadingComponent from '../../../Middlewares/Loading/Loading.component';

const GalleryList = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10); 

    const {data,error,isLoading,refetch} = useListAllGalleryQuery({page, limit,})
    const [deletePhoto] = useDeleteGalleryMutation()

    if(isLoading){
        return <LoadingComponent/>
    }

    const galleries = data?.result?.allImages || [];

    const deleteData = async(rowId)=>{
        try{
            await deletePhoto({imageUrl: rowId }).unwrap()
            toast.success("Image deleted")
            refetch()
        }catch(exception){
            console.log(exception)
            toast.error("error while deleting image")
        }
        console.log('image url',rowId)
    }

  return (
    <div className="admin_margin_box">
        <div className="admin_titles">
            <AdminTitle label1="Gallery List" />
            <div className="Dashboard_title">
                <h1>Gallery List</h1>
                <div>
                    <Link to="/admin/gallery_add">
                        <button className="edit_btn">Add gallery</button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="gallery_grid">
            {galleries.map((item, index)=>(
                    <GalleryImage key={index} link={item} image={item} deleteAction={deleteData} rowId={item}/>
                ))
            }
        </div>
    </div>
  )
}

export default GalleryList