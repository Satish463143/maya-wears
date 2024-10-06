import React from 'react'

const GeneratePassword = ({setCurrentView}) => {
    const handleSubmit = async (e) => {
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
            <form action=""method="post" onSubmit={handleSubmit}>
                <div className="fromtitle">
                    <h2>Generate Password</h2>
                    <div className='login_hr'></div>
                </div>
                <div className="form_body">
                    <label htmlFor="password">Enter new password<span>*</span></label><br />
                    <input type="password" name='password' required /><br />
                    <label htmlFor="confirmPassword">Confirm Password<span>*</span></label><br />
                    <input type="password" name='confirmPassword' required /><br />
                    <input className='submit_btn' type="submit" value="Submit" name='password_submit'/>
                </div>
                <div className="sign_up_p">                    
                    <p>Remembered the password <span onClick={()=> setCurrentView('login')}>Login</span></p>
                </div>
            </form>
        </div>        
    </div>
  )
}

export default GeneratePassword