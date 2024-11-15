import React, { useCallback, useEffect, useState } from 'react';
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle';
import { Link } from 'react-router-dom';
const ProductList = () => {
  return (
    <div className='admin_margin_box'>
      <div className='admin_titles'>
        <AdminTitle label1=' Product List' />
        <div className='Dashboard_title'>
          <h1>Product List</h1>
          <div>
          {/* <input type="search" className='search_btn' placeholder='Search here...' onChange={(e)=>{
            setSearch(e.target.value)
          }}/> */}
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
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* <tbody>
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
            </tbody> */}

          </table>
       
        <div className='flex overflow-x-auto sm:justify-center'>
          {/* <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default ProductList