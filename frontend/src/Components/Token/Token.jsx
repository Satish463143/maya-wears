import React from 'react'

const Token = ({setCurrentView}) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCurrentView('generatePassword');
    }
  return (
    <div className='login_box'>
            <form action=""method="post" onSubmit={handleSubmit} >
                <div className="fromtitle">
                    <h2>Forgot Password!!!</h2>
                    <div className='login_hr'></div>
                </div>
                <div className="form_body">
                    <label htmlFor="token">Enter the Token<span>*</span></label><br />
                    <input type="text" name='token' required /><br />
                    <input className='submit_btn' type="submit" value="Verify Token" name='token_submit'/>
                </div>
                <div className="sign_up_p">                    
                    <p>Remembered the password <span onClick={()=> setCurrentView('login')}>Login</span></p>
                </div>
            </form>
        </div>
  )
}

export default Token