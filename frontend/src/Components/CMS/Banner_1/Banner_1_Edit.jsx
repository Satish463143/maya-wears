import React, {useState,useEffect} from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import BannerForm from '../BannerForm/BannerForm';
import LoadingComponent from '../../../Middlewares/Loading/Loading.component';
const Banner_1_Edit = () => {
    const [loading,setLoading] = useState(false)
    const [selectedCategory, setSelectedCategory ] = useState('')
    const [banner, setBanner] = useState()
    const [imageFile, setImageFile] = useState(null);
    const getDetail = async()=>{
        try{
          const detail = await collectionSvc.getRequest("/banner_1/"+params.id,{auth:true})       
          
          setBanner(detail.result)
          setLoading(false)
        }catch(exception){
          console.log(exception)
          toast.error("Error while fetching collection", {
            onClose: () => navigate("/admin/banner_1"), // Navigates after the toast shows
          }); 
        }
      }
  
      useEffect(()=>{
        getDetail()
      },[])


  return (
    <div className='admin_margin_box'>
        <div className="admin_titles">
            <AdminTitle label1=" Banner 1 List" label2="/Edit_Banner" url="/admin/banner_1"/>
            <div className='Dashboard_title'>
                <h1>Edit Banner 1</h1>
            </div>
        </div>

        <div className="banner_form">
        {loading ? <><LoadingComponent/></>:
            <>
                <BannerForm 
                // detail={
                //    {

                //    } 
                // } submitEvent={SubmitEvent} loading={loading} setImageFile={setImageFile}
                />
            </>
        }
        </div>


    </div>
  )
}

export default Banner_1_Edit