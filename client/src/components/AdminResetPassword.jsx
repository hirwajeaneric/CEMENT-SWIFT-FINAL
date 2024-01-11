import axios from 'axios';
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ScrollContext } from '../App';
import { BookFormContainer } from '../styles/GeneralStyledComponents';
import Endpoints from '../utils/APIS';
import { AuthContainerStyles } from './AdminSignUpForm';

export default function AdminResetPassword() {
    const params = useParams();
    const { setOpen, setResponseMessage } = useContext(ScrollContext);
    const navigate = useNavigate();

    // Form processing and message display
    const [isProcessing, setIsProcessing] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = data => {
        setIsProcessing(true);

        const config = {
            headers: {
              'Authorization' : `Bearer ${params.token}`
            }
        }

        console.log(Endpoints.APIS.userApis.resetPassword+params.userId);
        console.log({ password: data.password });

        axios.post(Endpoints.APIS.userApis.resetPassword+params.userId, { password: data.password }, config)
        .then(response => {
            setTimeout(() => {
                if (response.status === 200) {
                    setIsProcessing(false);
                    setResponseMessage({message: 'Password changed' , severity: 'success'});
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
                <title>Reset Password</title>
                <meta name="description" content={`Admin Reset Password page.`} /> 
            </Helmet>
            <BookFormContainer onSubmit={handleSubmit(onSubmit)}>
                <h2 style={{ color: 'black' }}>Change Password?</h2>
                <div className="form-input-container">
                    <input 
                        type="password" 
                        placeholder="password" 
                        {...register("password", 
                        {required: true, pattern: /^\S+@\S+$/i})} 
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
                    <p>Do you already have an account? <button onClick={() => navigate('/admin/auth/signin')}>Login</button></p>
                </div>
            </BookFormContainer>
        </AuthContainerStyles>
    );
}