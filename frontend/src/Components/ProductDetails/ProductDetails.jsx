import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import { useListForHomeQuery } from '../../api/product.api';
import LoadingComponent from '../../Middlewares/Loading/Loading.component';

const ProductDetails = ({  toogleCart, toogleAddToCart }) => {
  const { slug,_id } = useParams();
  const { ProductList } = useContext(StoreContext);
  const [product, setProduct] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const {data, error, isLoading} = useListForHomeQuery(null)

  if(isLoading)<LoadingComponent/>
  const productsById = data?.result?.data || []

  useEffect(() => {    
    const foundProduct = productsById.find(item => item._id === _id);
    setProduct(foundProduct);
    setLoading(false);
    setIsInCart(foundProduct ? isProductInCart(foundProduct._id) : false);
  }, [_id, productsById]);

  const isProductInCart = (productId) => {
    // Normally, this should use the cartList from context
    return false; // Dummy value for now
  };

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
                {product.availableSize.map((size) => (
                <button
                    key={size}
                    onClick={() => handleSize(size)}
                    className={selectedSize === size ? 'selected_size' : ''}
                >
                    {size }
                </button>
                ))}
                <p className='color'><span  style={{ fontWeight: '600' }}>Color:</span>{product.color}</p>
                <button 
                    className='cart_btn' 
                    onClick={() => {
                        if (!selectedSize) {
                        alert("Please select a size!"); // Alert user if no size is selected
                        return;
                        }
                        toogleCart();
                        toogleAddToCart(product, selectedSize); // Pass selected size explicitly
                    }} 
                    disabled={isInCart}
                    >
                    {isInCart ? 'View In Cart' : 'Add To Bag'}
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
