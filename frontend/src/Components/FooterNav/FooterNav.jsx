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
                                <svg
                                    data-name="Layer 1"
                                    height="26"
                                    id="Layer_1"
                                    viewBox="0 0 88 88"
                                    width="26"
                                    xmlns="http://www.w3.org/2000/svg"
                                    strokeWidth="2"
                                    stroke="black" // Added stroke color
                                    >
                                    <path
                                        fill="black" // Ensure fill is none if you only want stroke effect
                                        stroke="black" // Apply stroke
                                        strokeWidth="2" // Define stroke width
                                        d="M77.74,41.34A33.59,33.59,0,0,0,59.52,14.82l-.6-.31H29.08l-.6.31A33.59,33.59,0,0,0,10.26,41.34l-.14,2.87H20.47V73.49H43.13V68H25.93V38.74H16.17A28.27,28.27,0,0,1,30.43,20H57.57A28.27,28.27,0,0,1,71.83,38.74H62.07V68H43.13v5.46h24.4V44.21H77.88Z"
                                    />
                                    <path
                                        fill="black"
                                        stroke="black"
                                        strokeWidth="2"
                                        d="M44.28,31.55c-7.48,0-13.56-5.18-13.56-11.55h5.46c0,3.35,3.63,6.09,8.1,6.09s8.09-2.74,8.09-6.09h5.47C57.84,26.37,51.75,31.55,44.28,31.55Z"
                                    />
                                </svg>
                            </span>
                           
                        </li>
                    </Link>
                    <Link to="/gallery">
                        <li onClick={()=> setNavFoot("Gallery")}  className={isnavfoot==="Gallery" ? 'nav_foot_active' : ''}>
                            <span>
                                <svg
                                    style={{ enableBackground: 'new 0 0 24 24' }}
                                    version="1.1"
                                    height="25"
                                    width='25'
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    >
                                    <style>
                                        {`.st0 { opacity: 0.2; fill: none; stroke: #000000; stroke-width: 0.05; stroke-miterlimit: 10; }`}
                                    </style>
                                    <g id="grid_system" />
                                    <g id="_icons">
                                        <path d="M3,16c0,2.8,2.2,5,5,5h8c2.7,0,4.9-2.2,5-4.9c0,0,0,0,0-0.1c0,0,0-0.1,0-0.1V8c0-2.8-2.2-5-5-5H8C5.2,3,3,5.2,3,8V16z    M16,19H8c-1.7,0-3-1.3-3-3v-0.4L9.5,13c0.9-0.5,2.1-0.5,3,0l6.4,3.6C18.7,17.9,17.5,19,16,19z M8,5h8c1.7,0,3,1.3,3,3v6.3   l-5.5-3.1c-1.5-0.9-3.4-0.8-5,0l-3.5,2V8C5,6.3,6.3,5,8,5z" />
                                        <circle cx="15.5" cy="8.5" r="1.5" />
                                    </g>
                                </svg>                                        
                            </span>
                        </li>
                    </Link>
                    <Link>
                        <li onClick={()=> { toogleCart(); toggleNav(); setNavFoot("Cart");}} className={isnavfoot === "Cart" ? "nav_foot_active" : ""} >
                            <span>
                                <svg
                                    data-name="Layer 1"
                                    id="Layer_1"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="26"
                                    width='26'
                                    >
                                    <path 
                                        d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z"
                                        fill="#000"
                                    />
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