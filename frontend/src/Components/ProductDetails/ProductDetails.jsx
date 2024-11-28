import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useListForHomeQuery } from "../../api/product.api";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";
import { useCreateCartMutation } from "../../api/cart.api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProductDetails = ({ toogleCart }) => {
  const { slug, _id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description"); 
  const [selectedSize, setSelectedSize] = useState(""); // State for size
  const [quantity, setQuantity] = useState(1); // State for quantity



  const { data, isLoading } = useListForHomeQuery(null);
  const [createCart, {isLoading:isCreatingCart}] = useCreateCartMutation()
  const loggedInUser  = useSelector((root)=>{
    return root.user.loggedInUser || null
  })

  useEffect(() => {
    if (data) {
      const productsById = data?.result?.data || [];
      const foundProduct = productsById.find(
        (item) => item._id === _id || item.slug === slug
      );
      setProduct(foundProduct || null); // Set the found product
    }
  }, [data, _id, slug]);
  if (isLoading) <LoadingComponent />;

  if (!product) return <div>Product not found</div>;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  

  const handleAddToCart = async () => {
    
      if(!loggedInUser){
        toast.error("Please login to add the item to cart")
        return;
      } 

      if (!selectedSize) {
        toast.error('Plase select a size to add the product in cart')
        return;
      }

    try {
      const response = await createCart({
        productId: product._id,
        size: selectedSize,
        quantity,
      }).unwrap();
      toast.success("Product added to cart!")
      toogleCart(); // Update cart badge
    } catch (error) {
      toast.error(error.data?.message || "Failed to add product to cart.")
    }
  };

  return (
    <div className="product_page">
      <div>
        <div className="container">
          <div className="details_grid">
            <div className="product_img_grid">
              {product.images.map((item) => (
                  <img src={item} alt="" />
              ))}
            </div>
            <div>
              <p className="model__wearing__size">
                <span>
                  Model is <span>5'8</span>,wearing a size <span>Xl</span>
                </span>
              </p>
              <div className="product_details">
                <p className="price price__off">NRP.{product.price}.00</p>
                <p className="product__title">{product.title}</p>
                <div className="size__color">
                  <p className="sizeeee">Select the Size:</p>
                  <div className="size__flex">
                    <div className="size__">
                      {product.sizes.map((item,index) => (
                        <button
                          key={index}
                          className={`size__option ${
                            selectedSize === item.size ? "activeSize" : ""
                          }`}
                          onClick={() => setSelectedSize(item.size)}
                        >
                          {item.size}
                        </button>
                      ))}
                    </div>
                    <p className="size__guideee">Size Guide</p>
                  </div>                  
                </div>
                <div className="buyNow__cartBtn">                 
                  <button className="cart_btn cart__buy"  onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="product__discription">
            <ul>
              <li>
                <a href="">Description</a>
                <p>+</p>
              </li>
              <li>
                <a href="">fit</a>
                <p>+</p>
              </li>
              <li>
                <a href="">Material and care</a>
                <p>+</p>
              </li>
            </ul>
          </div>
          {/* <div className="product-tabs">
            <div className="tab-buttons">
              <button
                className={activeTab === "description" ? "active" : ""}
                onClick={() => handleTabClick("description")}
              >
                Description
              </button>
              <button
                className={activeTab === "sizeFit" ? "active" : ""}
                onClick={() => handleTabClick("sizeFit")}
              >
                Size Guide
              </button>
              <button
                className={activeTab === "aboutBrand" ? "active" : ""}
                onClick={() => handleTabClick("aboutBrand")}
              >
                About The Brand
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "description" && (
                <div className="tab-pane">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  ></div>
                </div>
              )}
              {activeTab === "sizeFit" && (
                <div className="tab-pane">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Animi ipsa voluptates nihil veniam sit voluptatem dicta,
                    aspernatur debitis earum voluptas.
                  </p>
                </div>
              )}
              {activeTab === "aboutBrand" && (
                <div className="tab-pane">
                  <div
                    dangerouslySetInnerHTML={{ __html: product.summary }}
                  ></div>
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

// {
//   /* <p className="size__guide">Size</p> */
// }
// {
//   ("");
// }
// {
//   /* <span>Size Guide</span> */
// }

// {
//   /* {product.availableSize.map((size) => (
// <button
//    key={size}
//    // onClick={() => handleSize(size)}
//    className={selectedSize === size ? 'selected_size' : ''}
// >
//    {size }
// </button>
// ))} */
// }
