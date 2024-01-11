import { Helmet } from "react-helmet-async";
import { ResetPasswordFormContainer, FullPageContainer, HeaderOne1, PageContainer, PageSizedContainer, RowFlexedContainer } from "../../styles/GeneralStyledComponents";
import { useContext, useEffect, useState } from "react";
import { ScrollContext } from "../../App";
import { useParams } from "react-router-dom";
import Endpoints from "../../utils/APIS";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Djs() {
  const { setOpen, setResponseMessage, setNotHomePage, ...other } = useContext(ScrollContext);
  const params = useParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (window.location.pathname !== '/' || window.location.pathname !== '') {
      setNotHomePage(true);
    }
  }, [setNotHomePage]);

  const onSubmit = data => {
    
    const config = {
      headers: {
        'Authorization' : `Beader ${params.token}`
      }
    }

    setIsProcessing(true);

    axios.post(Endpoints.APIS.userApis.resetPassword+params.userId, { password: data.password }, config)
    .then(response => {
      setTimeout(() => {
        if (response.status === 200) {
          setIsProcessing(false);
          setResponseMessage({ message: response.data.message , severity: 'success' });
          setOpen(true);
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
    <PageContainer>
      <Helmet>
        <title>Djs - Djs who work with us.</title>
        <meta name="description" content={`All Djs who work with us.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: '#f1f1f1', marginTop:'40px' }}>
        <PageSizedContainer style={{ justifyContent: 'flex-start', minHeight: '70vh', minHeight: '70svh'}}>
          <HeaderOne1 style={{ fontWeight: '600', color: '#1b1d21', textAlign: 'center' }}>Reset Password</HeaderOne1>
          <RowFlexedContainer style={{ justifyContent:'center', gap: '30px', margin: '30px 0 20px', alignItems: "flex-start" }}> 
            <ResetPasswordFormContainer onSubmit={handleSubmit(onSubmit)}>
              <div className="form-input-container">
                <input 
                  type="password" 
                  placeholder="Password" 
                  {...register("password", {required: true, })} 
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password?.type === "required" && (
                  <p role="alert">Password is required</p>
                )}
              </div>

              <div className="form-input-container">
                <input 
                  type="password" 
                  placeholder="Confirm password" 
                  {...register("confirmPassword", { required: true, })} 
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                {errors.confirmPassword?.type === "required" && (
                  <p role="alert">Please confirm your new password</p>
                )}
              </div>
              
              <div className="form-input-container">
                {isProcessing 
                  ? <input disabled className='submit-button' value='PROCESSING...' type="button" /> 
                  :<input className='submit-button' value='RESET PASSWORD' type="submit" />
                }
              </div>
            </ResetPasswordFormContainer>
          </RowFlexedContainer>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
