import React, { useState } from 'react'

const SignUp = ({ setCurrentView }) => {
    const [data, setData] =useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        address:"",
        phone:"",

    })
    console.log(data)
    const handleForm= (e)=>{
        e.preventDefault();
        if (password !== confirmPassword) {
          setError('Confrim Passwords do not match');
          return;
        }else{
            setCurrentView('login');
        }
        
    }
  return (
    <div>
        <div className='login_box'>
            <form action=""method="post" onSubmit={handleForm}>
                <div className="fromtitle">
                    <h2>Sign Up</h2>
                    <div className='login_hr'></div>
                </div>
                <div className="form_body">
                    <label htmlFor="name">Name <span>*</span></label><br />
                    <input type="text" name='name' onChange={(e)=>{
                        e.preventDefault()
                        setData({
                            ...data,
                            name:e.target.value
                        })
                    }} required /><br />
                    <label htmlFor="address">Address </label><br />
                    <input type="text" name='address'onChange={(e)=>{
                        e.preventDefault()
                        setData({
                            ...data,
                            address:e.target.value
                        })
                    }} required /><br />
                    <label htmlFor="email">Email<span>*</span></label><br />
                    <input type="email" name='email'onChange={(e)=>{
                        e.preventDefault()
                        setData({
                            ...data,
                            email:e.target.value
                        })
                    }} required /><br />
                    <label htmlFor="phone">Phone Number<span>*</span></label><br />
                    <input type="text" name='phone' onChange={(e)=>{
                        e.preventDefault()
                        setData({
                            ...data,
                            phone:e.target.value
                        })
                    }}required /><br />
                    <label htmlFor="password">Password<span>*</span></label><br />
                    <input type="password" name='password'onChange={(e)=>{
                        e.preventDefault()
                        setData({
                            ...data,
                            password:e.target.value
                        })
                    }} required /><br />
                    <label htmlFor="confirmPassword">Confirm Password<span>*</span></label><br />
                    <input type="password" name='confirmPassword' onChange={(e)=>{
                        e.preventDefault()
                        setData({
                            ...data,
                            confirmPassword:e.target.value
                        })
                    }}required /><br />
                    <input className='submit_btn' type="submit" value="Submit" name='signUp_submit'/>
                </div>
                <div className="sign_up_p">                    
                    <p>Already have an account? <span onClick={()=> setCurrentView('login')}>Login</span></p>
                </div>
            </form>
        </div>        
    </div>
  )
}

export default SignUp