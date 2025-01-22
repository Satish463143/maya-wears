import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useListForHomeQuery } from "../../api/product.api";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";
import { useCreateCartMutation, useListAllCartQuery } from "../../api/cart.api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const ProductDetails = ({ toogleCart }) => {
  const cartId = Cookies.get("cartId");
  const { slug, _id } = useParams();
  const [product, setProduct] = useState(null);

  const [selectedSize, setSelectedSize] = useState(""); // State for size

  const { data, isLoading } = useListForHomeQuery({});
  const [createCart, { isLoading: isCreatingCart }] = useCreateCartMutation();
  const { data: cartData } = useListAllCartQuery(cartId);

  const [isDiscriptionOpen, setDiscriptionOpen] = useState(false);
  const [isFitOpen, setFitOpen] = useState(false);
  const [isMaterialCareOpen, setMaterialCareOpen] = useState(false);

  const togglediscription = () => setDiscriptionOpen(!isDiscriptionOpen);
  const toggleFit = () => setFitOpen(!isFitOpen);
  const toggleMaterialCare = () => setMaterialCareOpen(!isMaterialCareOpen);
  const [selectSize, setSelectSize] = useState(false);

  const toggleSelectSize = () => {
    setSelectSize(!selectSize);
  };
  if(selectSize){
    document.body.classList.add('active_select_sizes')
  }
  else{
    document.body.classList.remove('active_select_sizes')

  }
  useEffect(() => {
    if (data) {
      const productsById = data?.result?.data || [];
      const foundProduct = productsById.find(
        (item) => item._id === _id || item.slug === slug
      );
      setProduct(foundProduct || null); // Set the found product
    }
  }, [data, _id, slug]);

  if (isLoading) return <LoadingComponent />;

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size to add the product to the cart");
      return;
    }

    try {
      // Optimistically add product to the cart by modifying the cache
      const response = await createCart({
        productId: product._id,
        size: selectedSize,
        quantity: 1,
      }).unwrap();

      toast.success("Product added to cart!");
      toogleCart(); // Update cart badge

      // Refetch cart data to get the updated cart
    } catch (error) {
      toast.error(error.data?.message || "Failed to add product to cart.");
    }
  };

  return (
    <>
      <div className="product_page">
        <div>
          <div className="container">
            <div className="details_grid">
              <div className="product_img_grid">
                <img src={product.mainImage} alt="" />
                {product.images.map((item) => (
                  <img src={item} alt="" />
                ))}
              </div>
              <div>                
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
                        Model is <span>5'8</span>,wearing a size <span>Xl</span>
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
                          {product.description}
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
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Nobis saepe minima fugiat accusantium
                          dignissimos dicta alias ex omnis! Excepturi optio
                          voluptate incidunt assumenda, necessitatibus autem!
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
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Aperiam officia autem dicta iure consequuntur?
                          Nostrum officiis corporis nesciunt blanditiis quam?
                          Totam pariatur omnis labore qui quo optio enim hic
                          sunt?
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
    {selectSize && <div className="size_popup">
        <div className="overlay_popup" onClick={toggleSelectSize}>
          <div className="sizee_des">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Inventore cupiditate tempora fugit recusandae! Iusto quia
              assumenda error quo omnis neque consectetur quas magni reiciendis
              autem officiis labore nulla, eos beatae culpa provident alias nisi
              saepe nobis enim sit voluptatem dicta eum rem. Ex inventore
              laudantium consectetur obcaecati eaque, iusto quidem esse! Hic,
              neque obcaecati corporis totam deserunt velit sint dignissimos
              consequatur tempora quaerat quia libero. Officia magni dignissimos
              aut numquam inventore tempora quos fugit excepturi blanditiis rem
              sit, veritatis ullam, eum ad dicta doloribus ipsam mollitia!
              Laborum perferendis, vero aliquam maiores, dolorum vel possimus
              itaque sit magnam distinctio veniam consequuntur.
            </p>
            <button className="close_btnn" onClick={toggleSelectSize}>
              close
            </button>
          </div>
        </div>
      </div> }
      
    </>
  );
};

export default ProductDetails;
