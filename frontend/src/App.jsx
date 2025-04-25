import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
// import AOS from "aos";
import ProductPage from "./pages/ProductPage/ProductPage";
// import "aos/dist/aos.css";
import LayoutPage from "./pages/LayoutPage/LayoutPage";
import CMSLayout from "./pages/AdminPage/CMSLayout";
import CollectionPage from "./pages/CollectionPage/CollectionPage";
import UserActivation from "./pages/LoginPage/actiavte.user";
import CheckPermission from "./config/rbac.config";
import Banner_1List from "./Components/CMS/Banner_1/Banner_1List";
import Dashboard from "./Components/CMS/Dashboard/Dashboard";
import Banner_1_Edit from "./Components/CMS/Banner_1/Banner_1_Edit";
import CollectionList from "./Components/CMS/Collection/CollectionList";
import CollectionAdd from "./Components/CMS/Collection/CollectionAdd";
import CollectionEdit from "./Components/CMS/Collection/CollectionEdit";
import { useDispatch } from "react-redux";
import { getLoggedInUserRedux } from "./reducer/user.reducer";
import ProductList from "./Components/CMS/Product/ProductList";
import ProductAdd from "./Components/CMS/Product/ProductAdd";
import ProductEdit from "./Components/CMS/Product/ProductEdit";
import AllProductPage from "./pages/AllProductPage/AllProductPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import AboutUs from "./pages/AboutPage/AboutUs";
import CheckOutPage from "./pages/CheckOutPage/CheckOutPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage";
import OrdersList from "./Components/CMS/Orders/OrdersList";
import AdminOrdersView from "./Components/CMS/Orders/AdminOrdersView";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import FeatuedProductList from "./Components/CMS/featuedProduct/FeatuedProductList";
import FeatuedProductAdd from "./Components/CMS/featuedProduct/FeatuedProductAdd";
import FeatuedProductEdit from "./Components/CMS/featuedProduct/FeatuedProductEdit";
import BannersList from "./Components/CMS/Banners/BannersList";
import BannersAdd from "./Components/CMS/Banners/BannersAdd";
import BannersEdit from "./Components/CMS/Banners/BannersEdit";
import GalleryList from "./Components/CMS/Gallery/GalleryList";
import GalleryAdd from "./Components/CMS/Gallery/GalleryAdd";
import AllCollectionPage from "./pages/AllCollectionPage/AllCollectionPage";
import CustomerGalleryList from "./Components/CMS/CustomerGallery/CustomerGalleryList";
import CustomerGalleryAdd from "./Components/CMS/CustomerGallery/CustomerGalleryAdd";
import Promo from "./Components/CMS/Promo/Promo";
import PromoAdd from "./Components/CMS/Promo/PromoAdd";
import PromoEdit from "./Components/CMS/Promo/PromoEdit";
const App = ({ isCartActive, toogleCart, setCurrentView }) => {

  const dispatch = useDispatch();


  useEffect(() => {
    let token = localStorage.getItem("_at");
    if (token) {
      dispatch(getLoggedInUserRedux());
    }
  }, []);


  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<Home />} />
          <Route path="activate/:token" element={<UserActivation setCurrentView={setCurrentView} />}/>
          <Route path="product/:slug/:id" element={<ProductPage isCartActive={isCartActive} toogleCart={toogleCart}/>}/>
          <Route path="collection/:slug/:id" element={<CollectionPage />} />
          <Route path="all_product" element={<AllProductPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="login" element={<LoginPage/>}/>
          <Route path="contact" element={<ContactPage/>}/>
          <Route path="about_us" element={<AboutUs/>}/>
          <Route path="check_out" element={<CheckOutPage isCartActive={isCartActive} toogleCart={toogleCart}/>}/>   
          <Route path="order" element={<OrderPage/>}/>            
          <Route path='/my_account' element={<MyAccountPage/>}/>      
          <Route path='/all_collection' element={<AllCollectionPage/>}/>      
          <Route path="*" element={<>Page not Found</>} />
        </Route>

        <Route path="/admin" element={<CheckPermission allowedBy={"admin"}> <CMSLayout /> </CheckPermission>}>
          {/* admin routes down */}
          <Route index element={<Dashboard />} />
          <Route path="banner_1" element={<Banner_1List />} />
          <Route path="banner_1_edit/:id" element={<Banner_1_Edit />} />
          <Route path="collection" element={<CollectionList />} />
          <Route path="add_collection" element={<CollectionAdd />} />
          <Route path="edit_collection/:id" element={<CollectionEdit />} />
          <Route path="product" element={<ProductList />} />
          <Route path="add_product" element={<ProductAdd />} />
          <Route path="edit_product/:id" element={<ProductEdit />} />
          <Route path="banners" element={<BannersList />} />
          <Route path="add_banners" element={<BannersAdd />} />
          <Route path="edit_banners/:id" element={<BannersEdit />} />
          <Route path='order_list' element={<OrdersList/>}/>
          <Route path='order_view/:id' element={<AdminOrdersView/>}/>
          <Route path= 'featured_product' element = {<FeatuedProductList/>}/>
          <Route path= 'featured_product_add' element = {<FeatuedProductAdd/>}/>
          <Route path= 'featured_product_edit/:id' element = {<FeatuedProductEdit/>}/>
          <Route path= 'gallery' element = {<GalleryList/>}/>
          <Route path= 'gallery_add' element = {<GalleryAdd/>}/>
          <Route path= 'customerGallery' element = {<CustomerGalleryList/>}/>
          <Route path= 'customerGallery_add' element = {<CustomerGalleryAdd/>}/>
          <Route path='promo_code' element={<Promo/>}/>
          <Route path='promo_code_add' element={<PromoAdd/>}/>
          <Route path='promo_code_edit/:id' element={<PromoEdit/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
