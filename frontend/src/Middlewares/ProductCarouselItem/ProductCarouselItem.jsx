import React from 'react';
import './ProductCarouselItem.css';
import { Link } from 'react-router-dom';

const ProductCarouselItem = ({ _id, slug, featureDesktopImage }) => {
    return (
        <div className='product_carousel'>
            <div className="carousel_img">
                <Link to={`/product/${slug}/${_id}`}>
                    <img
                        src={featureDesktopImage}
                        alt="Feature Desktop Image"
                    />
                </Link>
            </div>
        </div>
    );
};

export default ProductCarouselItem;
