import React, {useEffect, useState} from 'react'
import { Outlet,useLocation } from 'react-router-dom'
import LoginPage from '../LoginPage/LoginPage'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import FooterNav from '../../Components/FooterNav/FooterNav'
import Cart from '../../Components/Cart/Cart'
import {ToastContainer} from 'react-toastify'
import "react-toastify/ReactToastify.css"



const LayoutPage = () => {

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
    return (
        <div>
            <ToastContainer style={{ zIndex: 9999999 }}/>
            <Navbar isVisible={isVisible} toggleVisible={toggleVisible} setIsVisible={setIsVisible}/>
            <LoginPage isVisible={isVisible} toggleVisible={toggleVisible} />
            <Cart isCartActive={isCartActive} toogleCart={toogleCart} />
            <FooterNav/>
            <ScrollToTop/>

                <Outlet context={{ isCartActive, toogleCart, setIsVisible}}/>

            <Footer/> 
        </div>
    )
}

export default LayoutPage