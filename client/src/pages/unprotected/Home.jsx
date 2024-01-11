import { Banner } from "../../styles/BannerStyledComponents";
import { Card1, Card2, CustomParagraph, FullPageContainer, HeaderOne1, PageContainer, PageSizedContainer, RowFlexedContainer } from "../../styles/GeneralStyledComponents";
import SearchFormComponent from '../../components/SearchForm';
import CallToActionButton from "../../components/CallToActionButton";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";
import { useSelector } from "react-redux";
import Endpoints from "../../utils/APIS";

const styles1 = { 
  background: 'url("/background.gif")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat', 
  backgroundPosition: 'bottom'
}

const styles2 = { 
  background: 'url("/pexels-pixabay-164907.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat', 
  backgroundPosition: 'bottom',
}

export default function Home() {
  const { setNotHomePage } = useContext(ScrollContext);
  const { isLoading, listOfDJs } = useSelector(state => state.user)

  useEffect(() => {
    setNotHomePage(false);
  }, [setNotHomePage]);

  return (
    <PageContainer>
      <Helmet>
        <title>Fusee - Find the best DJ near you.</title>
        <meta name="description" content={`Welcome to Fusee. Find the best DJ Playing in your location.`} /> 
      </Helmet>

      <Banner style={styles1}>
        <div className="overlay">
          <PageSizedContainer style={{ gap: '20px', textAlign: 'center' }}>
            
          </PageSizedContainer>
        </div>
      </Banner>      

      {/* LIST OF CEMENTS TO THE HOME PAGE *************************************************************************************************** */}
      <FullPageContainer style={{ background: '#f1f1f1' }}>
        <PageSizedContainer>
          <HeaderOne1 style={{ fontWeight: '600', color: '#1b1d21', textAlign: 'center' }}>The best DJs are here.</HeaderOne1>
          <RowFlexedContainer style={{ justifyContent:'center', gap: '30px', margin: '30px 0 20px', alignItems: "flex-start" }}> 
            {isLoading && <p>Loading...</p>}
            {listOfDJs && listOfDJs.map((dj, index) => {
              if (index < 6 && dj.status === 'Active') {
                return (
                  <Card2 key={index}>
                    {dj.profilePicture !== undefined 
                    ? 
                    <div className="image-card" style={{ background: `url('${Endpoints.APIS.files.profile+dj.profilePicture}')`, backgroundSize: "cover", backgroundOrigin: "initial" }}></div> 
                    :
                    <div className="image-card" style={{ background: "url('user-icon.png')", backgroundSize: "cover", backgroundOrigin: "initial" }}></div>}
                    {!dj.alias ? <p className="description">{dj.fullName}</p> : <p className="description">{dj.alias}</p>}
                  </Card2>
                )
              }})
            }
          </RowFlexedContainer>
          <CallToActionButton 
            text={'View more'} 
            color={'black'} 
            hoverColor={'#2f5c8f'}
            destination={'/djs'} 
          />
        </PageSizedContainer>
      </FullPageContainer>

    </PageContainer>
  )
}
