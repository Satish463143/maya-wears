import React, { useCallback, useEffect, useState } from 'react';
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle';
import { Link } from 'react-router-dom';
import {  useDeleteProductMutation, useListAllQuery } from '../../../api/product.api';
import LoadingComponent from '../../../Middlewares/Loading/Loading.component' 
import { toast } from 'react-toastify';
import { Pagination } from 'flowbite-react';
import EditButton from '../../../Middlewares/EditButton/EditButton';
import DeleteButton from '../../../Middlewares/DeleteButton/DeleteButton';



const ProductList = () => {

  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Fixed limit
  const [search, setSearch] = useState('');

  const { data, error, isLoading } = useListAllQuery({ page, limit, search });
  const [deleteProduct, {isLoading: isDeleting}] = useDeleteProductMutation();

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const deleteData = async(id)=>{
    try{
      const result = await deleteProduct(id).unwrap()
      toast.success("Product deleted sucessfully")
      setPage(1);
    }catch(exception){
      toast.error("Failed to delete product")
      console.error(exception)
    }
  }

  return (
    <div className='admin_margin_box'>
      <div className='admin_titles'>
        <AdminTitle label1=' Product List' />
        <div className='Dashboard_title'>
          <h1>Product List</h1>
          <div>
          <input type="search" className='search_btn' placeholder='Search here by title...' value={search} onChange={handleSearchChange}/>
          <Link to='/admin/add_product'>
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
                <th>Price</th>
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
              ) :  data?.result?.length > 0 ? (
                data.result.map((row, index) => (
                  <tr key={index}>
                    <td className="table_sn">{index + 1}</td>
                    <td className="table_img">
                      <img src={row?.mainImage} alt="" />
                    </td>
                    <td>{row.title}</td>
                    <td>Rs.{row.price}/-</td>
                    <td style={{ textAlign: 'center', width: '150px' }}>
                      <EditButton editUrl={`/admin/edit_product/${row._id}`}/>
                      <DeleteButton deleteAction={deleteData} rowId={row._id} disabled={isDeleting} />                  
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Product List is Empty</td>
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

export default ProductList