import { Helmet } from "react-helmet-async";
import { FullPageContainer, PageContainer, PageSizedContainer, RowFlexedContainer } from "../../styles/GeneralStyledComponents";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Success() {
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState('43n423nn832334n4jm33343434343')  

  return (
    <PageContainer>
      <Helmet>
        <title>Success</title>
        <meta name="description" content={`Booking successful.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: 'white', marginTop:'40px', color: 'black' }}>
        <PageSizedContainer>
          <RowFlexedContainer style={{ justifyContent:'center', gap: '20px', alignItems: "center", padding: '50px 0', flexDirection: 'column' }}>
            {/* <BsFillCheckCircleFill style={{ fontSize: '400%', color: 'green' }} /> */}
            <h2 style={{ fontWeight: '600', textAlign: 'center', fontSize: '300%', color: 'black' }}>Thank you for your order!</h2>
            <p>Your order has been submitted. You will recieve an email confirmation shortly. Your order id is {orderId}</p>
            <div style={{ display: "flex", gap: '20px' }}>
              <button style={{ display: 'inline', background: 'black', color: "white", padding: '15px 20px', border: 'none', borderRadius: '10px'}} onClick={() => navigate(`/dash/order/${orderId}`)}>View Order</button>
              <button style={{ display: 'inline', background: 'transparent', color: "black", padding: '15px 20px', border: '1px solid black', borderRadius: '10px'}} onClick={() => navigate('/')}>View all orders</button>
            </div>
          </RowFlexedContainer>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
