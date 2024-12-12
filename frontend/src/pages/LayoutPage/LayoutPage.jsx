import React, {useEffect, useState} from 'react'
import { Outlet,useLocation } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import FooterNav from '../../Components/FooterNav/FooterNav'
import Cart from '../../Components/Cart/Cart'
import {ToastContainer} from 'react-toastify'
import "react-toastify/ReactToastify.css"
import CompanyPromisses from '../../Components/CompanyPromisses/companyPromisses'



const LayoutPage = () => {

    const [isCartActive , setCartActive] = useState(null);
    const location = useLocation();

    // Check if the current route is the Login page
    const isLoginPage = location.pathname === '/login';

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
    return (
        <div>
            <ToastContainer style={{ zIndex: 9999999 }}/>
             {!isLoginPage &&  (
                <>
                <Navbar toogleCart={toogleCart}/>
                <FooterNav />
                </>

            )}
            
            <Cart isCartActive={isCartActive} toogleCart={toogleCart} />           
            
            <ScrollToTop/>

                <Outlet context={{ isCartActive, toogleCart}}/>
                {!isLoginPage && (
                    <>
                    <CompanyPromisses />
                    <Footer />
                    </>
                )}
        </div>
    )
}

export default LayoutPage