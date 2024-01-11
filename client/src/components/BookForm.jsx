import { useForm } from 'react-hook-form';
import { BookFormContainer } from '../styles/GeneralStyledComponents';
import { useState, useContext, useEffect } from 'react';
import { ScrollContext } from '../App';
import axios from 'axios';
import Endpoints from '../utils/APIS';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/features/userSlice';

export default function BookForm() {
    const { setOpen, setResponseMessage } = useContext(ScrollContext);
    const dispatch = useDispatch();

    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])
    

    const onSubmit = data => {
        setIsProcessing(true);

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        data.requestingUserId = userInfo.id;

        axios.post(Endpoints.APIS.jobApis.add, data)
        .then(response => {
            setTimeout(() => {
                if (response.status === 201) {
                    setIsProcessing(false);
                    setResponseMessage('Redirecting to payment handler...');
                    window.location.replace('https://buy.stripe.com/test_6oE6rB0Xjc0G7IY4gg');
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

    const { listOfDJs } = useSelector(state => state.user)
    
    return (
        <BookFormContainer onSubmit={handleSubmit(onSubmit)}>
            <div className="form-input-container2">
                <select 
                    {...register("jobType", { required: true })}
                    aria-invalid={errors.jobType ? "true" : "false"}
                >
                    <option value="">Select a job type</option>
                    <option value="Event Management">Event Management</option>
                    <option value="MC"> MC</option>
                    <option value="Birth Day party sound system"> Birth Day party sound system</option>
                    <option value="Wedding sound system"> Wedding sound system</option>
                    <option value="Private party sound system"> Private party sound system</option>
                    <option value="Public meeting sound system"> Public meeting sound system</option>
                    <option value="Private meeting sound system"> Private meeting sound system</option>
                    <option value="Concert"> Concert</option>
                    <option value="Club"> Club</option>
                </select>
                {errors.jobType?.type === "required" && (
                    <p role="alert">Job type is required</p>
                )}
            </div>

            <div className="form-input-container2">
                <input 
                    type="text" 
                    placeholder="Job Location" 
                    {...register("jobLocation", 
                    {required: true})} 
                    aria-invalid={errors.jobLocation ? "true" : "false"}
                />
                {errors.jobLocation?.type === "required" && (
                    <p role="alert">Job location is required</p>
                )}
            </div>
            
            <div className="form-input-container2">
                <input 
                    type="text" 
                    placeholder="Job Google Map Location" 
                    {...register("jobGoogleMapLocation", {required: true})} 
                    aria-invalid={errors.jobGoogleMapLocation ? "true" : "false"}
                />
                {errors.jobGoogleMapLocation?.type === "required" && (
                    <p role="alert">Job location is required</p>
                )}
            </div>
            
            <div className="form-input-container2">
                <textarea 
                    rows="6"
                    style={{ fontSize: '100%', fontFamily: 'poppins' }}
                    placeholder="Job description"
                    {...register("description", {required: true})} 
                    aria-invalid={errors.description ? "true" : "false"}
                />
                {errors.description?.type === "required" && (
                    <p role="alert">Job description is required</p>
                )}
            </div>

            <div className="form-input-container2">
                <select 
                    {...register("suggestedDjId", { required: false })}
                    aria-invalid={errors.suggestedDjId ? "true" : "false"}
                >
                    <option value="">Suggest a DJ</option>
                    {listOfDJs.map((dj, index) => {
                        if (dj.status === 'Active') {
                            return (
                                <option key={index} value={dj.id}>
                                    <span>{dj.fullName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>$ {dj.startingPrice}</span>
                                </option>
                            )
                        }
                    })}
                </select>
            </div>
            
            <div className="form-input-container2">
                <label htmlFor="startDate">Start date</label>
                <input 
                    id='startDate'
                    type="datetime-local" 
                    placeholder="Start Date" 
                    {...register("startDate", {required: true})} 
                    aria-invalid={errors.startDate ? "true" : "false"}
                />
                {errors.startDate?.type === "required" && (
                    <p role="alert">Start date is required</p>
                )}
            </div>

            <div className="form-input-container2">
                <label htmlFor="endDate">End date</label>
                <input
                    id='endDate' 
                    type="datetime-local" 
                    placeholder="End Date" 
                    {...register("endDate", {required: true})} 
                    aria-invalid={errors.endDate ? "true" : "false"}
                />
                {errors.endDate?.type === "required" && (
                    <p role="alert">End date is required</p>
                )}
            </div>

            <div className="form-input-container2">
                <select 
                    {...register("requestingUserType", { required: true })}
                    aria-invalid={errors.requestingUserType ? "true" : "false"}
                >
                    <option value="">Select user type</option>
                    <option value="Company">Company</option>
                    <option value="Personal"> Personal</option>
                    <option value="Group"> Group</option>
                    <option value="Family"> Family</option>
                </select>
                {errors.requestingUserType?.type === "required" && (
                    <p role="alert">User type is required</p>
                )}
            </div>
            
            <div className="form-input-container2">
                <input 
                    type="text" 
                    placeholder="Requesting Company" 
                    {...register("requestingCompanyName", {})}   
                />
            </div>

            <div className="form-input-container2">
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    {...register("requestingUserName", {required: true})}
                    aria-invalid={errors.requestingUserName ? "true" : "false"}
                />
                {errors.requestingUserName?.type === "required" && (
                    <p role="alert">Your full name is required</p>
                )}
            </div>


            <div className="form-input-container2">
                <input 
                    type="text" 
                    minLength={10}
                    maxLength={10}
                    placeholder="Phone Number" 
                    {...register("requestingUserPhone", {required: true})}
                    aria-invalid={errors.requestingUserPhone ? "true" : "false"}
                />
                {errors.requestingUserPhone?.type === "required" && (
                    <p role="alert">Job location is required</p>
                )}
            </div>

            <div className="form-input-container2">
                <input 
                    type="email" 
                    placeholder="Email" 
                    {...register("requestingUserEmail", 
                    {required: true, pattern: /^\S+@\S+$/i})} 
                    aria-invalid={errors.requestingUserEmail ? "true" : "false"}
                />
                {errors.requestingUserEmail?.type === "required" && (
                    <p role="alert">Your email is required</p>
                )}
            </div>
            
            <div className="form-input-container2">
                {isProcessing 
                    ? <input disabled={true} className='submit-button' value='PROCESSING...' type="button" /> 
                    :<input className='submit-button' value='BOOK NOW' type="submit" />
                }
            </div>
        </BookFormContainer>
    );
}