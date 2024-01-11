import { Helmet } from "react-helmet-async";
import { FullPageContainer, PageContainer, PageSizedContainer, RowFlexedContainer } from "../../styles/GeneralStyledComponents";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";

export default function JobDetails() {
  const { setNotHomePage } = useContext(ScrollContext);

  useEffect(() => {
    if (window.location.pathname !== '/') {
      setNotHomePage(true);
    }
  }, [setNotHomePage]);

  return (
    <PageContainer>
      <Helmet>
        <title>Job details - View / Edit job information</title>
        <meta name="description" content={`View / Edit job information.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: '#f1f1f1', color: 'black' }}>
        <PageSizedContainer>
          <RowFlexedContainer style={{ justifyContent:'flex-start', gap: '30px', alignItems: "center", minHeight: '50vh' }}>
            <h2 style={{ fontWeight: '600', color: '#1b1d21', textAlign: 'center', width: '100%' }}>Job details</h2>
            
          </RowFlexedContainer>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
