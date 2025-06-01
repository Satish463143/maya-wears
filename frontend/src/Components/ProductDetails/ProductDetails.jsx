import React, { useEffect,useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useListForHomeQuery } from "../../api/product.api";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";
import { useCreateCartMutation } from "../../api/cart.api";
import { toast } from "react-toastify";
import sizeGuide from '../../assets/images/size-guide.jpg'

const ProductDetails = ({ toogleCart }) => {
  const { slug, _id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false)
  const [selectedSize, setSelectedSize] = useState(""); // State for size

  const [activeIndex, setActiveIndex] = useState(null);         
  const toggleHelp = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  //call the  product api
  const { data, isLoading } = useListForHomeQuery({});
  //call the create cart api
  const [createCart] = useCreateCartMutation();

  const [selectSize, setSelectSize] = useState();

  const toggleSelectSize = () => {
    setSelectSize(!selectSize);
  };
  

  useEffect(() => {
    if (data) {
      const productsById = data?.result?.data || [];
      const foundProduct = productsById.find(
        (item) => item._id === _id || item.slug === slug
      );
      setProduct(foundProduct || null); // Set the found product
    }
  }, [data, _id, slug]);

  // Reset state when product changes (when navigating between different products)
  useEffect(() => {
    setSelectedSize(""); // Reset selected size
    setActiveIndex(null); // Reset accordion state
    // Reset scroll position for image container (both vertical and horizontal)
    const imageContainer = document.querySelector('.product_img_grid');
    if (imageContainer) {
      imageContainer.scrollTop = 0; // Reset vertical scroll (desktop)
      imageContainer.scrollLeft = 0; // Reset horizontal scroll (mobile)
    }
  }, [_id, slug]); // Reset when product ID or slug changes

  if (isLoading) return <LoadingComponent 
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f9f9f9',
    }} 
  />;

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size to add the product to the cart");
      return;
    }
    setLoading(true)

    try {
      // Optimistically add product to the cart by modifying the cache
       await createCart({
        productId: product._id,
        size: selectedSize,
        quantity: 1,
      }).unwrap();

      toast.success("Product added to cart!");
      toogleCart(); // Update cart badge

    } catch (error) {
      toast.error(error.data?.message || "Failed to add product to cart.");
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <>
      <div className="product_page">        
        <div className="details_grid">
          <div className="product_img_grid" >
            <img src={product.mainImage} alt="" />
            {product.images.map((item) => (
              <img src={item} alt={item} loading='lazy'/>
            ))}
          </div>
          <div className="product_detail_box" >                
            <div className="product_details">
              <p className="price price__off">NRP.{product.price}.00</p>
              <p className="product__title">{product.title}</p>
              <div className="size__color">
                <p className="sizeeee">Prefer your size:</p>
                <div className="size__flex">
                  <div className="size__">
                    {product.sizes.map((item, index) => (
                      <button
                        key={index}
                        className={`size__option  ${
                          selectedSize === item.size ? "activeSize" : ""
                        }`}
                        onClick={() => setSelectedSize(item.size)}
                      >
                        {item.size}
                      </button>
                    ))}
                  </div>
                  
                </div>
                <p className="model__wearing__size">
                  <span>
                    {product.modelSize === 'null' ? '' : product.modelSize }
                  </span>
                </p>
                <p className="size__guideee" onClick={toggleSelectSize}>
                    View Size Guide
                  </p>
              </div>
              <div className="buyNow__cartBtn">
                <button
                  className="cart_btn cart__buy hoverBotton"
                  onClick={handleAddToCart}
                  style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity:loading? '0.5' : '1' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="desktop_decription">
              <div className={`faq-item ${activeIndex === 0 ? "active" : ""}`} onClick={() => toggleHelp(0)} >
                <div className="faq-question"> <h3> Description </h3> </div>
                {activeIndex === 0 && (
                 <p dangerouslySetInnerHTML={{ __html: product?.description }}></p>
                )}
              </div>
              <div className={`faq-item ${activeIndex === 1 ? "active" : ""}`} onClick={() => toggleHelp(1)} >
                <div className="faq-question"> <h3>Fit </h3> </div>
                {activeIndex === 1 && (
                  <p dangerouslySetInnerHTML={{__html:product?.fit}}></p>
                )}
              </div>
              <div className={`faq-item ${activeIndex === 2 ? "active" : ""}`} onClick={() => toggleHelp(2)} >
                <div className="faq-question"> <h3>Material and Care </h3> </div>
                {activeIndex === 2 && (
                  <p dangerouslySetInnerHTML={{__html:product?.materailCare}}></p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mobile_decription container">
          <div className={`faq-item ${activeIndex === 0 ? "active" : ""}`} onClick={() => toggleHelp(0)} >
            <div className="faq-question"> <h3> Description </h3> </div>
            {activeIndex === 0 && (
              <p dangerouslySetInnerHTML={{ __html: product?.description }}></p>
            )}
          </div>
          <div className={`faq-item ${activeIndex === 1 ? "active" : ""}`} onClick={() => toggleHelp(1)} >
            <div className="faq-question"> <h3>Fit </h3> </div>
            {activeIndex === 1 && (
              <p>{product?.fit}</p>
            )}
          </div>
          <div className={`faq-item ${activeIndex === 2 ? "active" : ""}`} onClick={() => toggleHelp(2)} >
            <div className="faq-question"> <h3>Material and Care </h3> </div>
            {activeIndex === 2 && (
              <p dangerouslySetInnerHTML={{__html:product?.materailCare}}></p>
            )}
          </div>
        </div>
        
      </div>
      <div className={`size_popup ${selectSize ? 'dispplay_size_guide': ''}`}>
        <div className="overlay_popup" onClick={toggleSelectSize}></div>
          <div className="sizee_des">
            <img src={sizeGuide} alt="Maya-wears size guide" loading='lazy'/>  
            <button className="close_btnn" onClick={toggleSelectSize}>
              <svg viewBox="0 0 24 24" height='24px' width='24px' xmlns="http://www.w3.org/2000/svg"><g id="Line"><path fill="white" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"/><path fill="white" d="M15.71,8.29a1,1,0,0,0-1.42,0L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L13.41,12l2.3-2.29A1,1,0,0,0,15.71,8.29Z"/></g></svg>
            </button>           
          </div>          
      </div> 
      
    </>
  );
};

export default ProductDetails;
