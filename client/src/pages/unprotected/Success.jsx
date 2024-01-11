import { Helmet } from "react-helmet-async";
import { FullPageContainer, PageContainer, PageSizedContainer, RowFlexedContainer } from "../../styles/GeneralStyledComponents";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const { setNotHomePage } = useContext(ScrollContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname !== '/') {
      setNotHomePage(true);
    }
  }, [setNotHomePage]);

  return (
    <PageContainer>
      <Helmet>
        <title>Success</title>
        <meta name="description" content={`Booking successful.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: '#f1f1f1', marginTop:'40px', color: 'black' }}>
        <PageSizedContainer>
          <RowFlexedContainer style={{ justifyContent:'center', gap: '20px', alignItems: "center", padding: '50px 0', flexDirection: 'column' }}>
            <BsFillCheckCircleFill style={{ fontSize: '400%', color: 'green' }} />
            <h2 style={{ fontWeight: '600', textAlign: 'center', width: '100%', color: 'black' }}>Thank you!</h2>
            <p>Your payment and booking for a DJ service at Fusee.com was successfully recieved.</p>
            <Button variant="contained" style={{ display: 'block'}} color='primary' onClick={() => navigate('/')}>Home</Button>
          </RowFlexedContainer>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
