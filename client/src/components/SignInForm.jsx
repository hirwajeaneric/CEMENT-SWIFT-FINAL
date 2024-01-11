import { useForm } from 'react-hook-form';
import { BookFormContainer } from '../styles/GeneralStyledComponents';
import axios from 'axios';
import Endpoints from '../utils/APIS';
import { useState, useContext } from 'react';
import { ScrollContext } from '../App';

export default function SignInForm(props) {
    const { setOpen, setResponseMessage, ...other } = useContext(ScrollContext);
    const { handleAuthFormExchange } = props;
    
    // Form processing and message display
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = data => {
        setIsProcessing(true);

        axios.post(Endpoints.APIS.userApis.signIn, data)
        .then(response => {
            setTimeout(() => {
                if (response.status === 200) {
                    setIsProcessing(false);
                    localStorage.setItem('userInfo', JSON.stringify(response.data.user));
                    localStorage.setItem('userTkn', JSON.stringify(response.data.user.token));
                    setTimeout(() => {
                        window.location.replace('/');
                    },2000);
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
                    type="email" 
                    placeholder="Email" 
                    {...register("email", 
                    {required: true, pattern: /^\S+@\S+$/i})} 
                    aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email?.type === "required" && (
                    <p role="alert">Your email is required</p>
                )}
            </div>

            <div className="form-input-container">
                <input 
                    type="password" 
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
                    :<input className='submit-button' value='LOGIN' type="submit" />
                }
            </div>
            
            <div className='other-options'>
                <p>You do not have an account? <button onClick={() => handleAuthFormExchange('Sign Up')}>Create an account</button></p>
                <p>Forgot your password? <button onClick={() => handleAuthFormExchange('Forgot Password')}>Recover/reset password</button></p>
            </div>
        </BookFormContainer>
    );
}