import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import logos from "../../assets/images/logo-1.png";

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [menu, setMenu] = useState("Home");
  const [navbarBackground, setNavbarBackground] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setIsMenuActive(!isMenuActive);
    setIsSearchActive(!isSearchActive);
    if (!isMenuActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
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

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setMenu("Home");
    } else if (path === "/about") {
      setMenu("About");
    } else {
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
                  <Link>
                    <li className="to_hide_nav">
                      <svg
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.1026543,2.69607267 C14.1723908,2.17246378 15.1055573,1.99999846 16.5532309,2.0000161 C20.2579495,2.01535832 23,5.13984465 23,9.11987614 C23,12.1577519 21.3061684,15.0922806 18.1511601,17.9298912 C16.4951061,19.4193443 14.3806781,20.8933233 12.866397,21.6774721 L12,22.1261233 L11.133603,21.6774721 C9.6193219,20.8933233 7.50489394,19.4193443 5.84883985,17.9298912 C2.69383159,15.0922806 1,12.1577519 1,9.11987614 C1,5.09726693 3.71643647,2 7.45454545,2 C8.85027925,2 9.83131847,2.18877527 10.9218108,2.72813403 C11.3014787,2.91591822 11.658192,3.13866136 11.9899709,3.39576047 C12.3350403,3.12339226 12.7066025,2.88992996 13.1026543,2.69607267 Z M16.8137247,16.4428585 C19.5861779,13.9493174 21,11.4998994 21,9.11987614 C21,6.18896383 19.0882067,4.01053125 16.5490834,4.00000753 C15.3870057,4.00000023 14.7458716,4.11849292 13.9819236,4.49242603 C13.5120101,4.72243676 13.095105,5.0329512 12.7314502,5.42754949 L12.0023377,6.21870239 L11.2665312,5.43377128 C10.9108757,5.05437109 10.5000057,4.75076878 10.0351348,4.52084307 C9.24812694,4.13158808 8.56428173,4 7.45454545,4 C4.88364127,4 3,6.14771812 3,9.11987614 C3,11.4998994 4.41382212,13.9493174 7.18627532,16.4428585 C8.69781928,17.8023393 10.6410383,19.1609346 12,19.8736982 C13.3589617,19.1609346 15.3021807,17.8023393 16.8137247,16.4428585 Z"
                          fillRule="evenodd"
                          stroke="currentColor"
                          strokeWidth="0.00000001"
                        />
                      </svg>
                    </li>
                  </Link>
                  <Link to="login">

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
              <ul>
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
                <Link to="/about">
                  <li
                    onClick={() => {
                      toggleNav();
                      setMenu("About");
                    }}
                    className={menu === "About" ? "liActive" : ""}
                    style={{ background: "none" }}
                  >
                    About Us
                  </li>
                </Link>
                <Link>
                  <li onClick={toggleNav} style={{ background: "none" }}>
                    Products
                  </li>
                </Link>
                <Link>
                  <li onClick={toggleNav} style={{ background: "none" }}>
                    Cart
                  </li>
                </Link>
                <Link>
                  <li onClick={toggleNav} style={{ background: "none" }}>
                    Contact Us
                  </li>
                </Link>
                <Link>
                  <li onClick={toggleNav} style={{ background: "none" }}>
                    Store
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
