import React from 'react'
import './LoginPage.css'
import Login from '../../Components/Login/Login'

const LoginPage = () => {
  return (
    <div className='login_page'>
        <div className="login_overlay" ></div>  
        <div className='loginform'>
          <div className="loginform_box">
            <div className="loginform_box_grid">
              <Login/>
              <div className="login_message">
                satish
              </div>
            </div>            
          </div>
          
        </div>
        
    </div>
  )
}

export default LoginPage