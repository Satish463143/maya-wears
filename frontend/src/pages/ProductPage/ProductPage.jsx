import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ProductDetails from '../../Components/ProductDetails/ProductDetails';
import Faq from '../../Components/Faq/Faq';
import BestSellingItem from '../../Components/BestSellingItem/BestSellingItem';

const ProductPage = () => {
  const { isCartActive, toogleCart } = useOutletContext();

  return (
    <div>
      <ProductDetails 
        isCartActive={isCartActive} 
        toogleCart={toogleCart} 
      />
      <BestSellingItem/>     
      <Faq />        
    </div>
  );
}

export default ProductPage;
