import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle';
import FeatuedProductForm from './FeatuedProductForm';
import { useCreateMutation, useListAllQuery } from '../../../api/featuredProduct.api';
import { toast } from 'react-toastify';

const FeatuedProductAdd = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [addFeaturedProduct] = useCreateMutation()

  const submitEvent = async(data)=>{
    setLoading(true)
      
    try{ 
      const formData = new FormData();
      formData.append("status", data.status.value); 
      formData.append("title", data.title); 
      formData.append("subTitle", data.subTitle);
      formData.append("link", data.link);
      if (data.mobileImage instanceof File) {
        formData.append("mobileImage", data.mobileImage);
      }
      if (data.desktopImage instanceof File) {
          formData.append("desktopImage", data.desktopImage);
      }
      
      await addFeaturedProduct(formData).unwrap()

      toast.success("Featurued product added sucessfully")      
      navigate('/admin/featured_product')  
    }catch(exception){
      toast.error("Error while adding product")
    }
    finally{
      setLoading(false)
    }

  }


  return (
    <div className='admin_margin_box'>
      <div className="admin_titles">
          <AdminTitle label1=" Product List" label2="/Add Product" url="/admin/featured_product" />
            <div className='Dashboard_title'>
                <h1>Add Product</h1>
            </div>
      </div>
      <div className="banner_form">
          <FeatuedProductForm
              submitEvent={submitEvent}
              loading={loading}
              value='Add product'
          />
      </div>

    </div>
  )
}

export default FeatuedProductAdd