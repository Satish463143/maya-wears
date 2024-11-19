import React from 'react';
import './Slides.css';
import {Link} from 'react-router-dom'
import fabricImg from '../../../src/assets/images/fabric.webp'
import styleImg from '../../../src/assets/images/style.webp'
import patternImg from '../../../src/assets/images/pattern.png'
import sizeImg from '../../../src/assets/images/size.webp'


const Slides = ({_id,slug,image,fabric, title, pattern, sizes, wearable, price }) => {
  return (
    <Link to={`/product/${slug}/${_id}`}>
        <div className='slides_box'>
            <div className='slidex_box_flex'>
                <h1>MAYA</h1>
                <h2>{title}</h2>
                <div className='slides_image'>
                    <img src={image} alt={title} />
                </div>
                <div className='details_grid'>
                    <div className='details_grid_box'>
                        <img src={fabricImg} alt="" />
                        <p>{fabric}</p>  
                    </div>              
                    <div className='details_grid_box'>
                        <img src={patternImg} alt="" />
                        <p>{pattern}</p>  
                    </div>              
                    <div className='details_grid_box'>
                        <img src={sizeImg} alt="" />
                        <p>{sizes + ' , '}</p> 
                    </div>              
                    <div className='details_grid_box'>
                        <img src={styleImg} alt="" />
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
