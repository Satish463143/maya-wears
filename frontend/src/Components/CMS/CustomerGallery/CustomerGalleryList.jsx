import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle';
import { toast } from 'react-toastify';
import CustomerGalleryImage from './CustomerGalleryImage';
import LoadingComponent from '../../../Middlewares/Loading/Loading.component';
import { useDeleteGalleryMutation, useListAllGalleryQuery } from '../../../api/customergallery.api';

const CustomerGalleryList = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10); 

    const {data,error,isLoading} = useListAllGalleryQuery({page, limit,})
    const [deletePhoto] = useDeleteGalleryMutation()
    
    const [visibleCount, setVisibleCount] = useState(20);
    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 10); // Load 9 more each time
    };
    const galleries = data?.result?.allImages || [];
    const deleteData = async(rowId)=>{
        try{
            await deletePhoto({imageUrl: rowId }).unwrap()
            toast.success("Image deleted")
        }catch(exception){
            console.log(exception)
            toast.error("error while deleting image")
        }
    }
    if(isLoading){
        return <LoadingComponent/>
    }
  return (
    <div className="admin_margin_box">
        <div className="admin_titles">
            <AdminTitle label1="Customer Gallery List" />
            <div className="Dashboard_title">
                <h1>Gallery List</h1>
                <div>
                    <Link to="/admin/customerGallery_add">
                        <button className="edit_btn">Add gallery</button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="gallery_grid">
             {galleries.slice(0, visibleCount).map((item, index) => (
               <CustomerGalleryImage key={index} link={item} image={item} deleteAction={deleteData} rowId={item}/>
            ))}
        </div>
        {visibleCount < galleries.length && (
            <div className='load_more_btn' onClick={loadMore}>
                Load more
            </div>
        )}        
    </div>
  )
}

export default CustomerGalleryList