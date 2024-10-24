import React, { useContext, useEffect, useState } from 'react';
import './Login.css'
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom'
import { TextInputComponent } from '../../Middlewares/Form/Input.component'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import authSvc from '../../pages/LoginPage/auth.service'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from '../../context/StoreContext';

const Login = ({ setCurrentView,setLoggedIn}) => {
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


    const loginDTO = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    });

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(loginDTO),
    });

    const {loggedInUser} = useContext(StoreContext)

    useEffect(()=>{
        if(loggedInUser){
            if(loggedInUser.role === "admin") {
                setLoggedIn(false)
                navigate('/admin')                
            } 
        }
    },[loggedInUser])

    const login = async (data) => {
        try {
            setLoading(true);
            const response = await authSvc.postRequest('/auth/login/', data);
            setLoading(false);            
            toast.success('Welcome to Maya Wears');
            localStorage.setItem("_at", response.result.token.token);
            localStorage.setItem("_rt", response.result.token.refreshToken);
            // After successful login, get the logged-in user
            // loggedInUser(); // Ensure the profile is shown after login
            setLoggedIn(true)         
          
        } catch (exception) {
            setLoading(false);
            toast.error(exception.data?.message || 'Login failed');
        }
      };

    
    
  return (
        <div className='login_box'>
            <form action=""method="post" onSubmit={handleSubmit(login)} >
                <div className="fromtitle">
                    <h2>Login</h2>
                    <div className='login_hr'></div>
                </div>
                <div className="form_body">
                    <label htmlFor="email">Email<span>*</span></label><br />
                    <TextInputComponent
                        name="email"
                        errMsg={errors?.email?.message || null}
                        required:true
                        control={control}
                    /> 
                    <br />
                    <label htmlFor="password">Password<span>*</span></label><br />
                    <TextInputComponent
                        name="password"
                        type='password'
                        errMsg={errors?.password?.message || null}
                        required:true
                        control={control}
                    /> 
                    <br />
                    <input className='submit_btn' type="submit" value="Submit" name='login_submit' disabled={loading}/>
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