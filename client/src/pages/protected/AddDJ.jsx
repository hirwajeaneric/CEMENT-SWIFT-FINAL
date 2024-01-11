import { Helmet } from "react-helmet-async";
import { FullPageContainer, PageContainer, PageSizedContainer,RowFlexedContainer2 } from "../../styles/GeneralStyledComponents";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";
import CreateDJAccountForm from "../../components/CreateDJAccountForm";

export default function AddDj() {
  const { setNotHomePage } = useContext(ScrollContext);

  useEffect(() => {
    if (window.location.pathname !== '/') {
      setNotHomePage(true);
    }
  }, [setNotHomePage]);

  return (
    <PageContainer>
      <Helmet>
        <title>Add new DJ - Create account for new DJ</title>
        <meta name="description" content={`Create account for new DJ.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: '#f1f1f1', color: 'black' }}>
      <PageSizedContainer style={{ paddingTop: '30px' }}>
          <RowFlexedContainer2 style={{ flexDirection: 'column', justifyContent:'flex-start', alignItems: "center", minHeight: '40vh' }}>
            {/* Title  */}
            <RowFlexedContainer2>
              <h2 style={{ fontWeight: '600', color: '#1b1d21', textAlign: 'center', width: '100%', marginBottom: '20px' }}>Create account for new DJ</h2>
            </RowFlexedContainer2>
            {/* Create dj account form  */}
            <CreateDJAccountForm />
          </RowFlexedContainer2>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
