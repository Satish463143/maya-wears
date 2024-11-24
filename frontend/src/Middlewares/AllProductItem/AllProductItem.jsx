import './AllProductItem.css'
import { Link } from 'react-router-dom'
const AllProductItem = ({ _id, slug, images, title, price })=>{
    return(
        <>
        <Link to={`/product/${slug}/${_id}`}>
          <div className="">
            <div className="">
              <img src={images} alt="" />
              
            </div>
  
            <div className="">
              <h2>{title}</h2>
             
              <h3>NRP.{price}.00</h3>
             
            </div>
          </div>
        </Link>
      </>
    )
}
export default AllProductItem