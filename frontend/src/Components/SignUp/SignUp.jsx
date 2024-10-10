import React, { useState } from 'react'
import { TextInputComponent } from '../../Middlewares/Form/Input.component'
import {useForm} from "react-hook-form"

const SignUp = ({ setCurrentView }) => {
    const {control,handleSubmit, setValue,formState:{errors}} = useForm({

    }) 
    const submitForm=(data)=>{

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
                        errMsg={errors?.password?.message || null}
                        required:true
                        control={control}
                    />
                    <br />
                    <label htmlFor="confirmPassword">Confirm Password<span>*</span></label><br />
                    <TextInputComponent
                        name="confirmPassword"
                        errMsg={errors?.confirmPassword?.message || null}
                        required:true
                        control={control}
                    />
                    
                    <br />
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