import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logos from "../../assets/images/logo-1.png";
import search_logo from "../../assets/images/search_icon.svg";

const Navbar = ({ toogleCart }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [menu, setMenu] = useState("Home");
  const [navbarBackground, setNavbarBackground] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const toggleNav = () => {
    setIsMenuActive(!isMenuActive);
    if (!isMenuActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter") {
      navigate("/all_product", { state: { searchQuery: search.trim() } });
    }
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 10) {
      // Scrolling down and past 10px from the top
      setShowNavbar(true);
      setNavbarBackground(true);
    } else if (currentScrollY < lastScrollY && currentScrollY > 10) {
      // Scrolling up
      setShowNavbar(false);
    } else if (currentScrollY <= 10) {
      // At the top
      setShowNavbar(true);
      setNavbarBackground(false);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  const handleBodyScroll = (shouldPreventScroll) => {
    if (shouldPreventScroll) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };
  
  // Call this in the respective places
  useEffect(() => {
    handleBodyScroll(isMenuActive || isSearchActive);
  }, [isMenuActive, isSearchActive]);
  
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setMenu("Home");
    } else if (path === "/about") {
      setMenu("About");
    } else if (path === "/contact") {
      setMenu("Contact");
    } else if (path === "/about_us") {
      setMenu("About Us");
    } else if (path === "/all_product") {
      setMenu("Products");
    } else if (path === "/gallery") {
      setMenu("Gallery");
    } else if (path === "/product/:slug/:id") {
      setMenu("Products");
    }
     else if (path === "/my_account") {
      setMenu("My Accounts");
    } 
     else if (path === "/all_collection") {
      setMenu("All COllection");
    } 
    else {
      setMenu("");
    }
  }, [location]);

  return (
    <div>
      <header>
        <div className={`navbar ${showNavbar ? "visible" : "hidden"}`}>
          <div className={`${navbarBackground ? "background_nav" : ""}`}>
            <div className="nav_grid container">
              <div className="nav_btn">
                <div
                  className={`hamburger-menu ${isMenuActive ? "active" : ""}`}
                  id="hamburger-menu"
                  onClick={toggleNav}
                >
                  <div className="menu_btn">
                    <div className="menu-bar1"></div>
                    <div className="menu-bar2"></div>
                    <div className="menu-bar3"></div>
                    <div className="menu-bar4"></div>
                  </div>
                </div>
              </div>
              <div className="menu_logo">
                <Link to="">
                  <img src={logos} alt="" />
                </Link>
              </div>
              <div className="end_menu">
                <ul>
                  <li className="to_hide_nav">
                    <img
                      src={search_logo}
                      alt=""
                      style={{ height: "25px", cursor: "pointer" }}
                      onClick={toggleSearch}
                    />
                  </li>
                  <Link to="/login">
                    <li style={{ cursor: "pointer" }}>
                      <svg
                        viewBox="0 0 32 32"
                        height="25px"
                        width="25px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title />
                        <g
                          data-name="user people person users man"
                          id="user_people_person_users_man"
                        >
                          <path
                            d="M23.74,16.18a1,1,0,1,0-1.41,1.42A9,9,0,0,1,25,24c0,1.22-3.51,3-9,3s-9-1.78-9-3a9,9,0,0,1,2.63-6.37,1,1,0,0,0,0-1.41,1,1,0,0,0-1.41,0A10.92,10.92,0,0,0,5,24c0,3.25,5.67,5,11,5s11-1.75,11-5A10.94,10.94,0,0,0,23.74,16.18Z"
                            stroke="currentColor"
                            strokeWidth="0."
                          />
                          <path
                            d="M16,17a7,7,0,1,0-7-7A7,7,0,0,0,16,17ZM16,5a5,5,0,1,1-5,5A5,5,0,0,1,16,5Z"
                            stroke="currentColor"
                            strokeWidth="0."
                          />
                        </g>
                      </svg>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`overlay ${
              isMenuActive
                ? "overlay-active overlay-slide-right"
                : "overlay-slide-left"
            }`}
            id="overlay"
          >
            <div className="overlay_bg" onClick={toggleNav}></div>
            <nav>
              <ul className="">
                <Link to="/">
                  <li
                    onClick={() => {
                      toggleNav();
                      setMenu("Home");
                    }}
                    className={menu === "Home" ? "liActive" : ""}
                    style={{ background: "none" }}
                  >
                    Home
                  </li>
                </Link>
                <Link to="/all_product">
                  <li
                    onClick={() => {
                      toggleNav();
                      setMenu("Products");
                    }}
                    className={menu === "Products" ? "liActive" : ""}
                    style={{ background: "none" }}
                  >
                    All Products
                  </li>
                </Link>
                <Link to="/all_collection">
                  <li
                    onClick={() => {
                      toggleNav();
                      setMenu("All COllection");
                    }}
                    className={menu === "All COllection" ? "liActive" : ""}
                    style={{ background: "none" }}
                  >
                    Shop By Collection
                  </li>
                </Link>
                <Link to="/gallery">
                  <li
                    onClick={() => {
                      toggleNav();
                      setMenu("Gallery");
                    }}
                    className={menu === "Gallery" ? "liActive" : ""}
                    style={{ background: "none" }}
                  >
                    Gallery
                  </li>
                </Link>
                <Link>
                  <li
                    onClick={() => {
                      toogleCart();
                      toggleNav();
                      setMenu("Cart");
                    }}
                    className={menu === "Cart" ? "liActive" : ""}
                    style={{ background: "none" }}
                  >
                    Cart
                  </li>
                </Link>
                <Link to="/contact">
                  <li
                    onClick={() => {
                      toggleNav();
                      setMenu("Contact");
                    }}
                    className={menu === "Contact" ? "liActive" : ""}
                    style={{ background: "none" }}
                  >
                    Contact Maya
                  </li>
                </Link>
                <Link to="/about_us">
                  <li
                    onClick={() => {
                      toggleNav();
                      setMenu("About Us");
                    }}
                    className={menu === "About Us" ? "liActive" : ""}
                    style={{ background: "none" }}
                  >
                    About Maya
                  </li>
                </Link>
                <Link to="/my_account">
                  <li
                    onClick={() => {
                      toggleNav();
                      setMenu("My Accounts");
                    }}
                    className={menu === "My Accounts" ? "liActive" : ""}
                    style={{ background: "none" }}
                  >
                    My Account
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
          <div className={`search_overlay ${ isSearchActive && "active_search_overlay" }`}  >
            <div className={`search_box ${isSearchActive && "active_search_box"}`}  >
              <div style={{position:'relative'}}> 
                <input
                  type="text"
                  placeholder="Search product..."
                  value={search}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchSubmit} // Handle Enter key press
                />
                <span className="enter_search_btn">
                  <img src={search_logo} alt="" style={{ height: "25px", cursor: "pointer" }} />
                </span>
              </div>
              
              <p onClick={toggleSearch} className="close_btnnn" >Close</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
