import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import './FooterNav.css'

const FooterNav = ({toogleCart}) => {
    const [isnavfoot , setNavFoot] = useState("Home")
    const location = useLocation();
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showNavbar, setShowNavbar] = useState(false); // Initially hidden   

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
    
        if (currentScrollY > lastScrollY && currentScrollY > 10) {
          // Scrolling down and past 10px from the top
          setShowNavbar(false);
        } else if (currentScrollY < lastScrollY && currentScrollY > 10) {
          // Scrolling up
          setShowNavbar(true);
        }
    
        setLastScrollY(currentScrollY);
      };
    
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [lastScrollY]);

    useEffect(() => {
        const footPath = location.pathname;
        // Set the correct nav state based on the path
        if (footPath === '/') {
            setNavFoot("Home");
        } else if (footPath === '/all_product') {
            setNavFoot("Products");
        } 
        else if (footPath === "/gallery") {
            setNavFoot("Gallery");
          }
        //   else if (footPath === "/cart") {
        //     setNavFoot("Cart");
        //   }
        
        else {
            setNavFoot(''); // Handle other paths if necessary
        }
    }, [location]);
    
    
  return (
    <div className={`footnav ${showNavbar ? 'visible' : 'hidden'}`}>                
            <div className='foornav_box'>
                <ul>
                    <Link to="/">
                        <li onClick={()=> setNavFoot("Home")}  className={isnavfoot==="Home" ? 'nav_foot_active' : ''} >
                            <span>
                                <svg data-name="Layer 1" height="24" id="Layer_1" viewBox="0 0 200 200" width="24" xmlns="http://www.w3.org/2000/svg"><title/><path d="M168.5,63.44l-50-39.5a30,30,0,0,0-37,0l-50,39.5A29.83,29.83,0,0,0,20,86.94v75.5a20.06,20.06,0,0,0,20,20H68.5a20.06,20.06,0,0,0,20-20v-37.5H116v37.5a20.06,20.06,0,0,0,20,20h24a20.06,20.06,0,0,0,20-20V86.94a29.83,29.83,0,0,0-11.5-23.5Zm-8.5,99H136v-37.5a20.06,20.06,0,0,0-20-20H88.5a20.06,20.06,0,0,0-20,20v37.5H40V86.94a10.44,10.44,0,0,1,4-8l50-39.5c3.5-3,8.5-3,12.5,0l50,39.5a10.44,10.44,0,0,1,4,8v75.5Z"/></svg>                         
                            </span>
                        </li>
                    </Link>
                    <Link to="/all_product">
                        <li onClick={()=> setNavFoot("Products")}  className={isnavfoot==="Products" ? 'nav_foot_active' : ''} >
                            <span>
                                <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M7 6C7 4.34315 8.34315 3 10 3H18C19.6569 3 21 4.34315 21 6V17.4286C21 19.4438 19.3031 21 17.3077 21H6C4.12382 21 3 19.1526 3 17.4286V9C3 7.34315 4.34314 6 6 6H7ZM9 17.4286C9 17.9599 8.89326 18.5029 8.69065 19H17.3077C18.2861 19 19 18.2537 19 17.4286V6C19 5.44771 18.5523 5 18 5H10C9.44772 5 9 5.44772 9 6V17.4286ZM6 19C6.33296 19 7 18.5449 7 17.4286V8H6C5.44772 8 5 8.44772 5 9V17.4286C5 18.5449 5.66704 19 6 19ZM11 8C11 7.44772 11.4477 7 12 7H16C16.5523 7 17 7.44772 17 8C17 8.55228 16.5523 9 16 9H12C11.4477 9 11 8.55228 11 8ZM11 11C11 10.4477 11.4477 10 12 10H14C14.5523 10 15 10.4477 15 11C15 11.5523 14.5523 12 14 12H12C11.4477 12 11 11.5523 11 11Z" fill="black" fillRule="evenodd"/>
                                </svg>                                                
                            </span>
                        </li>
                    </Link>
                    <Link to="/gallery">
                        <li onClick={()=> setNavFoot("Gallery")}  className={isnavfoot==="Gallery" ? 'nav_foot_active' : ''}>
                            <span>
                                <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Line">
                                        <path d="M18.5,6.26A3.6,3.6,0,0,0,19,4.78a3.44,3.44,0,0,0-3-3.72,3.55,3.55,0,0,0-3,.73,4.44,4.44,0,0,0-1,1.28,4.44,4.44,0,0,0-1-1.28,3.55,3.55,0,0,0-3-.73A3.44,3.44,0,0,0,5,4.78,3.6,3.6,0,0,0,5.5,6.26,5,5,0,0,0,2,11v7a5,5,0,0,0,5,5H17a5,5,0,0,0,5-5V11A5,5,0,0,0,18.5,6.26ZM14.31,3.33A1.56,1.56,0,0,1,15.65,3,1.43,1.43,0,0,1,17,4.61,1.53,1.53,0,0,1,15.3,6H13.11A4.67,4.67,0,0,1,14.31,3.33Zm-6-.3a2.56,2.56,0,0,1,.39,0,1.45,1.45,0,0,1,.95.33A4.67,4.67,0,0,1,10.89,6H8.7A1.53,1.53,0,0,1,7,4.61,1.44,1.44,0,0,1,8.35,3ZM20,18a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V11A3,3,0,0,1,7,8h4V9a1,1,0,0,0,2,0V8h4a3,3,0,0,1,3,3Z"/><path d="M17,17H13a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Z"/>
                                    </g>
                                </svg>                                         
                            </span>
                        </li>
                    </Link>
                    <Link>
                    <li onClick={()=> { toogleCart(); toggleNav(); setNavFoot("Cart");}} 
                    className={isnavfoot === "Cart" ? "nav_foot_active" : ""} >

                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 32 32">
                                    <defs>
                                        <style>{`.cls-1{fill:none;}`}</style>
                                    </defs>
                                    <g data-name="Layer 2" id="Layer_2">
                                        <path d="M23.52,29h-15a5.48,5.48,0,0,1-5.31-6.83L6.25,9.76a1,1,0,0,1,1-.76H24a1,1,0,0,1,1,.7l3.78,12.16a5.49,5.49,0,0,1-.83,4.91A5.41,5.41,0,0,1,23.52,29ZM8,11,5.11,22.65A3.5,3.5,0,0,0,8.48,27h15a3.44,3.44,0,0,0,2.79-1.42,3.5,3.5,0,0,0,.53-3.13L23.28,11Z"/>
                                        <path d="M20,17a1,1,0,0,1-1-1V8a3,3,0,0,0-6,0v8a1,1,0,0,1-2,0V8A5,5,0,0,1,21,8v8A1,1,0,0,1,20,17Z"/>
                                    </g>
                                    <g id="frame">
                                        
                                    </g>
                                </svg>
                            </span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    
  )
}

export default FooterNav