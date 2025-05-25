import React,{useState} from 'react'
import { useDeleteMutation, useListAllQuery } from '../../../api/banners.api';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../../Middlewares/Loading/Loading.component';
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle';
import { toast } from 'react-toastify';
import { Pagination } from 'flowbite-react';
import EditButton from '../../../Middlewares/EditButton/EditButton';
import DeleteButton from '../../../Middlewares/DeleteButton/DeleteButton';

const BannersList = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Fixed limit
  const [search, setSearch] = useState('');

  const {data, error, isLoading} = useListAllQuery({ page, limit, search })
  const [deleteBanner] = useDeleteMutation()

  const bannersList = data?.result

  
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const deleteData = async(id)=>{
      try{
        await deleteBanner(id).unwrap()
        toast.success("Banner deleted sucessfully")
        setPage(1);
      }catch(exception){
        toast.error("Failed to delete product")
      }
    }

  return (
    <div  className='admin_margin_box'>
      <div className='admin_titles'>
        <AdminTitle label1=' Banner List' />
        <div className='Dashboard_title'>
          <h1>Banner List</h1>
          <div>
          <input type="search" className='search_btn' placeholder='Search here by title...' value={search} onChange={handleSearchChange}/>
          <Link to='/admin/add_banners'>
            <button className='edit_btn'>Add Bannner</button>
          </Link>
          
          </div>
        </div>      
      </div>
      <div className='blog_table'>
        
          <table border='2'>
            <thead>
            <tr>
                <th>S.N</th>
                <th>Image/Viedeo</th>
                <th>Title</th>
                <th>Content</th>                
                <th>Status</th>
                <th>Link</th>
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
              ) :  bannersList.length > 0 ? (
                bannersList.map((row, index) => (
                  <tr key={index}>
                    <td className="table_sn">{index + 1}</td>
                    <td className='table_img'>
                      {row.category ===  "image" && <img src={row.desktopImage} alt=""/>}
                      {row.category ===  "video" && <video src={row.desktopVideo}></video>}
                    </td>
                    <td>{row.title}</td>
                    <td>{row.content}</td>
                    <td>{row.status}</td>
                    <td className='table_category'><a href={row.link} target='_blank'>{row.link}</a></td>
                    <td style={{ textAlign: 'center', width: '150px' }}>
                      <EditButton editUrl={`/admin/edit_banners/${row._id}`}/>
                      <DeleteButton deleteAction={deleteData} rowId={row._id}  />                  
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Banner List is Empty</td>
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

export default BannersList