import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { useDeleteMutation, useListAllQuery } from '../../../api/featuredProduct.api'
import { toast } from 'react-toastify';
import { Pagination } from 'flowbite-react';
import LoadingComponent from '../../../Middlewares/Loading/Loading.component';
import EditButton from '../../../Middlewares/EditButton/EditButton';
import DeleteButton from '../../../Middlewares/DeleteButton/DeleteButton';

const FeatuedProductList = () => {
    const [loading, setLoading] = useState()
    const [search, setSearch] = useState()
    const [page, setPage] = useState(1);
    const [limit] = useState(10); // Fixed limit

    const {data, error, isLoading, refetch} = useListAllQuery({page, limit, search })
    const {deleteProduct, isLoading:deleting} = useDeleteMutation()

    const fetauredData = data?.result 

    //handle search result
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1); // Reset to first page on new search
      };    
    const handlePageChange = (newPage) => {
    setPage(newPage);
    };

    const deleteData=async(rowId)=>{
        await deleteProduct(rowId).unwrap()
        refetch();
        page:1;
        


    }



  return (
    <div className='admin_margin_box'>
      <div className='admin_titles'>
        <AdminTitle label1=' Featured Product List' />
        <div className='Dashboard_title'>
          <h1>Featured Product List</h1>
          <div>
          <input type="search" className='search_btn' placeholder='Filter by status...' value={search} onChange={handleSearchChange}/>
          <Link to='/admin/featured_product_add'>
            <button className='edit_btn'>Add Product</button>
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
                <th>Title</th>
                <th>Sub Title</th>
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
                ) : fetauredData && fetauredData.length > 0 ? (
                fetauredData.map((row, index) => (
                    <tr key={index}>
                    <td className="table_sn">{index + 1}</td>
                    <td className="table_img">
                        <img src={row.desktopImage} alt="" />
                    </td>
                    <td>{row.title}</td>
                    <td>{truncateContent(row.subTitle, 10)}</td>
                    <td>{row.status}</td>
                    <td style={{ textAlign: 'center', width: '150px' }}>
                        <EditButton editUrl={`/admin/featured_product_edit/${row._id}`}/>
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
                    currentPage={data.meta.currentPage}
                    totalPages={Math.ceil(data.meta.total / limit)}
                    onPageChange={handlePageChange}
                    />
                </div>
                )}
            </div>
        </div>

    </div>
  )
}

export default FeatuedProductList