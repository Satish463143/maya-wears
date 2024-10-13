import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import authSvc from '../../pages/LoginPage/auth.service'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setCurrentView, setIsVisible }) => {
    
    const [loading, setLoading] = useState(false);

    const loginDTO = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    });

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(loginDTO),
    });

    const login = async (data) => {
        try {
        setLoading(true);
        const response = await authSvc.postRequest('/auth/login/', data);
        setLoading(false);
        toast.success('Welcome to Maya Wears');
        setIsVisible(false); // Set modal to invisible after successful login
        } catch (exception) {
        setLoading(false);
        console.log(exception);
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