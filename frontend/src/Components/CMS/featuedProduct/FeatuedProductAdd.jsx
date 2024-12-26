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
   const { refetch} = useListAllQuery()

  const submitEvent = async(data)=>{
    setLoading(true)
    const fromData = new FormData();
      fromData.append("status", data.status.value); // Add status as a string
      fromData.append("title", data.title); // Add other fields
      fromData.append("subTitle", data.subTitle);
      fromData.append("link", data.link);
      fromData.append("desktopImage", data.desktopImage); // Add file
      fromData.append("mobileImage", data.mobileImage);
    
    try{ 

      await addFeaturedProduct(fromData).unwrap()
      toast.success("Featurued product added sucessfully")      
      navigate('/admin/featured_product')  
      refetch()    
    }catch(exception){
      console.log(exception)
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