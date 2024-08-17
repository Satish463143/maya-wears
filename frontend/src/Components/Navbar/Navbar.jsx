import React, { useState,useEffect } from 'react';
import './Navbar.css';
import {Link, useLocation, useNavigate} from 'react-router-dom'

const Navbar = () => {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [isSearchActive, setIsSearchActive]= useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);
    const [menu , setMenu] = useState ("Home")
    const location = useLocation();

    const toggleNav = () => {
        setIsMenuActive(!isMenuActive);
        setIsSearchActive(!isSearchActive);
        if (!isMenuActive) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }; 
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 10) {
            // Scrolling down and past 10px from the top
            setShowNavbar(false);
        } else if (currentScrollY < lastScrollY) {
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

    useEffect(()=>{
        const path = location.pathname;
        if(path === '/'){
            setMenu("Home")
        }else if(path === '/about'){
            setMenu("About")
        }
        else{
            setMenu()
        }
    },[location]);
    
    return (
        <div>
            <header>
                <div className={`navbar ${showNavbar ? 'visible' : 'hidden'}`}>
                    <div className=' navbar_menu'>
                        <div className="nav_grid container">
                            <div className="nav_btn" >
                                <div 
                                    className={`hamburger-menu ${isMenuActive ? 'active' : ''}`} 
                                    id="hamburger-menu" 
                                    onClick={toggleNav}
                                >
                                    <div className='menu_btn'>
                                        <div className="menu-bar1"></div>
                                        <div className="menu-bar2"></div>
                                        <div className="menu-bar3"></div>
                                        <div className="menu-bar4"></div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            <div className='menu_logo'>
                                <Link to=''>
                                    <img src="../src/assets/images/logo-1.png" alt="" />
                                </Link>
                            </div>
                            <div className='end_menu'>
                                <ul>
                                    
                                    <Link>
                                        <li className='to_hide_nav'>
                                            <svg enable-background="new 25 67 23 89" height="20px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <g>
                                                    <polyline fill="none" points="   649,137.999 675,137.999 675,155.999 661,155.999  " stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                                                    <polyline fill="none" points="   653,155.999 649,155.999 649,141.999  " stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                                                    <polyline fill="none" points="   661,156 653,162 653,156  " stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                                                </g>
                                                <g><g>
                                                    <path d="M16,30c-0.215,0-0.43-0.069-0.61-0.207C14.844,29.372,2,19.396,2,11c0-4.411,3.589-8,8-8s8,3.589,8,8c0,0.552-0.447,1-1,1    c-0.552,0-1-0.448-1-1c0-3.309-2.691-6-6-6s-6,2.691-6,6c0,6.467,9.477,14.653,12,16.719C18.522,25.653,28,17.46,28,11    c0-3.309-2.691-6-6-6c-0.895,0-1.756,0.192-2.559,0.57c-0.5,0.236-1.097,0.021-1.331-0.478c-0.235-0.5-0.021-1.095,0.478-1.331    C19.66,3.256,20.808,3,22,3c4.411,0,8,3.589,8,8c0,8.396-12.844,18.372-13.39,18.793C16.43,29.931,16.215,30,16,30z"/>
                                                </g></g>
                                            </svg>
        
                                        </li>
                                    </Link>
                                    <Link>
                                        <li>
                                        <svg viewBox="0 0 32 32" height="25x" width="25px" xmlns="http://www.w3.org/2000/svg">
                                        <title/><g data-name="user people person users man" id="user_people_person_users_man">
                                            <path d="M23.74,16.18a1,1,0,1,0-1.41,1.42A9,9,0,0,1,25,24c0,1.22-3.51,3-9,3s-9-1.78-9-3a9,9,0,0,1,2.63-6.37,1,1,0,0,0,0-1.41,1,1,0,0,0-1.41,0A10.92,10.92,0,0,0,5,24c0,3.25,5.67,5,11,5s11-1.75,11-5A10.94,10.94,0,0,0,23.74,16.18Z"/>
                                            <path d="M16,17a7,7,0,1,0-7-7A7,7,0,0,0,16,17ZM16,5a5,5,0,1,1-5,5A5,5,0,0,1,16,5Z"/></g>
                                            </svg>      
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`overlay ${isMenuActive ? 'overlay-active overlay-slide-right' : 'overlay-slide-left'}`} id="overlay">
                        <div className='overlay_bg' onClick={toggleNav}></div>
                        <nav>
                            <ul >
                                <Link to="/">
                                    <li onClick={() => { toggleNav(); setMenu("Home"); }} className={menu === "Home" ? "liActive" : ""}>Home</li>
                                </Link>
                                <Link to="/about"> 
                                    <li onClick={() => { toggleNav(); setMenu("About"); }} className={menu === "About" ? "liActive" : ""}>About Us</li>   
                                </Link>
                                <Link>
                                    <li onClick={toggleNav}>Products</li>   
                                </Link>
                                <Link>
                                    <li onClick={toggleNav}>Cart</li>   
                                </Link>
                                <Link>
                                    <li onClick={toggleNav}>Contact Us</li>   
                                </Link>
                                <Link>
                                    <li onClick={toggleNav}>My Wishlist</li>   
                                </Link>
                                <Link>
                                    <li onClick={toggleNav}>Store</li>   
                                </Link>
                            </ul>
                        </nav>
                        {/* home, newsfeed, allproduct cart */}
                        {/* 
                        newsfeed                        
                        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M7 6C7 4.34315 8.34315 3 10 3H18C19.6569 3 21 4.34315 21 6V17.4286C21 19.4438 19.3031 21 17.3077 21H6C4.12382 21 3 19.1526 3 17.4286V9C3 7.34315 4.34314 6 6 6H7ZM9 17.4286C9 17.9599 8.89326 18.5029 8.69065 19H17.3077C18.2861 19 19 18.2537 19 17.4286V6C19 5.44771 18.5523 5 18 5H10C9.44772 5 9 5.44772 9 6V17.4286ZM6 19C6.33296 19 7 18.5449 7 17.4286V8H6C5.44772 8 5 8.44772 5 9V17.4286C5 18.5449 5.66704 19 6 19ZM11 8C11 7.44772 11.4477 7 12 7H16C16.5523 7 17 7.44772 17 8C17 8.55228 16.5523 9 16 9H12C11.4477 9 11 8.55228 11 8ZM11 11C11 10.4477 11.4477 10 12 10H14C14.5523 10 15 10.4477 15 11C15 11.5523 14.5523 12 14 12H12C11.4477 12 11 11.5523 11 11Z" fill="black" fill-rule="evenodd"/></svg>
                        home
                        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.98572 20.67V15.6272C9.98572 15.0749 10.4334 14.6272 10.9857 14.6272H13.0143C13.5666 14.6272 14.0143 15.0749 14.0143 15.6272V20.8458" stroke="black"/><path d="M4 11V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V11" stroke="black" stroke-linecap="round"/><path d="M2.59998 11.9415L11.9999 3.8844L19.6139 10.4106L21.3999 11.9415" stroke="black" stroke-linecap="round"/></svg>
                         cart
                         <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;}</style></defs><title/><g data-name="Layer 2" id="Layer_2"><path d="M23.52,29h-15a5.48,5.48,0,0,1-5.31-6.83L6.25,9.76a1,1,0,0,1,1-.76H24a1,1,0,0,1,1,.7l3.78,12.16a5.49,5.49,0,0,1-.83,4.91A5.41,5.41,0,0,1,23.52,29ZM8,11,5.11,22.65A3.5,3.5,0,0,0,8.48,27h15a3.44,3.44,0,0,0,2.79-1.42,3.5,3.5,0,0,0,.53-3.13L23.28,11Z"/><path d="M20,17a1,1,0,0,1-1-1V8a3,3,0,0,0-6,0v8a1,1,0,0,1-2,0V8A5,5,0,0,1,21,8v8A1,1,0,0,1,20,17Z"/></g><g id="frame"><rect class="cls-1" height="32" width="32"/></g></svg>
                         allproduct
                         <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="Line"><path d="M18.5,6.26A3.6,3.6,0,0,0,19,4.78a3.44,3.44,0,0,0-3-3.72,3.55,3.55,0,0,0-3,.73,4.44,4.44,0,0,0-1,1.28,4.44,4.44,0,0,0-1-1.28,3.55,3.55,0,0,0-3-.73A3.44,3.44,0,0,0,5,4.78,3.6,3.6,0,0,0,5.5,6.26,5,5,0,0,0,2,11v7a5,5,0,0,0,5,5H17a5,5,0,0,0,5-5V11A5,5,0,0,0,18.5,6.26ZM14.31,3.33A1.56,1.56,0,0,1,15.65,3,1.43,1.43,0,0,1,17,4.61,1.53,1.53,0,0,1,15.3,6H13.11A4.67,4.67,0,0,1,14.31,3.33Zm-6-.3a2.56,2.56,0,0,1,.39,0,1.45,1.45,0,0,1,.95.33A4.67,4.67,0,0,1,10.89,6H8.7A1.53,1.53,0,0,1,7,4.61,1.44,1.44,0,0,1,8.35,3ZM20,18a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V11A3,3,0,0,1,7,8h4V9a1,1,0,0,0,2,0V8h4a3,3,0,0,1,3,3Z"/><path d="M17,17H13a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Z"/></g></svg>
                         user
                         <?xml version="1.0" ?><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="user people person users man" id="user_people_person_users_man"><path d="M23.74,16.18a1,1,0,1,0-1.41,1.42A9,9,0,0,1,25,24c0,1.22-3.51,3-9,3s-9-1.78-9-3a9,9,0,0,1,2.63-6.37,1,1,0,0,0,0-1.41,1,1,0,0,0-1.41,0A10.92,10.92,0,0,0,5,24c0,3.25,5.67,5,11,5s11-1.75,11-5A10.94,10.94,0,0,0,23.74,16.18Z"/><path d="M16,17a7,7,0,1,0-7-7A7,7,0,0,0,16,17ZM16,5a5,5,0,1,1-5,5A5,5,0,0,1,16,5Z"/></g></svg>
                         search
                         <svg enable-background="new 0 0 32 32" height="20px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g>
                            <path d="M13,2C6.935,2,2,6.935,2,13s4.935,11,11,11s11-4.935,11-11S19.065,2,13,2z M13,22c-4.962,0-9-4.037-9-9   c0-4.962,4.038-9,9-9c4.963,0,9,4.038,9,9C22,17.963,17.963,22,13,22z"/>
                            <path d="M29.707,28.293l-6.001-6c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l6.001,6C28.488,29.902,28.744,30,29,30   s0.512-0.098,0.707-0.293C30.098,29.316,30.098,28.684,29.707,28.293z"/></g>
                        </svg>
                        <div className={`search_btn ${isSearchActive ? 'searchBtnActive':''}`}>
                                    <button >
                                        <span>
                                            
                                        </span>
                                        <p>Search</p>
                                    </button>
                                </div>
                         */}
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;
