import React from 'react';
import './Slides.css';
import {Link} from 'react-router-dom'

const Slides = ({ image, logo, fabric, title, dhakaPattern, availableSize, styles, price, quantity, category }) => {
  return (
    <Link >
    <div className='slides_box'>
        <div className='slidex_box_flex'>
            <h1>{logo}</h1>
            <h2>{title}</h2>
            <div className='slides_image'>
                <img src={image} alt={title} />
            </div>
            <div className='details_grid'>
                <div className='details_grid_box'>
                    <img src="../src/assets/images/fabric.webp" alt="" />
                    <p>{fabric}</p>  
                </div>              
                <div className='details_grid_box'>
                    <img src="../src/assets/images/pattern.png" alt="" />
                    <p>{dhakaPattern}</p>  
                </div>              
                <div className='details_grid_box'>
                    <img src="../src/assets/images/size.webp" alt="" />
                    <p>{availableSize}</p> 
                </div>              
                <div className='details_grid_box'>
                    <img src="../src/assets/images/style.webp" alt="" />
                    <p>{styles}</p> 
                </div>   
            </div>
            <div className='price_btn_grid'>
                <h2>Rs.{price}/-</h2>
                <button>See Details</button>
            </div>
        </div>
    </div>
    </Link>
  );
};

export default Slides;
