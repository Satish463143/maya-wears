import React from 'react'
import ProductDetails from '../../Components/ProductDetails/ProductDetails'
import SimilarProperties from '../../Components/SimilarProperties/SimilarProperties'
import Faq from '../../Components/Faq/Faq'

const ProductPage = ({ isCartActive, toogleCart }) => {
  return (
    <div>
        <ProductDetails path="/product/:_id" isCartActive={isCartActive} toogleCart={toogleCart}/>
        <SimilarProperties/>
        <Faq/>        
    </div>
  )
}

export default ProductPage