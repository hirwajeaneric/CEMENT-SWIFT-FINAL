/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { BookFormContainer } from '../styles/GeneralStyledComponents';
import { useState, useContext } from 'react';
import axios from 'axios';
import { ScrollContext } from '../App';
import EndPoints from '../utils/APIS'
import { getAllUsers } from '../redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateDJAccountForm() {
    const { setOpen, setResponseMessage } = useContext(ScrollContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Form processing and message display
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        data.userType = 'DJ';

        setIsProcessing(true);
        axios.post(EndPoints.APIS.userApis.signUp, data)
        .then(response => {
            dispatch(getAllUsers);
            setTimeout(() => {
                if (response.status === 201) {
                    setIsProcessing(false);
                    navigate('/dash/djs');
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
        </BookFormContainer>
    );
}