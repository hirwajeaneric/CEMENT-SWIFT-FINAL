import { Helmet } from "react-helmet-async";
import { FullPageContainer, PageContainer, PageSizedContainer, RowFlexedContainer, HeaderOne1 } from "../../styles/GeneralStyledComponents";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";
import BookForm from "../../components/BookForm";
import BookForm2 from "../../components/BookForm2";

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
      <FullPageContainer style={{ minHeight: '60vh', background: 'white', marginTop:'40px', color: 'black' }}>
        <PageSizedContainer style={{ padding: '80px 0'}}>
          <RowFlexedContainer style={{ justifyContent:'flex-start', gap: '30px', alignItems: "center" }}>
            <h2 style={{ fontWeight: '600', color: '#1b1d21', textAlign: 'left', width: '100%' }}>Cart</h2>
            <BookForm2 />

          </RowFlexedContainer>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
