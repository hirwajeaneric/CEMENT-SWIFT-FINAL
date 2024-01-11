/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { BookFormContainer } from '../styles/GeneralStyledComponents';
import { useState, useContext } from 'react';
import axios from 'axios';
import { ScrollContext } from '../App';
import EndPoints from '../utils/APIS'

export default function SignUpForm(props) {
    const { setOpen, setResponseMessage } = useContext(ScrollContext);
    const { handleAuthFormExchange } = props;
    
    // Form processing and message display
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);

        setIsProcessing(true);

        axios.post(EndPoints.APIS.userApis.signUp, data)
        .then(response => {
            setTimeout(() => {
                if (response.status === 201) {
                    setIsProcessing(false);
                    localStorage.setItem('userInfo', JSON.stringify(response.data.user));
                    localStorage.setItem('userTkn', JSON.stringify(response.data.user.token));
                    window.location.replace('/');
                }
            }, 3000)
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setIsProcessing(false);
                setResponseMessage({ message: error.response.data.msg, severity:'error'})
                setOpen(true);
            }
        })
    };
    
    return (
        <BookFormContainer onSubmit={handleSubmit(onSubmit)}>
            <div className="form-input-container">
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    minLength={3}
                    {...register("fullName", {required: true})}
                    aria-invalid={errors.fullName ? "true" : "false"}
                />
                {errors.fullName?.type === "required" && (
                    <p role="alert">Your name is required</p>
                )}
            </div>
            <div className="form-input-container">
                <select 
                    {...register("userType", { required: true })}
                    aria-invalid={errors.userType ? "true" : "false"}
                >
                    <option value="">Choose role</option>
                    <option value="Company">Company</option>
                    <option value="Personal">Personal</option>
                </select>
                {errors.requestingUserType?.type === "required" && (
                    <p role="alert">User type is required</p>
                )}
            </div>
            <div className="form-input-container">
                <input 
                    type="text" 
                    placeholder="Requesting Company" 
                    {...register("requestingCompany", {})}   
                />
            </div>
            <div className="form-input-container">
                <input 
                    type="text" 
                    minLength={10}
                    maxLength={10}
                    placeholder="Phone Number" 
                    {...register("phone", {required: true})}
                    aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors.phone?.type === "required" && (
                    <p role="alert">Phone number is required</p>
                )}
            </div>
            <div className="form-input-container">
                <input 
                    type="email" 
                    minLength={8}
                    placeholder="Email" 
                    {...register("email", 
                    {required: true, 
                        // pattern: /^\S+@\S+$/i
                    })} 
                    aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email?.type === "required" && (
                    <p role="alert">Your email is required</p>
                )}
            </div>
            <div className="form-input-container">
                <input 
                    type="password" 
                    minLength={8}
                    placeholder="Password" 
                    {...register("password", 
                    {required: true, 
                        // pattern: /^\S+@\S+$/i
                    })} 
                    aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password?.type === "required" && (
                    <p role="alert">Password is required</p>
                )}
            </div>
            
            <div className="form-input-container">
                {isProcessing 
                    ? <input disabled className='submit-button' value='PROCESSING...' type="button" /> 
                    :<input className='submit-button' value='CREATE ACCOUNT' type="submit" />
                }
            </div>

            <div className='other-options'>
                <p>Do you have an account? <button onClick={() => handleAuthFormExchange('Sign In')}>Sign In</button></p>
            </div>
        </BookFormContainer>
    );
}