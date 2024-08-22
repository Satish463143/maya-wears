import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext' 
import ProductItem from '../ProductItem/ProductItem'
import { Link } from 'react-router-dom'

const HotSellingItem = () => {
  const {ProductList} = useContext(StoreContext)
  const bestSelling = ProductList.filter(item=>
    item.category === "Hot Selling"
  )
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };  
  const bestShuffleArray =  shuffleArray([...bestSelling])
  const limitedbestShuffleArray = bestShuffleArray.slice(0,8)

  return (
    <div className='hotSelling div_container'>
      <h2>Hot Selling</h2>
      <div className="container">
        <div className='best_flex'>
          {limitedbestShuffleArray.map((item,index)=>{
            return <ProductItem key={index} id={item._id} image={item.image} title={item.title} crossPrice={item.crossPrice} price={item.price} quantity={item.quantity}/>
          })}
          <Link>
            <div className='view_all_box'>
              View  all
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HotSellingItem