import React, {useState} from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { Link } from 'react-router-dom';

const CollectionList = () => {
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState('');
  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  };
  return (
    <div className='admin_margin_box'>
      <div className="admin_titles">
        <AdminTitle label1=" Collection List" />
        <div className='Dashboard_title'>
            <h1>Collection List</h1>
            <Link to="/admin/add_collection">
              <button className='edit_btn'>Add Collection</button>
            </Link>
        </div>
      </div>

      <div className='blog_table'>
        {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
          <table border="2">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Image</th>
                <th>Name</th>
                <th>Decription</th>                
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              
                <tr>
                  <td className='table_sn'></td>
                  <td className='table_img'>
                    <img src="" alt=""/>
                  </td>
                  <td className='table_title'></td>
                  <td className=' table_content'>{truncateContent("Hi i am satish satish satish satish satis hs a t is h satish satish", 10)}</td>
                  <td className='table_category'></td>
                  <td style={{textAlign:'center', width: '150px'}}>
                    <Link to="/admin/banner_1_edit">
                      <button className='edit_btn'>Edit</button>
                    </Link>
                  </td>
                </tr>
            </tbody>
          </table>
        )}
      </div>

    </div>
  )
}

export default CollectionList