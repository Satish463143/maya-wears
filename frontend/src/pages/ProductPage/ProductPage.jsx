import React, { useContext,useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ProductDetails from '../../Components/ProductDetails/ProductDetails';
import SimilarProperties from '../../Components/SimilarProperties/SimilarProperties';
import Faq from '../../Components/Faq/Faq';
import { StoreContext } from '../../context/StoreContext';

const ProductPage = () => {
  const { isCartActive, toogleCart } = useOutletContext();
  const { cartList, addToCartList } = useContext(StoreContext);
  const [selectedSize, setSelectedSize] = useState(null);

  // Function to check if the product is already in the cart
  const isProductInCart = (productId) => {
    return cartList.some(item => item._id === productId);
  };

  // Pass `productId` to `toogleAddToCart` to check if it's in the cart
  const toogleAddToCart = (product, selectedSize) => {
    if (product && selectedSize) {
      console.log("Adding product to cart:", product, "with size:", selectedSize); // Debug: log product and size
      if (!isProductInCart(product._id)) {
        addToCartList({ ...product, selectedSize }); // Add product with selected size
      }
    } else {
      console.error("Product or selected size is missing");
    }
  };

  return (
    <div>
      <ProductDetails 
        isCartActive={isCartActive} 
        toogleCart={toogleCart} 
        toogleAddToCart={toogleAddToCart} 
      />
      <SimilarProperties />
      <Faq />        
    </div>
  );
}

export default ProductPage;
