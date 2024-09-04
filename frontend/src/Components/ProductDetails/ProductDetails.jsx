import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = ({isCartActive , toogleCart}) => {
  const { _id } = useParams();
  const { ProductList } = useContext(StoreContext);
  const [product, setProduct] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [isSelectedSize, setSelectedSize] = useState(null); // Corrected typo in variable name
  const [activeTab, setActiveTab] = useState('description');
  const {cartList, addToCartList} =  useContext(StoreContext)

    const isCartList = cartList.some(item => item._id === _id)
    const toogleAddToCart = (e)=>{
        // e.preventDefault();
        const cartProperty = {_id, title, image, color, price }
        addToCartList(cartProperty);
        console.log("Updated cart list:", cartList);
    }

  useEffect(() => {
    const foundProduct = ProductList.find(item => item._id === _id);
    setProduct(foundProduct);
    setLoading(false);
  }, [_id, ProductList]);

  if (!product) return <div>Product not found</div>;
  if (Loading) return <div>Loading...</div>;

  const media = [
    { type: 'image', src: product.image1 },
    { type: 'image', src: product.image2 },
    // { type: 'video', src: product.video },
    { type: 'image', src: product.image3 },
    { type: 'image', src: product.image4 },
    { type: 'image', src: product.image5 },
    { type: 'image', src: product.image6 },
  ].filter(item => item.src);

  const handleSize = (size) => {
    setSelectedSize(size);
  };

  

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };



  return (
    
        <div className='product_page'>
            <div data-aos="fade-up">
        <div className='container'>
            <div className="details_grid">
            <div className='product_img_grid'>
                {media.map((item, index) => (
                <div className="product_img" key={index}>
                    {item.type === 'image' ? (
                    <img src={item.src} alt="" />
                    ) : item.type === 'video' ? (
                    <video src={item.src} autoPlay loop muted />
                    ) : null}
                </div>
                ))}
            </div>
            <div className='product_details'>
                <h1 className='headers'>{product.title}</h1 >
                <p className='price'>Rs.{product.price}/-</p>
                <span style={{ fontWeight: '600' }}>Size:</span> <span>Size Guide</span><br />
                {product.availableSize.map((item) => (
                <button
                    key={item}
                    onClick={() => handleSize(item)}
                    className={isSelectedSize === item ? 'selected_size' : ''}
                >
                    {item}
                </button>
                ))}
                <p className='color'><span  style={{ fontWeight: '600' }}>Color:</span>{product.color}</p>
                <button className='cart_btn' onClick={() => { toogleCart(); toogleAddToCart(); }}>Add To Bag</button>
                <button className='buy_btn'>Buy Now</button>
                <h3 id='wishlist'>+ Add To My List</h3>
                <div className="product-tabs">
                    <div className="tab-buttons">
                        <button
                        className={activeTab === 'description' ? 'active' : ''}
                        onClick={() => handleTabClick('description')}
                        >
                        Description
                        </button>
                        <button
                        className={activeTab === 'sizeFit' ? 'active' : ''}
                        onClick={() => handleTabClick('sizeFit')}
                        >
                        Size & Fit
                        </button>
                        <button
                        className={activeTab === 'aboutBrand' ? 'active' : ''}
                        onClick={() => handleTabClick('aboutBrand')}
                        >
                        About The Brand
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'description' && (
                        <div className="tab-pane">
                            <p>Here goes the product description...</p>
                        </div>
                        )}
                        {activeTab === 'sizeFit' && (
                        <div className="tab-pane">
                            <p>Here goes the size and fit information...</p>
                        </div>
                        )}
                        {activeTab === 'aboutBrand' && (
                        <div className="tab-pane">
                            <p>Here goes information about the brand...</p>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            </div>

        </div>
        </div>
    </div>
  );
};

export default ProductDetails;
