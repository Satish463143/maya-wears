import React,{useEffect} from 'react'
import { HashRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'

import AOS from 'aos';
import ProductPage from './pages/ProductPage/ProductPage'
import 'aos/dist/aos.css';

import LayoutPage from './pages/LayoutPage/LayoutPage'
import CMSLayout from './pages/LayoutPage/CMSLayout';
import CollectionPage from './pages/CollectionPage/CollectionPage';


const App = ({isCartActive,toogleCart}) => {
  

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);


  return (      
      <div>
        <Routes>

          <Route path='/' element={<LayoutPage/>}>
            <Route index element={<Home/>}/>
            <Route path='product/:_id' element={<ProductPage isCartActive={isCartActive} toogleCart={toogleCart} />}/>
            <Route path='collection/:slug' element={<CollectionPage/>}/>
            <Route path='*' element={<>Page not Found</>}/>
          </Route>
           
          <Route path='/admin' element={<CMSLayout/>}/>

        </Routes>
               
      </div>  
  )
}

export default App