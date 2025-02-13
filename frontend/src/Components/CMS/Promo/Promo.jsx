import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import LoadingComponent from '../../../Middlewares/Loading/Loading.component';
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle';
import { toast } from 'react-toastify';
import { Pagination } from 'flowbite-react';
import EditButton from '../../../Middlewares/EditButton/EditButton';
import DeleteButton from '../../../Middlewares/DeleteButton/DeleteButton';
import { useDeleteMutation, useListAllQuery } from '../../../api/promo.api';

const Promo = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Fixed limit
  const [search, setSearch] = useState('');

  const {data, error, isLoading} = useListAllQuery({ page, limit, search })
  const [deletePromo] = useDeleteMutation()

  const pormo = data?.result

    
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const deleteData = async(rowId)=>{
    try{
      await deletePromo(rowId).unwrap()
      toast.success("Promo deleted sucessfully")
      setPage(1);
    } 
    catch(exception){
      toast.error("Error while deleting Promo")

    }   
  }
  return (
    <div  className='admin_margin_box'>
      <div className='admin_titles'>
        <AdminTitle label1=' Promos List' />
        <div className='Dashboard_title'>
          <h1>Promos List</h1>
          <div>
          <input type="search" className='search_btn' placeholder='Search here by title...' value={search} onChange={handleSearchChange}/>
          <Link to='/admin/promo_code_add'>
            <button className='edit_btn'>Add Promos</button>
          </Link>
          
          </div>
        </div>      
      </div>
      <div className='blog_table'>        
          <table border='2'>
            <thead>
            <tr>
                <th>S.N</th>
                <th>Promo Name</th>
                <th>Promo Code</th>
                <th>Discount  (In %)</th>               
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
              ) :  pormo.length > 0 ? (
                pormo.map((row, index) => (
                  <tr key={index}>
                    <td className="table_sn">{index + 1}</td>
                    <td>{row.promoName}</td>
                    <td>{row.promoCode}</td>
                    <td>{row.discount}</td>
                    <td>{row.status}</td>
                    <td style={{ textAlign: 'center', width: '150px' }}>
                      <EditButton editUrl={`/admin/promo_code_edit/${row._id}`}/>
                      <DeleteButton deleteAction={deleteData} rowId={row._id}  />                  
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Pormo List is Empty</td>
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

export default Promo