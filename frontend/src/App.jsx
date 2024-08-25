import React,{useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import FooterNav from './Components/FooterNav/FooterNav'
import StoreContextProvider from './context/StoreContext'

const App = () => {
  const adjustContainerWidth = () => {
    document.querySelectorAll('.container').forEach(element => {
      if (window.innerWidth <= 600) {
        element.style.maxWidth = '97%';
      } else if (window.innerWidth <= 1300) {
        element.style.maxWidth = '90%';
      } else {
        element.style.maxWidth = '1300px';
      }
    });
  };
    useEffect(()=>{
      window.addEventListener('resize',adjustContainerWidth);
      adjustContainerWidth();
      return()=>{
       window.removeEventListener('resize',adjustContainerWidth)
      }
    })
  return (
    
      <div>        
            <Navbar/>
            <FooterNav/>
            <Routes>
              <Route path='/' element={<Home/>}/>
            </Routes>
            <Footer/>        
      </div>
    
  )
}

export default App