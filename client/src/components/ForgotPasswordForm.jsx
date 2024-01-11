import { useForm } from 'react-hook-form';
import { BookFormContainer } from '../styles/GeneralStyledComponents';

export default function ForgotPasswordForm(props) {
    const { handleAuthFormExchange } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    
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
                <input className='submit-button' value='SEND REQUEST' type="submit" />
            </div>

            <div className='other-options'>
                <p>Do you already have an account? <button onClick={() => handleAuthFormExchange('Sign In')}>Login</button></p>
            </div>
        </BookFormContainer>
    );
}