import { Helmet } from "react-helmet-async";
import { FullPageContainer, PageContainer, PageSizedContainer, RowFlexedContainer, HeaderOne1 } from "../../styles/GeneralStyledComponents";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";
import BookForm from "../../components/BookForm";

export default function Book() {
  const { setNotHomePage } = useContext(ScrollContext);

  useEffect(() => {
    if (window.location.pathname !== '/') {
      setNotHomePage(true);
    }
  }, [setNotHomePage]);

  return (
    <PageContainer>
      <Helmet>
        <title>Book Now - Book a DJ for your event now..</title>
        <meta name="description" content={`Book a DJ for your event now.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: '#f1f1f1', marginTop:'40px', color: 'black' }}>
        <PageSizedContainer>
          <RowFlexedContainer style={{ justifyContent:'flex-start', gap: '30px', alignItems: "center" }}>
            <HeaderOne1 style={{ fontWeight: '600', color: '#1b1d21', textAlign: 'center', width: '100%' }}>Book a service now</HeaderOne1>
            <BookForm />
          </RowFlexedContainer>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
