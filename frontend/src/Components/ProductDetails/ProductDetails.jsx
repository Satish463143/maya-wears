import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import { useListForHomeQuery } from '../../api/product.api';
import LoadingComponent from '../../Middlewares/Loading/Loading.component';

const ProductDetails = ({  toogleCart, toogleAddToCart }) => {
  const {slug ,_id } = useParams();
  const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [isInCart, setIsInCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const {data, error, isLoading} = useListForHomeQuery(null)

  useEffect(()=>{
    if(data){
        const productsById = data?.result?.data || []
        console.log('products', productsById)
        const foundProduct = productsById.find(item => item._id === _id || item.slug === slug);
        setProduct(foundProduct || null);
        console.log('found product',product)
    }
  },[data, _id,slug])
  if(isLoading)<LoadingComponent/>

  if (!product) return <div>Product not found</div>;
  

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    
        <div className='product_page'>
            <div data-aos="fade-up">
        <div className='container'>
            <div className="details_grid">
            <div className='product_img_grid'>
                {product.images.map(item=>(
                    <div className="product_img" >
                        <img src={item} alt="" />
                    </div>
                ))}
            </div>
            <div className='product_details'>
                <h1 className='headers'>{product.title}</h1 >
                <p className='price'>Rs.{product.price}/-</p>
                <span style={{ fontWeight: '600' }}>Size:</span> <span>Size Guide</span><br />
                {/* {product.availableSize.map((size) => (
                <button
                    key={size}
                    // onClick={() => handleSize(size)}
                    className={selectedSize === size ? 'selected_size' : ''}
                >
                    {size }
                </button>
                ))} */}
                {product.sizes.map((item)=>(
                    <button >{item.size}</button>
                ))}
                <p className='color'><span  style={{ fontWeight: '600' }}>Color:</span>{product.color}</p>
                <button 
                    className='cart_btn' 
                    // onClick={() => {
                    //     if (!selectedSize) {
                    //     alert("Please select a size!"); // Alert user if no size is selected
                    //     return;
                    //     }
                    //     
                    //     toogleAddToCart(product, selectedSize); // Pass selected size explicitly
                    // }} 
                    // disabled={isInCart}
                    // 
                    onClick={()=>{
                        toogleCart();
                    }}
                    >
                    {/* {isInCart ? 'View In Cart' : 'Add To Bag'} */}
                    Add To Bag
                    
                </button>
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
                            <div dangerouslySetInnerHTML={{__html: product.description}}></div>
                            
                        </div>
                        )}
                        {activeTab === 'sizeFit' && (
                        <div className="tab-pane">
                            <p>Here goes the size and fit information...</p>
                        </div>
                        )}
                        {activeTab === 'aboutBrand' && (
                        <div className="tab-pane">
                           <div dangerouslySetInnerHTML={{__html: product.summary}}></div>
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
