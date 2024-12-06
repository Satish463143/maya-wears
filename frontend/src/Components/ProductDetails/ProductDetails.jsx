import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useListForHomeQuery } from "../../api/product.api";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";
import { useCreateCartMutation, useListAllCartQuery } from "../../api/cart.api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProductDetails = ({ toogleCart }) => {
  const { slug, _id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState(""); // State for size
  const { refetch } = useListAllCartQuery();

  const { data, isLoading } = useListForHomeQuery(null);
  const [createCart, { isLoading: isCreatingCart }] = useCreateCartMutation();

  const [isDiscriptionOpen, setDiscriptionOpen] = useState(false);
  const [isFitOpen, setFitOpen] = useState(false);
  const [isMaterialCareOpen, setMaterialCareOpen] = useState(false);

  const togglediscription = () => setDiscriptionOpen(!isDiscriptionOpen);
  const toggleFit = () => setFitOpen(!isFitOpen);
  const toggleMaterialCare = () => setMaterialCareOpen(!isMaterialCareOpen);


  const loggedInUser = useSelector((root) => {
    return root.user.loggedInUser || null;
  });

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
    if (!loggedInUser) {
      toast.error("Please login to add the item to cart");
      return;
    }

    if (!selectedSize) {
      toast.error("Plase select a size to add the product in cart");
      return;
    }

    try {
      const response = await createCart({
        productId: product._id,
        size: selectedSize,
        quantity,
      }).unwrap();
      toast.success("Product added to cart!");
      toogleCart(); // Update cart badge
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Failed to add product to cart.");
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
                    <p className="size__guideee">Size Guide</p>
                  </div>
                </div>
                <div className="buyNow__cartBtn">
                  <button
                    className="cart_btn cart__buy hoverBotton"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="product__discription">
            <ul>
              <li>
                <div>
                  <p onClick={togglediscription}>
                    <span>Discription</span>
                    <span>{isDiscriptionOpen ? "-" : "+"}</span>
                  </p>
                  {isDiscriptionOpen && (
                    <div
                      className={`product_desc ${
                        isDiscriptionOpen ? "open" : ""
                      }`}
                    >
                      <p className="disc_pad_top">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsum minima fuga omnis culpa nesciunt modi voluptate,
                        aut laboriosam tempore temporibus!
                      </p>
                    </div>
                  )}
                </div>
              </li>
              <li>
                <div>
                  <p onClick={toggleFit}>
                    <span>Fit</span>
                    <span>{isFitOpen ? "-" : "+"}</span>
                  </p>
                  {isFitOpen && (
                    <div
                      className={`sub_fotter_menu ${isFitOpen ? "open" : ""}`}
                    >
                      <p className="disc_pad_top">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nobis saepe minima fugiat accusantium dignissimos dicta
                        alias ex omnis! Excepturi optio voluptate incidunt
                        assumenda, necessitatibus autem!
                      </p>
                    </div>
                  )}
                </div>
              </li>
              <li>
                <div>
                  <p onClick={toggleMaterialCare}>
                    <span>Material and Care</span>
                    <span>{isMaterialCareOpen ? "-" : "+"}</span>
                  </p>
                  {isMaterialCareOpen && (
                    <div
                      className={`sub_fotter_menu ${
                        isMaterialCareOpen ? "open" : ""
                      }`}
                    >
                      <p className="disc_pad_top">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aperiam officia autem dicta iure consequuntur? Nostrum
                        officiis corporis nesciunt blanditiis quam? Totam
                        pariatur omnis labore qui quo optio enim hic sunt?
                      </p>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
