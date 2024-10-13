import React from 'react'
import './Login.css'

const Login = ({setCurrentView}) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
    }
  return (
        <div className='login_box'>
            <form action=""method="post" onSubmit={handleSubmit} >
                <div className="fromtitle">
                    <h2>Login</h2>
                    <div className='login_hr'></div>
                </div>
                <div className="form_body">
                    <label htmlFor="email">Email<span>*</span></label><br />
                    <input type="email" name='email' required /><br />
                    <label htmlFor="password">Password<span>*</span></label><br />
                    <input type="password" name='password' required /><br />
                    <input className='submit_btn' type="submit" value="Submit" name='login_submit'/>
                </div>
                <div className="sign_up_p">
                    <h5 onClick={()=> setCurrentView('forgotPassowrd')}>Forgot Password?</h5>
                    <p>Don't have an account? <span onClick={()=> setCurrentView('signup')}>Sign Up</span></p>
                </div>
            </form>
        </div>    
  )
}
 
export default Login