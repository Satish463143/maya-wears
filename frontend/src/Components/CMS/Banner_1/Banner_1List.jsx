import React, {useEffect, useState,useCallback} from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { Toast } from 'flowbite-react';
import EditButton from '../../../Middlewares/EditButton/EditButton';
import collectionSvc from '../Collection/Collection.service';
import LoadingComponent from '../../../Middlewares/Loading/Loading.component';

const Banner_1List = () => {  
  const [loading, setLoading] = useState(false); 
  const [banner, setBanner] = useState([]);

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  };

  const getBanner = useCallback(async () => {
    setLoading(true);
    try {
      const response = await collectionSvc.getRequest('/banner_1', {
        auth: true,
      });
      setBanner(response.result);      
    } catch (exception) {
      console.log(exception);
      Toast.error('Error Getting Banner');
    } finally {
      setLoading(false);
    }
  });
  useEffect(()=>{
    getBanner()
  },[])

  return (
    <div className='admin_margin_box'>
      <div className="admin_titles">
        <AdminTitle label1=" Banner 1 List" />
        <div className='Dashboard_title'>
            <h1>Banner 1 List</h1>
        </div>
      </div>

        <div className='blog_table'>
       
          <table border="2">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Image/Viedeo</th>
                <th>Title</th>
                <th>Content</th>                
                <th>Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {loading ? (
                <tr>  
                  <td colSpan="6"><LoadingComponent/></td>
                </tr>
              ) : ( 
                banner.map((row,index)=>(
                  <tr>
                    <td className='table_sn'>{index + 1}</td>
                    <td className='table_img'>
                      <img src="" alt=""/>
                    </td>
                    <td className='table_title'>{row.title}</td>
                    <td className=' table_content'>{truncateContent(row.content, 10)}</td>
                    <td className='table_category'><a href={row.link} target='_blank'>{row.link}</a></td>
                    <td style={{textAlign:'center', width: '150px'}}>
                      <EditButton editUrl={`/admin/banner_1_edit/${row._id}`}/>
                    </td>
                  </tr>
                ))
                            
              )
            }
                

              
              
              
            </tbody>
          </table>
      </div>


    </div>
  )
}

export default Banner_1List