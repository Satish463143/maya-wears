import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import Login from "../../Components/Login/Login";
import SignUp from "../../Components/SignUp/SignUp";
import { useLocation } from "react-router-dom";
import ForgotPassword from "../../Components/ForgotPassword/ForgotPassword";
import Token from "../../Components/Token/Token";
import GeneratePassword from "../../Components/GeneratePassword/GeneratePassword";
import { Link } from "react-router-dom";
import cover__pic from "../../assets/images/desktopImage_2.jpg";
import maya_logo from "../../assets/images/maya-logo.png";

const LoginPage = () => {
  const location = useLocation();
  const [currentView, setCurrentView] = useState("login");

  useEffect(() => {
    if (location.state && location.state.currentView) {
      setCurrentView(location.state.currentView);
    }
  }, [location.state]);

  const renderComponent = () => {
    switch (currentView) {
      case "login":
        return (
          <Login setCurrentView={setCurrentView} />
        );
      case "signup":
        return <SignUp setCurrentView={setCurrentView} />;
      case "forgotPassowrd":
        return <ForgotPassword setCurrentView={setCurrentView} />;
      case "token":
        return <Token setCurrentView={setCurrentView} />;
      case "generatePassword":
        return <GeneratePassword setCurrentView={setCurrentView} />;
      default:
        return (
          <Login setCurrentView={setCurrentView}  />
        );
    }
  };

 

 

  return(
    <>
      <div className="account__photo">
        <Link to="/">
          <div className="cross_btn">
            <span>
              <svg
                style={{ enableBackground: "new 0 0 24 24" }}
                version="1.1"
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <style>{`.st0{opacity:0.2;fill:none;stroke:#ffffff;stroke-width:0.02;stroke-miterlimit:10;}`}</style>
                <g id="grid_system" />
                <g id="_icons">
                  <path d="M8.3,15.7C8.5,15.9,8.7,16,9,16s0.5-0.1,0.7-0.3l2.3-2.3l2.3,2.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12l2.3-2.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L9.7,8.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l2.3,2.3l-2.3,2.3C7.9,14.7,7.9,15.3,8.3,15.7z" />
                </g>
              </svg>
            </span>
          </div>
        </Link>
        <img src={cover__pic} alt="" className="account_cover_poto" />
        <img src={maya_logo} alt="" className="logoooooo" />
      </div>
      <div className={`login_page`}>
        <div className="loginform">
          <div className="loginform_box">
            <div className="loginform_box_grid">
              <div className="login_message">
                <div className="loginpage_message">
                  <h2>Hello Mayaluss !</h2>
                </div>
              </div>
              <div>{renderComponent()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
