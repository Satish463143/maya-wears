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
import Banner_2List from "./Components/CMS/Banner_2/Banner_2List";
import Banner_2_Edit from "./Components/CMS/Banner_2/Banner_2_Edit";
import Banner_3List from "./Components/CMS/Banner_3/Banner_3List";
import Banner_3_Edit from "./Components/CMS/Banner_3/Banner_3_Edit";
import Banner_4List from "./Components/CMS/Banner_4/Banner_4List";
import Banner_4_Edit from "./Components/CMS/Banner_4/Banner_4_Edit";
import { useDispatch } from "react-redux";
import { getLoggedInUserRedux } from "./reducer/user.reducer";
import ProductList from "./Components/CMS/Product/ProductList";
import ProductAdd from "./Components/CMS/Product/ProductAdd";
import ProductEdit from "./Components/CMS/Product/ProductEdit";
import AllProductPage from "./pages/AllProductPage/AllProductPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import AboutUs from "./pages/AboutPage/AboutUs";

const App = ({ isCartActive, toogleCart, setCurrentView }) => {
//   if (window.location.href.includes('https://maya-wears.com/')) {
//     window.location.href = 'https://themayawears.com/';
// }
  const dispatch = useDispatch();


  useEffect(() => {
    let token = localStorage.getItem("_at");
    if (token) {
      dispatch(getLoggedInUserRedux());
    }
  }, []);

  // useEffect(() => {
  //   AOS.init({ duration: 1200 });
  // }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<Home />} />
          <Route path="activate/:token" element={<UserActivation setCurrentView={setCurrentView} />}/>
          <Route path="product/:slug/:id" element={<ProductPage isCartActive={isCartActive} toogleCart={toogleCart}/>}/>
          <Route path="collection/:slug" element={<CollectionPage />} />
          <Route path="all_product" element={<AllProductPage />} />
          <Route path="login" element={<LoginPage/>}/>
          <Route path="contact" element={<ContactPage/>}/>
          <Route path="about_us" element={<AboutUs/>}/>
           
          <Route path="*" element={<>Page not Found</>} />
        </Route>

        <Route path="/admin" element={<CheckPermission allowedBy={"admin"}> <CMSLayout /> </CheckPermission>}>
          {/* admin routes down */}
          <Route index element={<Dashboard />} />
          <Route path="banner_1" element={<Banner_1List />} />
          <Route path="banner_1_edit/:id" element={<Banner_1_Edit />} />
          <Route path="banner_2" element={<Banner_2List />} />
          <Route path="banner_2_edit/:id" element={<Banner_2_Edit />} />
          <Route path="banner_3" element={<Banner_3List />} />
          <Route path="banner_3_edit/:id" element={<Banner_3_Edit />} />
          <Route path="banner_4" element={<Banner_4List />} />
          <Route path="banner_4_edit/:id" element={<Banner_4_Edit />} />
          <Route path="collection" element={<CollectionList />} />
          <Route path="add_collection" element={<CollectionAdd />} />
          <Route path="edit_collection/:id" element={<CollectionEdit />} />
          <Route path="product" element={<ProductList />} />
          <Route path="add_product" element={<ProductAdd />} />
          <Route path="edit_product/:id" element={<ProductEdit />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
