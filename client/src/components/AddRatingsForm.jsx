import { useForm } from 'react-hook-form';
import { BookFormContainer } from '../styles/GeneralStyledComponents';
import axios from 'axios';
import Endpoints from '../utils/APIS';
import { useState, useContext } from 'react';
import { ScrollContext } from '../App';
import { useDispatch } from 'react-redux';
import { getDJRatings } from '../redux/features/ratingSlice';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
  

export default function AddRatingsForm() {
    const { setOpen, setResponseMessage } = useContext(ScrollContext);
    const dispatch = useDispatch();
    const params = useParams();

    // Rating states
    const [value, setValue] = useState(3);
    const [hover, setHover] = useState(-1);
    
    // Form processing and message display
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = data => {
        var user = JSON.parse(localStorage.getItem('userInfo'));

        data.score = value;
        data.djId = params.djId;
        
        if (user) {
            data.userId = user.id;
        }

        setIsProcessing(true);

        axios.post(Endpoints.APIS.ratingApis.add, data)
        .then(response => {
            if (response.status === 201) {
                setIsProcessing(false);
                dispatch(getDJRatings(params.djId));
                setTimeout(() => {
                    window.location.reload();
                },2000);
            }
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
        <BookFormContainer style={{ gap: '10px' }} onSubmit={handleSubmit(onSubmit)}>
            <div className="form-input-container">
                <label htmlFor="description">Rate</label>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    {value !== null && (
                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                    )}
                </div>
            </div>
            <div className="form-input-container">
                <label htmlFor="fullName">Full name *</label>
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
                <label htmlFor="email">Email *</label>
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
                <label htmlFor="description">Add comment</label>
                <textarea 
                    type="descriptions" 
                    placeholder="Comment"
                    style={{ fontFamily: 'Poppins' }}
                    rows={3} 
                    {...register("descriptions", 
                    {required: false, pattern: /^\S+@\S+$/i})} 
                    aria-invalid={errors.descriptions ? "true" : "false"}>
                </textarea>
            </div>
            <div className="form-input-container">
                {isProcessing 
                    ? <input disabled className='submit-button' value='PROCESSING...' type="button" /> 
                    :<input className='submit-button' value='SUBMIT' type="submit" />
                }
            </div>
        </BookFormContainer>
    );
}