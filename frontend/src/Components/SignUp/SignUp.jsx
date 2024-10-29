import React, { useState } from 'react'
import { TextInputComponent } from '../../Middlewares/Form/Input.component'
import {useForm} from "react-hook-form"
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import authSvc from '../../pages/LoginPage/auth.service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
 

const SignUp = ({ setCurrentView }) => {
    const registerDTO = Yup.object({
        name:Yup.string().min(2).max(50).required(),
        email:Yup.string().email().required(),
        password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,16}$/).required(),
        confirmPassword:Yup.string().oneOf([Yup.ref('password')],"Password and comfirm password must match").required(),
        phone:Yup.string().matches(/^(98|97|96)\d{8}$/, "Phone number must start with 98, 97, or 96 and have exactly 10 digits").required(),
    })
    const [loading, setLoading] = useState(false);
    const {control,handleSubmit, setValue,setError,formState:{errors}} = useForm({
        resolver:yupResolver(registerDTO)

    }) 
    const submitForm=async(data)=>{
        try{
            setLoading(true)
            await authSvc.postRequest('/auth/register',data,{file:true})
            toast.success("Your Account has been created sucessfully. Please check your mail to activate your account")
            setLoading(false)
            setCurrentView('login')
        }catch(exception){
            if(exception.status === 400){

                //Object.keys({email:""})=>["email"].map((filed))
                Object.keys( exception.data.result).map((field)=>{
                    setError(field, {message:exception.data.result[field]} )
                }) 
            }
            toast.error(exception.data.message)

        }finally{
            setLoading(false)
        }
    } 
   
  return (
    <div>
        <div className='login_box'>
            <form  method="post" onSubmit={handleSubmit(submitForm)}>
                <div className="fromtitle">
                    <h2>Sign Up</h2>
                    <div className='login_hr'></div>
                </div>
                <div className="form_body">
                    <label htmlFor="name">Name <span>*</span></label><br />
                    <TextInputComponent
                        name="name"
                        errMsg={errors?.name?.message || null}
                        required:true
                        control={control}
 
                    />
                    <br />
                    <label htmlFor="address">Address </label><br />
                    <TextInputComponent
                        name="address"
                        errMsg={errors?.address?.message || null}
                        required:true
                        control={control}
                    />
                    <br />
                    <label htmlFor="email">Email<span>*</span></label><br />
                    <TextInputComponent
                        name="email"
                        errMsg={errors?.email?.message || null}
                        required:true
                        control={control}
                    />
                    <br />
                    <label htmlFor="phone">Phone Number<span>*</span></label><br />
                    <TextInputComponent
                        name="phone"
                        errMsg={errors?.phone?.message || null}
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
                    <label htmlFor="confirmPassword">Confirm Password<span>*</span></label><br />
                    <TextInputComponent
                        name="confirmPassword"
                        type='password'
                        errMsg={errors?.confirmPassword?.message || null}
                        required:true
                        control={control}
                    />
                    
                    <br />
                    <input className='submit_btn' type="submit" value="Submit" name='signUp_submit' disabled={loading}/>
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