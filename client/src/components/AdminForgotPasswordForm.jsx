import axios from 'axios';
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ScrollContext } from '../App';
import { BookFormContainer } from '../styles/GeneralStyledComponents';
import Endpoints from '../utils/APIS';
import { AuthContainerStyles } from './AdminSignUpForm';

export default function AdminForgotPasswordForm() {
    const { setOpen, setResponseMessage } = useContext(ScrollContext);
    const navigate = useNavigate();

    // Form processing and message display
    const [isProcessing, setIsProcessing] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        setIsProcessing(true);

        axios.post(Endpoints.APIS.userApis.requestPasswordReset, { userType: 'Manager', email: data.email })
        .then(response => {
            setTimeout(() => {
                if (response.status === 200) {
                    setIsProcessing(false);
                    localStorage.removeItem('userInfo');
                    localStorage.removeItem('userTkn');
                    setResponseMessage({ message: response.data.message, severity:'success'})
                    setOpen(true);
                    
                    setTimeout(() => {
                        window.location.replace('/admin/auth/signin');
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
        <AuthContainerStyles>
            <Helmet>
                <title>Admin Forgot Password</title>
                <meta name="description" content={`Admin Forgot Password page.`} /> 
            </Helmet>
            <BookFormContainer onSubmit={handleSubmit(onSubmit)}>
                <h2 style={{ color: 'black' }}>Forgot password?</h2>
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
                    {isProcessing 
                        ? <input disabled className='submit-button' value='PROCESSING...' type="button" /> 
                        :<input className='submit-button' value='LOGIN' type="submit" />
                    }
                </div>

                <div className='other-options'>
                    <p>Do you already have an account? <button onClick={() => navigate('/admin/auth/signin')}>Login</button></p>
                </div>
            </BookFormContainer>
        </AuthContainerStyles>
    );
}