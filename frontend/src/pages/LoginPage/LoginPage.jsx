import React, { useEffect, useState } from 'react'
import './LoginPage.css'
import Login from '../../Components/Login/Login'
import SignUp from '../../Components/SignUp/SignUp'
import {useLocation} from 'react-router-dom'
import ForgotPassword from '../../Components/ForgotPassword/ForgotPassword'
import Token from '../../Components/Token/Token'
import GeneratePassword from '../../Components/GeneratePassword/GeneratePassword'

const LoginPage = () => {
  const location = useLocation();
  const [currentView,setCurrentView] = useState('login')
  useEffect(()=>{
    if(location.state && location.state.currentView){
      setCurrentView(location.state.currentView)
    }
  },[location.state])

  const renderComponent = ()=>{
    switch (currentView){
      case 'login':
        return <Login setCurrentView = {setCurrentView} />
      case 'signup':
        return <SignUp setCurrentView = {setCurrentView} />
        case 'forgotPassowrd':
          return <ForgotPassword setCurrentView = {setCurrentView}/>
        case 'token':
          return <Token setCurrentView={setCurrentView}/>
        case 'generatePassword':
          return <GeneratePassword setCurrentView={setCurrentView}/>  
      default :
      return <Login setCurrentView = {setCurrentView} />
    }
  }
  return (
    <div className='login_page'>
        <div className="login_overlay" ></div>  
        <div className='loginform'>
          <div className="loginform_box">
            <div className="loginform_box_grid">
              {/* <Login/> */}
              {/* <SignUp/> */}
              {renderComponent()}
              <div className="login_message">
              <div className=" loginpage_messaage">
                    <h2>Welcome <br /> Again!</h2>                    
                    <p>We're happy to see <br />you again.  Please log <br /> in to access your account<br />  and continue exploring<br /> all  the features we <br />have to offer.</p>
                </div>
              </div>
            </div>            
          </div>          
        </div>        
    </div>
  )
}

export default LoginPage