import React from 'react'

const ForgotPassword = ( {setCurrentView}) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCurrentView('token');
    }
  return (
    <div className='login_box'>
            <form action=""method="post" onSubmit={handleSubmit} >
                <div className="fromtitle">
                    <h2>Forgot Password!!!</h2>
                    <div className='login_hr'></div>
                </div>
                <div className="form_body">
                    <label htmlFor="email">Email<span>*</span></label><br />
                    <input type="email" name='email' required /><br />
                    <input className='submit_btn' type="submit" value="Send Reset Email" name='login_submit'/>
                </div>
                <div className="sign_up_p">                    
                    <p>Remembered the password <span onClick={()=> setCurrentView('login')}>Login</span></p>
                </div>
            </form>
        </div>
  )
}

export default ForgotPassword