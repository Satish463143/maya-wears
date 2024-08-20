import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import FooterNav from './Components/FooterNav/FooterNav'
import StoreContextProvider from './context/StoreContext'

const App = () => {
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