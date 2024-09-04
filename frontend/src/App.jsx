import React,{useEffect, useState} from 'react'
import {Routes, Route, useLocation, Router} from 'react-router-dom'
import Home from './pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import FooterNav from './Components/FooterNav/FooterNav'
import StoreContextProvider from './context/StoreContext'
import AOS from 'aos';
import ProductPage from './pages/ProductPage/ProductPage'
import 'aos/dist/aos.css';
import Cart from './Components/Cart/Cart'

const App = () => {
  const [isCartActive , setCartActive] = useState(null);

  const toogleCart = ()=>{
    setCartActive(!isCartActive)
  }

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);


  return (      
      <div>        
        <Navbar/>
        <Cart isCartActive={isCartActive} toogleCart={toogleCart}/>
        <FooterNav/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/product/:_id' element={<ProductPage isCartActive={isCartActive} toogleCart={toogleCart}/>}/>
        </Routes>
        <Footer/>        
      </div>  
  )
}

export default App