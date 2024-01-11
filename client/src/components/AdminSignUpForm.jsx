/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { BookFormContainer, HeaderOne1 } from '../styles/GeneralStyledComponents';
import { useState, useContext } from 'react';
import axios from 'axios';
import { ScrollContext } from '../App';
import EndPoints from '../utils/APIS'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

export const AuthContainerStyles = styled.div`
    background: white;
    padding: 40px;
    width: 40vw;

    @media (max-width: 997px) {
        width: 60vw;
    }

    @media (max-width: 768px) {
        width: 70vw;
    }

    @media (max-width: 480px) {
        width: 90vw;
    }
`; 

export default function AdminSignUpForm() {
    const { setOpen, setResponseMessage } = useContext(ScrollContext);
    const navigate = useNavigate();

    // Form processing and message display
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);

        setIsProcessing(true);

        data.userType = 'Manager';

        axios.post(EndPoints.APIS.userApis.signUp, data)
        .then(response => {
            setTimeout(() => {
                if (response.status === 201) {
                    setIsProcessing(false);
                    localStorage.setItem('userInfo', JSON.stringify(response.data.user));
                    localStorage.setItem('userTkn', JSON.stringify(response.data.user.token));
                    window.location.replace('/dash/');
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
                <title>Admin Sign up</title>
                <meta name="description" content={`Admin Sign up page.`} /> 
            </Helmet>
            <BookFormContainer onSubmit={handleSubmit(onSubmit)}>
                <h2 style={{ color: 'black' }}>Sign up</h2>
                <div className="form-input-container">
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        {...register("fullName", {required: true})}
                        aria-invalid={errors.fullName ? "true" : "false"}
                    />
                    {errors.fullName?.type === "required" && (
                        <p role="alert">Your name is required</p>
                    )}
                </div>
                <div className="form-input-container">
                    <input 
                        type="text" 
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
                    <p>Do you have an account? <button onClick={() => navigate('/admin/auth/signin')}>Sign In</button></p>
                </div>
            </BookFormContainer>
        </AuthContainerStyles>
    );
}