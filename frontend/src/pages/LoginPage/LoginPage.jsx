import React, { useContext, useEffect, useState } from 'react'
import './LoginPage.css'
import Login from '../../Components/Login/Login'
import SignUp from '../../Components/SignUp/SignUp'
import {useLocation, useNavigate} from 'react-router-dom'
import ForgotPassword from '../../Components/ForgotPassword/ForgotPassword'
import Token from '../../Components/Token/Token'
import GeneratePassword from '../../Components/GeneratePassword/GeneratePassword'
import { StoreContext } from '../../context/StoreContext'

const LoginPage = ({ isVisible,toggleVisible }) => {
  const location = useLocation();
  const [currentView,setCurrentView] = useState('login')
  let [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate()

  useEffect(()=>{
    if(location.state && location.state.currentView){
      setCurrentView(location.state.currentView)
    }
  },[location.state])

  const renderComponent = ()=>{
    switch (currentView){
      case 'login':
        return <Login setCurrentView = {setCurrentView} setLoggedIn= {setLoggedIn}/>
      case 'signup':
        return <SignUp setCurrentView = {setCurrentView} />
      case 'forgotPassowrd':
        return <ForgotPassword setCurrentView = {setCurrentView} />
      case 'token':
        return <Token setCurrentView={setCurrentView} />
      case 'generatePassword':
        return <GeneratePassword setCurrentView={setCurrentView} />  
      default :
      return <Login setCurrentView = {setCurrentView}  setLoggedIn= {setLoggedIn}/>
    }
  }
 

  const {loggedInUser} = useContext(StoreContext)
  useEffect(()=>{
    if(loggedInUser){
      if(loggedInUser.role === "admin"){ 
        setLoggedIn(false)
        navigate('/admin')  
          
      }else{
        setLoggedIn(true)
      }
    }
    
  },[loggedInUser])



  return loggedIn ? (
    <>
      <div className={`login_page ${isVisible ? 'login_page_none' : ''}`}>
          Your Profile
          <div className="cross_btn" onClick={toggleVisible}>
              <span>
                <svg
                  style={{ enableBackground: "new 0 0 24 24" }}
                  version="1.1"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <style>{`.st0{opacity:0.2;fill:none;stroke:#ffffff;stroke-width:0.05;stroke-miterlimit:10;}`}</style>
                  <g id="grid_system" />
                  <g id="_icons">
                    <path
                      d="M8.3,15.7C8.5,15.9,8.7,16,9,16s0.5-0.1,0.7-0.3l2.3-2.3l2.3,2.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12l2.3-2.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L9.7,8.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l2.3,2.3l-2.3,2.3C7.9,14.7,7.9,15.3,8.3,15.7z"
                    />
                    <path
                      d="M12,21c5,0,9-4,9-9s-4-9-9-9s-9,4-9,9S7,21,12,21z M12,5c3.9,0,7,3.1,7,7s-3.1,7-7,7s-7-3.1-7-7S8.1,5,12,5z"
                    />
                  </g>
                </svg>
              </span>
          </div>
        
      </div>
    </>
  ) : (
    <>
      <div className={`login_page ${isVisible ? 'login_page_none' : ''}`}>
        <div className="login_overlay" onClick={toggleVisible}></div>
        <div className='loginform'>
          <div className="loginform_box">
            <div className="cross_btn" onClick={toggleVisible}>
              <span>
                <svg
                  style={{ enableBackground: "new 0 0 24 24" }}
                  version="1.1"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <style>{`.st0{opacity:0.2;fill:none;stroke:#ffffff;stroke-width:0.05;stroke-miterlimit:10;}`}</style>
                  <g id="grid_system" />
                  <g id="_icons">
                    <path
                      d="M8.3,15.7C8.5,15.9,8.7,16,9,16s0.5-0.1,0.7-0.3l2.3-2.3l2.3,2.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12l2.3-2.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L9.7,8.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l2.3,2.3l-2.3,2.3C7.9,14.7,7.9,15.3,8.3,15.7z"
                    />
                    <path
                      d="M12,21c5,0,9-4,9-9s-4-9-9-9s-9,4-9,9S7,21,12,21z M12,5c3.9,0,7,3.1,7,7s-3.1,7-7,7s-7-3.1-7-7S8.1,5,12,5z"
                    />
                  </g>
                </svg>
              </span>
            </div>
            <div className="loginform_box_grid">
              {renderComponent()}
              <div className="login_message">
                <div className="loginpage_message">
                  <h2>Welcome <br /> Again!</h2>
                  <p>
                    We're happy to see <br />
                    you again. Please log <br />
                    in to access your account <br />
                    and continue exploring <br />
                    all the features we <br />
                    have to offer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default LoginPage