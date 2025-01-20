import React,{useState} from 'react'
import { useListOrderForAdminQuery } from '../../../api/order.api';
import { Link } from 'react-router-dom';
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle';
import LoadingComponent from '../../../Middlewares/Loading/Loading.component' 
import { toast } from 'react-toastify';
import { Pagination } from 'flowbite-react';
import EditButton from '../../../Middlewares/EditButton/EditButton';
const OrdersList = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10); // Fixed limit
    const [search, setSearch] = useState('');

    const { data, error, isLoading } = useListOrderForAdminQuery({ page, limit, search });

      const handlePageChange = (newPage) => {
        setPage(newPage);
      };

      const handleSearchChange = (event) => {
        setSearch(event.target.value); // Update the search state
        setPage(1); // Reset to the first page
      };
  return (
    <div className='admin_margin_box'>
        <div className='admin_titles'>
          <AdminTitle label1='Orders List' />
          <div className='Dashboard_title'>
            <h1>Orders List</h1> 
              <div>
                  <input
                      type="search"
                      className="search_btn"
                      placeholder="Filter by status..."
                      value={search}
                      onChange={handleSearchChange}
                  />
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
              <th>Quantity</th>
              <th>Amount</th>
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
            ) :  data?.result?.length > 0 ? (
              data.result.map((row, index) => (
                <tr key={index}>
                  <td className="table_sn">{index + 1}</td>
                  <td className="table_img">
                        {row.items.length > 0 ? (
                            <img src={row.items[0].productImage} alt={row.items[0].title || 'Product Image'} />
                        ) : (
                            'N/A'
                        )}
                  </td>
                  <td>{row.items.length > 0 ? row.items[0].title : 'N/A'}</td>
                  <td> {row.items.length > 0 ? row.items[0].quantity : 'N/A'}</td>
                  <td>Rs.{row.total}/-</td>
                  <td>{row.orderStatus}</td>
                  <td style={{ textAlign: 'center', width: '150px' }}>
                    <EditButton editUrl={`/admin/order_view/${row._id}`}/>                 
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

export default OrdersList