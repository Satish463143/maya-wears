import React,{useState,useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    if (path === '/admin' || path.includes('/admin/dashboard')) {
      setMenu('admin');
    }
     else if (path.includes('/admin/banner_1')) {
      setMenu('banner_1');
    } else if (path.includes('/admin/banner_1_edit')) {
      setMenu('banner_1');
    } else if (path.includes('/admin/userList')) {
      setMenu('userList');
    }
     else if (path.includes('/admin/collection')) {
      setMenu('collection');
    }
     else if (path.includes('/admin/add_collection')) {
      setMenu('collection');
    }
     else if (path.includes('/admin/edit_collection')) {
      setMenu('collection');
    }
     else if (path.includes('/admin/product')) {
      setMenu('product');
    }
     else if (path.includes('/admin/edit_product')) {
      setMenu('product');
    }
     else if (path.includes('/admin/add_product')) {
      setMenu('product');
    }
     else if (path.includes('/admin/banners')) {
      setMenu('banners');
    }
     else if (path.includes('/admin/edit_banners')) {
      setMenu('banners');
    }
     else if (path.includes('/admin/add_banners')) {
      setMenu('banners');
    }
     else if (path.includes('/admin/order_list')) {
      setMenu('order');
    }
     else if (path.includes('/admin/order_view')) {
      setMenu('order');
    }
     else if (path.includes('/admin/featured_product')) {
      setMenu('featured product');
    }
     else if (path.includes('/admin/featured_product_add')) {
      setMenu('featured product');
    }
     else if (path.includes('/admin/featured_product_edit/:id')) {
      setMenu('featured product');
    }
     else if (path.includes('/admin/gallery')) {
      setMenu('gallery');
    }
     else if (path.includes('/admin/customerGallery')) {
      setMenu('customerGallery');
    }
     else if (path.includes('/admin/customerGallery_add')) {
      setMenu('customerGallery');
    }
     else if (path.includes('/admin/gallery_add')) {
      setMenu('gallery');
    }
     else if (path.includes('/admin/promo_code')) {
      setMenu('promo_code');
    }
     else if (path.includes('/admin/promo_code_add')) {
      setMenu('promo_code');
    }
     else if (path.includes('/admin/promo_code_edit')) {
      setMenu('promo_code');
    }
    
  }, [location.pathname]);
  return (
    <div className='admin_navbar'>
        <div className='logo'>
          <img src="../src/assets/images/logo.png" alt="" />
        </div>
        <div className='admin_box'>
          <div>
            <span>
              <svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
                <g transform="translate(0 -1028.4)"><path d="m12 1039.4c-1.277 0-2.4943 0.2-3.5938 0.7 0.6485 1.3 2.0108 2.3 3.5938 2.3s2.945-1 3.594-2.3c-1.1-0.5-2.317-0.7-3.594-0.7z" fill="#95a5a6"/>
                  <path d="m8.4062 1041.1c-2.8856 1.3-4.9781 4-5.3437 7.3 0 1.1 0.8329 2 1.9375 2h14c1.105 0 1.938-0.9 1.938-2-0.366-3.3-2.459-6-5.344-7.3-0.649 1.3-2.011 2.3-3.594 2.3s-2.9453-1-3.5938-2.3z" fill="#d35400"/>
                  <path d="m8.4062 1040.1c-2.8856 1.3-4.9781 4-5.3437 7.3 0 1.1 0.8329 2 1.9375 2h14c1.105 0 1.938-0.9 1.938-2-0.366-3.3-2.459-6-5.344-7.3-0.649 1.3-2.011 2.3-3.594 2.3s-2.9453-1-3.5938-2.3z" fill="#e67e22"/>
                  <path d="m12 11c-1.147 0-2.2412 0.232-3.25 0.625 0.9405 0.616 2.047 1 3.25 1 1.206 0 2.308-0.381 3.25-1-1.009-0.393-2.103-0.625-3.25-0.625z" fill="#7f8c8d" transform="translate(0 1028.4)"/>
                  <path d="m17 4a5 5 0 1 1 -10 0 5 5 0 1 1 10 0z" fill="#060060" transform="translate(0 1031.4)"/>
                  <path d="m8.4062 1040.1c-0.3172 0.2-0.6094 0.3-0.9062 0.5 0.8153 1.6 2.541 2.8 4.5 2.8s3.685-1.2 4.5-2.8c-0.297-0.2-0.589-0.3-0.906-0.5-0.649 1.3-2.011 2.3-3.594 2.3s-2.9453-1-3.5938-2.3z" fill="#d35400" />
                </g>
              </svg>
            </span>
          </div>
          <div>
            <p>Admin Panel</p>
          </div>
        </div>
        <div className='menu' style={{height:'100vh', scrollbarWidth:'none', overflowY:'scroll'}}>
          <nav>
            <ul>
              <Link to="/admin">
                <li onClick={() => setMenu("admin")} className={menu === "admin" ? "liActive" : ""}>
                  <span>
                    <svg  version="1.1" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                      <g id="info"/><g id="icons"><g id="dashboard">
                        <path d="M5,18H3c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2C7,18.9,6.1,18,5,18z"/>
                        <path d="M13,16h-2c-1.1,0-2,0.9-2,2v2c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2v-2C15,16.9,14.1,16,13,16z"/>
                        <path d="M21,12h-2c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2v-6C23,12.9,22.1,12,21,12z"/>
                        <path d="M22,2h-6.6c-0.9,0-1.3,1.1-0.7,1.7l1.9,1.9C12.9,9.8,7.6,13,2,13c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1    c6.7,0,12.9-1.9,17.4-6.6l1.8,1.8c0.6,0.6,1.7,0.2,1.7-0.7V3C23,2.4,22.6,2,22,2z"/>
                      </g></g>
                    </svg>
                  </span>
                  <p>Dashboard</p>
                  </li>
              </Link>
              <Link to='banner_1'>
                <li onClick={() => setMenu("banner_1")} className={menu === "banner_1" ? "liActive" : ""}>
                  <span>
                    <svg height="25" viewBox="0 0 48 48" width="25" xmlns="http://www.w3.org/2000/svg">
                      <path d="M38 14h-16v12h16v-12zm4-8h-36c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 3.96 4 3.96h36c2.21 0 4-1.76 4-3.96v-28c0-2.21-1.79-4-4-4zm0 32.03h-36v-28.06h36v28.06z"/>
                      <path d="M0 0h48v48h-48z" fill="none"/>
                    </svg>
                  </span>
                  <p>Main Banner</p>
                </li>
              </Link>
              <Link to='banners'>
                <li onClick={() => setMenu("banners")} className={menu === "banners" ? "liActive" : ""}>
                  <span>
                    <svg height="25" viewBox="0 0 48 48" width="25" xmlns="http://www.w3.org/2000/svg">
                      <path d="M38 14h-16v12h16v-12zm4-8h-36c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 3.96 4 3.96h36c2.21 0 4-1.76 4-3.96v-28c0-2.21-1.79-4-4-4zm0 32.03h-36v-28.06h36v28.06z"/>
                      <path d="M0 0h48v48h-48z" fill="none"/>
                    </svg>
                  </span>
                  <p>Banners</p>
                </li>
              </Link>
              <Link to='order_list'>
                <li onClick={() => setMenu("order")} className={menu === "order" ? "liActive" : ""}>
                  <span>
                    <svg height="25" viewBox="0 0 48 48" width="25" xmlns="http://www.w3.org/2000/svg">
                      <path d="M38 14h-16v12h16v-12zm4-8h-36c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 3.96 4 3.96h36c2.21 0 4-1.76 4-3.96v-28c0-2.21-1.79-4-4-4zm0 32.03h-36v-28.06h36v28.06z"/>
                      <path d="M0 0h48v48h-48z" fill="none"/>
                    </svg>
                  </span>
                  <p>Order</p>
                </li>
              </Link>
              <Link to='product'>
                <li onClick={() => setMenu("product")} className={menu === "product" ? "liActive" : ""}>
                  <span>
                    <svg height="25" viewBox="0 0 48 48" width="25" xmlns="http://www.w3.org/2000/svg">
                      <path d="M38 14h-16v12h16v-12zm4-8h-36c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 3.96 4 3.96h36c2.21 0 4-1.76 4-3.96v-28c0-2.21-1.79-4-4-4zm0 32.03h-36v-28.06h36v28.06z"/>
                      <path d="M0 0h48v48h-48z" fill="none"/>
                    </svg>
                  </span>
                  <p>Product</p>
                </li>
              </Link>
              <Link to='gallery'>
                <li onClick={() => setMenu("gallery")} className={menu === "gallery" ? "liActive" : ""}>
                  <span>
                    <svg height="25" viewBox="0 0 48 48" width="25" xmlns="http://www.w3.org/2000/svg">
                      <path d="M38 14h-16v12h16v-12zm4-8h-36c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 3.96 4 3.96h36c2.21 0 4-1.76 4-3.96v-28c0-2.21-1.79-4-4-4zm0 32.03h-36v-28.06h36v28.06z"/>
                      <path d="M0 0h48v48h-48z" fill="none"/>
                    </svg>
                  </span>
                  <p>Gallery</p>
                </li>
              </Link>
              <Link to='customerGallery'>
                <li onClick={() => setMenu("customerGallery")} className={menu === "customerGallery" ? "liActive" : ""}>
                  <span>
                    <svg height="25" viewBox="0 0 48 48" width="25" xmlns="http://www.w3.org/2000/svg">
                      <path d="M38 14h-16v12h16v-12zm4-8h-36c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 3.96 4 3.96h36c2.21 0 4-1.76 4-3.96v-28c0-2.21-1.79-4-4-4zm0 32.03h-36v-28.06h36v28.06z"/>
                      <path d="M0 0h48v48h-48z" fill="none"/>
                    </svg>
                  </span>
                  <p>Customer Gallery</p>
                </li>
              </Link>
              <Link to='featured_product'>
                <li onClick={() => setMenu("featured product")} className={menu === "featured product" ? "liActive" : ""}>
                  <span>
                    <svg height="25" viewBox="0 0 48 48" width="25" xmlns="http://www.w3.org/2000/svg">
                      <path d="M38 14h-16v12h16v-12zm4-8h-36c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 3.96 4 3.96h36c2.21 0 4-1.76 4-3.96v-28c0-2.21-1.79-4-4-4zm0 32.03h-36v-28.06h36v28.06z"/>
                      <path d="M0 0h48v48h-48z" fill="none"/>
                    </svg>
                  </span>
                  <p> Featured Product</p>
                </li>
              </Link>
              
              <Link to='collection'>
                <li onClick={() => setMenu("collection")} className={menu === "collection" ? "liActive" : ""}>
                  <span>
                    <svg height="25" viewBox="0 0 48 48" width="25" xmlns="http://www.w3.org/2000/svg">
                      <path d="M38 14h-16v12h16v-12zm4-8h-36c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 3.96 4 3.96h36c2.21 0 4-1.76 4-3.96v-28c0-2.21-1.79-4-4-4zm0 32.03h-36v-28.06h36v28.06z"/>
                      <path d="M0 0h48v48h-48z" fill="none"/>
                    </svg>
                  </span>
                  <p>Collection</p>
                </li>
              </Link>              
              <Link to='promo_code'>
                <li onClick={() => setMenu("promo_code")} className={menu === "promo_code" ? "liActive" : ""}>
                  <span>
                    <svg height="25" viewBox="0 0 48 48" width="25" xmlns="http://www.w3.org/2000/svg">
                      <path d="M38 14h-16v12h16v-12zm4-8h-36c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 3.96 4 3.96h36c2.21 0 4-1.76 4-3.96v-28c0-2.21-1.79-4-4-4zm0 32.03h-36v-28.06h36v28.06z"/>
                      <path d="M0 0h48v48h-48z" fill="none"/>
                    </svg>
                  </span>
                  <p>Promo Code</p>
                </li>
              </Link>              
              <Link to="/userList">
                <li onClick={() => setMenu("userList")} className={menu === "userList" ? "liActive" : ""}>
                  <span>
                    <svg data-name="Layer 1" id="Layer_1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title/>
                      <path d="M24,21A10,10,0,1,1,34,11,10,10,0,0,1,24,21ZM24,5a6,6,0,1,0,6,6A6,6,0,0,0,24,5Z"/>
                      <path d="M42,47H6a2,2,0,0,1-2-2V39A16,16,0,0,1,20,23h8A16,16,0,0,1,44,39v6A2,2,0,0,1,42,47ZM8,43H40V39A12,12,0,0,0,28,27H20A12,12,0,0,0,8,39Z"/>
                    </svg>
                  </span>
                  <p>User</p>
                </li>
              </Link>              
            </ul>
          </nav>
        </div>        
    </div>
  )
}

export default Navbar