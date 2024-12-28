import React, { useCallback, useEffect, useState } from 'react';
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle';
import { Link } from 'react-router-dom';
import { Pagination, Toast } from 'flowbite-react';
import collectionSvc from './Collection.service';
import LoadingComponent from '../../../Middlewares/Loading/Loading.component';

import { toast } from 'react-toastify';
import EditButton from '../../../Middlewares/EditButton/EditButton';
import DeleteButton from '../../../Middlewares/DeleteButton/DeleteButton';
import { useDeleteCollectionMutation, useListAllQuery } from '../../../api/collection.api';


const CollectionList = () => {
  const [search, setSearch] = useState(''); // Ensure default value is a string
  const [page, setPage] = useState(1);
  const [limit] = useState(10); 

  const {data, error, isLoading, refetch} = useListAllQuery({ page, limit, search })
  const [deleteCollection] = useDeleteCollectionMutation()

  const collection = data?.result

  const handleSearchChange = (event) => {
    setSearch(event.target.value); // Update the search state
    setPage(1); // Reset to the first page
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };  


  const deleteData=async(id)=>{
    try{
      await deleteCollection(id).unwrap()
      toast.success("COllection deleted ucessfully")
      refetch()
      
    }catch(exception){
      console.log(exception)
      toast.error("Cannot delete collection at this moment")
    }

  }

  const truncateContent = (content = '', wordLimit) => {
    const words = content.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : content;
  };

  return (
    <div className='admin_margin_box'>
      <div className='admin_titles'>
        <AdminTitle label1=' Collection List' />
        <div className='Dashboard_title'>
          <h1>Collection List</h1>
          <div>
          <input
              type="search"
              className="search_btn"
              placeholder="Filter by status..."
              value={search}
              onChange={handleSearchChange}
          />
          <Link to='/admin/add_collection'>
            <button className='edit_btn'>Add Collection</button>
          </Link>          
          </div>
        </div>
      </div>
      <div className='blog_table'>        
        <table border='2'>
          <thead>
            <tr>
              <th>S.N</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>  
                <td colSpan="6"><LoadingComponent/></td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="error-message">{error}</td>
              </tr>
            ) : collection && collection.length > 0 ? (
              collection.map((row, index) => (
                <tr key={index}>
                  <td className="table_sn">{index + 1}</td>
                  <td className="table_img">
                    <img src={row.image} alt="" />
                  </td>
                  <td>{row.name}</td>
                  <td>{truncateContent(row.description, 10)}</td>
                  <td>{row.status}</td>
                  <td style={{ textAlign: 'center', width: '150px' }}>
                    <EditButton editUrl={`/admin/edit_collection/${row._id}`}/>
                    <DeleteButton deleteAction={deleteData} rowId={row._id}/>                  
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Collection List is Empty</td>
              </tr>
            )}
          </tbody>
        </table>       
        <div className='flex overflow-x-auto sm:justify-center'>
            {data?.meta && (
            <div className='flex overflow-x-auto sm:justify-center'>
                <Pagination
                currentPage={data?.meta.currentPage}
                totalPages={Math.ceil(data?.meta.total / limit)}
                onPageChange={handlePageChange}
                />
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CollectionList;
