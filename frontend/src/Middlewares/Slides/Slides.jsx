import React from 'react';
import './Slides.css';
import {Link} from 'react-router-dom'

const Slides = ({_id,image,fabric, title, pattern, sizes, wearable, price }) => {
  return (
    <Link to={`/product/${_id}`}>
        <div className='slides_box'>
            <div className='slidex_box_flex'>
                <h1>MAYA</h1>
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
                        <p>{pattern}</p>  
                    </div>              
                    <div className='details_grid_box'>
                        <img src="../src/assets/images/size.webp" alt="" />
                        <p>{sizes + ' , '}</p> 
                    </div>              
                    <div className='details_grid_box'>
                        <img src="../src/assets/images/style.webp" alt="" />
                        <p>{wearable}</p> 
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
