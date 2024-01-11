import { Helmet } from "react-helmet-async";
import { Card2, FullPageContainer, HeaderOne1, PageContainer, PageSizedContainer, RowFlexedContainer } from "../../styles/GeneralStyledComponents";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Endpoints from "../../utils/APIS";

export default function Djs() {
  const { setNotHomePage } = useContext(ScrollContext);
  const navigate = useNavigate();
  const { isLoading, listOfDJs } = useSelector(state => state.user)

  useEffect(() => {
    if (window.location.pathname !== '/' || window.location.pathname !== '') {
      setNotHomePage(true);
    }
  }, [setNotHomePage]);

  return (
    <PageContainer>
      <Helmet>
        <title>Djs - Djs who work with us.</title>
        <meta name="description" content={`All Djs who work with us.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: '#f1f1f1', marginTop:'40px' }}>
        <PageSizedContainer style={{ justifyContent: 'flex-start', minHeight: '70vh'}}>
          <HeaderOne1 style={{ fontWeight: '600', color: '#1b1d21', textAlign: 'center' }}>Our DJs</HeaderOne1>
          <RowFlexedContainer style={{ justifyContent:'center', gap: '30px', margin: '30px 0 20px', alignItems: "flex-start" }}> 
            {isLoading && <p>Loading...</p>}
            {listOfDJs && listOfDJs.map((dj, index) => {
              if (dj.status === 'Active') {
                return (
                  <Card2 onClick={() => { navigate(`/dj/${dj.id}`)}} key={index}>
                    {dj.profilePicture !== undefined 
                    ? 
                    <div className="image-card" style={{ background: `url('${Endpoints.APIS.files.profile+dj.profilePicture}')`, backgroundSize: "cover", backgroundOrigin: "initial" }}></div> 
                    :
                    <div className="image-card" style={{ background: "url('user-icon.png')", backgroundSize: "cover", backgroundOrigin: "initial",}}></div>}
                    <p className="description">{dj.fullName}</p>
                  </Card2>
                )}
              }
            )}
          </RowFlexedContainer>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
