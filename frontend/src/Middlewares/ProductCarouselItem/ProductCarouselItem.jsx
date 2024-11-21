import React from 'react'
import './ProductCarouselItem.css'
import image from '../../assets/images/desktop.jpg'
import { Link } from 'react-router-dom'
const ProductCarouselItem = ({_id,slug }) => {
  return (
    <div className='product_carousel'>
        <div className="carousel_img">
            <Link to={`/product/${slug}/${_id}`}>
                <img src={image} alt="" />
            </Link>
        </div>
        {/* <div className="carousel_overlay"></div>
        <div className="carousel_content ">
            <div className="container">
                <div className="carousel_desc">
                    <h1>{title}</h1>
                    <h2>Rs.{price}/-</h2>
                    <button>Add to bag</button>
                </div>
            </div> */}
    </div>
  )
}

export default ProductCarouselItem