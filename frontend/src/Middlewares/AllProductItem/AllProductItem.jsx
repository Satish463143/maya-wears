import './AllProductItem.css'
import { Link } from 'react-router-dom'
const AllProductItem = ({ _id, slug, images, title, price })=>{
    return(
        <>
        <Link to={`/product/${slug}/${_id}`}>
          <div className="Product__catalog">
            <div className=" product__image">
              <img src={images} alt="" />
            </div>
  
            <div className=" name__price">
              <h2 className='name__'>{title}</h2>
             
              <h3 className='price__'>NRP.{price}.00</h3>
             
            </div>
          </div>
        </Link>
      </>
    )
}
export default AllProductItem