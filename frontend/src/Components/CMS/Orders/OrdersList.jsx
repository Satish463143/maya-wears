import React, { useState, useEffect } from 'react'
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
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');

    // Add debounce timer
    useEffect(() => {
        const timer = setTimeout(() => {
            const trimmed = searchInput.trim();
            setSearch(trimmed);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);

    const { data, error, isLoading } = useListOrderForAdminQuery({ page, limit, search });

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
        setPage(1); // Reset to the first page
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearch(searchInput.trim());
    };

    return (
        <div className='admin_margin_box'>
            <div className='admin_titles'>
                <AdminTitle label1='Orders List' />
                <div className='Dashboard_title'>
                    <h1>Orders List</h1> 
                    <div>
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="search"
                                className="search_btn"
                                placeholder="Search by Order ID or Status..."
                                value={searchInput}
                                onChange={handleSearchChange}
                            />
                            <button 
                                type="submit" 
                                className="search_submit_btn"
                                style={{
                                    padding: '6px 12px',
                                    marginLeft: '10px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Search
                            </button>
                        </form>
                    </div>        
                </div>
            </div>
            <div className='blog_table'>        
                <table border='2'>
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Image</th>
                            <th>Order Id</th>
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
                                <td colSpan="6">{error?.data?.message || error?.message || "An error occurred"}</td>
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
                                    <td>{row.orderId || 'N/A'}</td>
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