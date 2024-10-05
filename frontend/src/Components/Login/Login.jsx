import React from 'react'
import './Login.css'

const Login = () => {
  return (
    
        <div className='login_box'>
            <form action=""method="post" >
                <div className="fromtitle">
                    <h1>Login</h1>
                    <div className='login_hr'></div>
                </div>
                <div className="form_body">
                    <label htmlFor="email">Email</label><br />
                    <input type="email" name='email' required /><br />
                    <label htmlFor="password">Password</label><br />
                    <input type="password" name='password' required /><br />
                    <input type="submit" value="Submit" name='login_submit'/>
                </div>
                <div className="sign_up_p">
                    <p>Don't have an account? <span>Sign Up</span></p>
                </div>

            </form>
        </div>
    
  )
}

export default Login