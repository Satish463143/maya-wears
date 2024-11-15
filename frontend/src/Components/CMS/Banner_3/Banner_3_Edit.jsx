import React, {useState,useEffect} from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import BannerForm from '../BannerForm/BannerForm';
import LoadingComponent from '../../../Middlewares/Loading/Loading.component';
import collectionSvc from '../Collection/Collection.service';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'
const Banner_3_Edit = () => {
    const [loading,setLoading] = useState(false)
   
    const [banner, setBanner] = useState()
    // const [imageFile, setImageFile] = useState(null);
    const params = useParams();
    const navigate = useNavigate()


    // get the details of the  individuals banner
    const getDetail = async()=>{
        try{
            const detail = await collectionSvc.getRequest("/banner_3/"+params.id,{auth:true})           
            setBanner(detail.result)
            // console.log(banner)
            setLoading(false)            
        }catch(exception){
            console.log(exception,"here is the error")
            toast.error("Error while fetching collection")
            navigate("/admin/banner_3") // Navigates after the toast shows 
        }
      }
  
      useEffect(()=>{
        getDetail()
      },[])

      const submitEvent = async (data)=>{
        setLoading(true);
        try{
            const submitData  = {
                ...data,
                category: data.category.value,
                
            }

            if(typeof data.mobileImage === 'string'){
                delete submitData.mobileImage
            }
            if(typeof data.mobileVideo === 'string'){
                delete submitData.mobileVideo
            }
            if(typeof data.desktopImage === 'string'){
                delete submitData.desktopImage
            }
            if(typeof data.desktopVideo === 'string'){
                delete submitData.desktopVideo
            }


            // api call for edit operation
            await collectionSvc.putRequest("/banner_3/" + params.id, submitData, { auth: true, file: true });


            toast.success("Banner Updated Successfully");
            setTimeout(() => navigate("/admin/banner_3"), 1000);

        }catch(exception){
            let errorMessage = "Error while updating banner";
            toast.error(errorMessage);
            console.error(exception, "Error here");
        }finally{
            setLoading(false)
        }

      }


  return (
    <div className='admin_margin_box'>
        <div className="admin_titles">
            <AdminTitle label1=" Banner 3 List" label2="/Edit_Banner" url="/admin/banner_3"/>
            <div className='Dashboard_title'>
                <h1>Edit Banner 3</h1>
            </div>
        </div>
        <ToastContainer />
        <div className="banner_form">
            {loading ? (
                <LoadingComponent />
            ) : banner ? (
                <BannerForm 
                    detail={{
                        title: banner.title,
                        content: banner.content,
                        category: {
                        label: banner.category === 'image' ? 'Image' : 'Video',
                        value: banner.category
                        },
                        link: banner.link,
                        desktopImage: banner.desktopImage,
                        mobileImage: banner.mobileImage,
                        desktopVideo: banner.desktopVideo,
                        mobileVideo: banner.mobileVideo
                    }}
                    submitEvent={submitEvent}
                    loading={loading}
                />
            ) : (
                <LoadingComponent /> // Optional: Display a message if `banner` is not yet loaded
            )}
        </div>


    </div>
  )
}

export default Banner_3_Edit