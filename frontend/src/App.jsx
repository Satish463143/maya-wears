import React,{useEffect, useState,useContext} from 'react'
import { HashRouter as Router, Routes, Route, useLocation} from 'react-router-dom'
import Home from './pages/Home/Home'
import LoginPage from './pages/LoginPage/LoginPage'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import FooterNav from './Components/FooterNav/FooterNav'
import { StoreContext } from './context/StoreContext'
import AOS from 'aos';
import ProductPage from './pages/ProductPage/ProductPage'
import 'aos/dist/aos.css';
import Cart from './Components/Cart/Cart'


const App = () => {
  const [isCartActive , setCartActive] = useState(null);
  
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisible =()=>{
    setIsVisible(!isVisible)
    
  }

  const ScrollToTop = () => {
    const { hash, pathname } = useLocation();

    useEffect(() => {
      // Scroll to the specific section if there's a hash in the URL
      if (hash) {
        const sectionId = hash.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView();
        }
      } else {
        // Scroll to the top when the route changes and there's no hash
        window.scrollTo({ top: 0 });
      }
    }, [hash, pathname]);

    return null;
  }


  const toogleCart = ()=>{
    setCartActive(!isCartActive)

  }

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);


  return (      
      <div>        
        <Navbar isVisible={isVisible} toggleVisible={toggleVisible}/>
        <LoginPage isVisible={isVisible} toggleVisible={toggleVisible}/>
        <Cart isCartActive={isCartActive} toogleCart={toogleCart} />
        <FooterNav/>
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/product/:_id' element={<ProductPage isCartActive={isCartActive} toogleCart={toogleCart} />}/>
        </Routes>
        <Footer/>        
      </div>  
  )
}

export default App