import React,{useEffect} from 'react'
import { HashRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import AOS from 'aos';
import ProductPage from './pages/ProductPage/ProductPage'
import 'aos/dist/aos.css';
import LayoutPage from './pages/LayoutPage/LayoutPage'
import CMSLayout from './pages/AdminPage/CMSLayout'
import CollectionPage from './pages/CollectionPage/CollectionPage';
import UserActivation from './pages/LoginPage/actiavte.user';
import CheckPermission from './config/rbac.config';
import Banner_1List from './Components/CMS/Banner_1List/Banner_1List';
import Dashboard from './Components/CMS/Dashboard/Dashboard';
import Banner_1_Edit from './Components/CMS/Banner_1_Edit/Banner_1_Edit';
import CollectionList from './Components/CMS/Collection/CollectionList';
import CollectionAdd from './Components/CMS/Collection/CollectionAdd';
import CollectionEdit from './Components/CMS/Collection/CollectionEdit';



const App = ({isCartActive,toogleCart,setIsVisible,setCurrentView}) => {
  

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (      
      <div>
        
        <Routes>

          <Route path='/' element={<LayoutPage/>}>
            <Route index element={<Home/>}/>
            <Route path="activate/:token" element={<UserActivation setIsVisible={setIsVisible} setCurrentView={setCurrentView}/>}/>
            <Route path='product/:_id' element={<ProductPage isCartActive={isCartActive} toogleCart={toogleCart} />}/>
            <Route path='collection/:slug' element={<CollectionPage/>}/>
            <Route path='*' element={<>Page not Found</>}/>
          </Route>
           
          <Route path='/admin' element={<CheckPermission  allowedBy={'admin'}><CMSLayout/></CheckPermission>}>
            {/* routes down */}
            <Route index  element={ <Dashboard/>} />
            <Route path='banner_1' element={<Banner_1List/>} />
            <Route path='banner_1_edit' element={<Banner_1_Edit/>}/>
            <Route path='collection' element={<CollectionList/>} />
            <Route path='add_collection' element={<CollectionAdd/>} />
            <Route path='edit_collection' element={<CollectionEdit/>} />
          </Route>

        </Routes>
               
      </div>   
  )
}

export default App