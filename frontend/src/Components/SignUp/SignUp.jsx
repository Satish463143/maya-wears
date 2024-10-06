import React from 'react'

const SignUp = ({ setCurrentView }) => {
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
                    <input type="text" name='name' required /><br />
                    <label htmlFor="address">Address </label><br />
                    <input type="text" name='address' required /><br />
                    <label htmlFor="email">Email<span>*</span></label><br />
                    <input type="email" name='email' required /><br />
                    <label htmlFor="phone">Phone Number<span>*</span></label><br />
                    <input type="text" name='phone' required /><br />
                    <label htmlFor="password">Password<span>*</span></label><br />
                    <input type="password" name='password' required /><br />
                    <label htmlFor="confirmPassword">Confirm Password<span>*</span></label><br />
                    <input type="password" name='confirmPassword' required /><br />
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