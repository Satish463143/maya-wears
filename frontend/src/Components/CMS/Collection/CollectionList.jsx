import React, { useCallback, useEffect, useState } from 'react';
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle';
import { Link } from 'react-router-dom';
import { Pagination, Toast } from 'flowbite-react';
import collectionSvc from './Collection.service';
import LoadingComponent from '../../../Middlewares/Loading/Loading.component';

import { toast } from 'react-toastify';
import EditButton from '../../../Middlewares/EditButton/EditButton';
import DeleteButton from '../../../Middlewares/DeleteButton/DeleteButton';

const CollectionList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [collection, setCollection] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [search, setSearch] = useState()

  const onPageChange = useCallback( async (page) => {
    setPagination({
      ...pagination,
      currentPage: page,
    });
    await getAllCollections({
      page:page,
      limit: 10, // Update limit based on your requirement
    });
  },[pagination])

  const getAllCollections = useCallback(async ({ page = 1, limit = 10, search = '' }) => {
    setLoading(true);
    try {
      const response = await collectionSvc.getRequest('/collection', {
        auth: true,
        params: { limit, page, search },
      });
      setCollection(response.result);
      setPagination({
        currentPage: parseInt(response.meta.currentPage),
        totalPages: Math.ceil(response.meta.total / response.meta.limit),
      });
    } catch (exception) {
      console.log(exception);
      Toast.error('Error Getting Collection');
    } finally {
      setLoading(false);
    }
  },[pagination]);
  
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      getAllCollections({
        page:1,
        limit:10,
        search:search
      },2000)
      return()=>{
        clearTimeout(timeout)
      }
    })
  },[search])

  const deleteData=async(id)=>{
    try{
      await collectionSvc.deleteRequest('/collection/'+id,{auth:true})
       toast.success("Collection deleted sucessfully")
       getAllCollections({
        page:1,
        limit:10
       })
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
          <input type="search" className='search_btn' placeholder='Search here...' onChange={(e)=>{
            setSearch(e.target.value)
          }}/>
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
            {loading ? (
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
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionList;
