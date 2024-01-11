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


      <FullPageContainer style={{ background: '#c7cad1' }}>
        <PageSizedContainer style={{ padding: '20px 0' }}>
          <h2 style={{ fontWeight: '500', marginBottom: '0px', color: '#1b1d21', }}>Trusted By</h2>
          <RowFlexedContainer style={{ justifyContent:'center', gap: '30px' }}> 
            <img src='mtn-logo.svg' alt='' style={{ width: '140px' }}/>
            <img src='radisson_2.png' alt='' style={{ width: '140px' }}/>
            <img src='sbl-logo.png' alt='' style={{ width: '140px' }}/>
            <img src='brlogogreen.jpeg' alt='' style={{ width: '140px' }}/>
            <img src='logo_31.png' alt='' style={{ width: '140px' }}/>
          </RowFlexedContainer>
        </PageSizedContainer>
      </FullPageContainer>


      <FullPageContainer style={{ background: 'white' }}>
        <PageSizedContainer>
          <RowFlexedContainer>
            <div 
              className="image-container" 
              style={{ 
                background: "url('/pexels-cottonbro-studio-3171837.jpg')",
                backgroundSize: "cover",
                backgroundOrigin: "initial",
              }}>
            </div>
            <div 
              className="right"
              style={{ 
                flexDirection: 'column',
                alignItems:'flex-start',
                gap: '20px',
                color: 'black',
              }}>
              
              <h2 style={{ fontWeight: '500' }}>About Fusee</h2>
              <HeaderOne1 style={{ fontWeight: '600' }}>What we can do for you.</HeaderOne1>
              <CustomParagraph>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Aut quam nostrum, consectetur distinctio, sapiente aliquam, 
                facilis laboriosam debitis ullam non ut sint delectus veritatis 
                temporibus! Rerum officiis aperiam perferendis. Inventore.
              </CustomParagraph>

              <CallToActionButton 
                text={'Book Now'} 
                color={'black'} 
                hoverColor={'#2f5c8f'}
                destination={'/'} 
              />
            </div>
          </RowFlexedContainer>
        </PageSizedContainer>
      </FullPageContainer>



      <FullPageContainer style={{ background: 'white' }}>
        <PageSizedContainer>
          <HeaderOne1 style={{ fontWeight: '600', color: '#1b1d21', textAlign: 'center' }}>Events that we work on.</HeaderOne1>
          <CustomParagraph style={{ color: 'grey', margin: '10px 0' }}>
            We are simply the best at these.
          </CustomParagraph>
          <RowFlexedContainer style={{ justifyContent:'center', gap: '30px', margin: '30px 0 20px', alignItems: "flex-start" }}> 
            <Card1>
              <div 
                className="image-card"
                style={{ 
                  background: "url('/event_planning.jpg')",
                  backgroundSize: "cover",
                  backgroundOrigin: "initial",
                }}>
              </div>
              <p className="description">Event planning and management</p>
            </Card1>
            <Card1>
              <div 
                className="image-card"
                style={{ 
                  background: "url('/defcon1.jpg')",
                  backgroundSize: "cover",
                  backgroundOrigin: "initial",
                }}>
              </div>
              <p className="description">Concerts</p>
            </Card1>
            <Card1>
              <div 
                className="image-card"
                style={{ 
                  background: "url('/meeting.jpg')",
                  backgroundSize: "cover",
                  backgroundOrigin: "initial",
                }}>
              </div>
              <p className="description">Meetings</p>
            </Card1>
            <Card1>
              <div 
                className="image-card"
                style={{ 
                  background: "url('/wedding_ceremony.jpeg')",
                  backgroundSize: "cover",
                  backgroundOrigin: "initial",
                }}>
              </div>
              <p className="description">Wedding ceremonies</p>
            </Card1>
            <Card1>
              <div 
                className="image-card"
                style={{ 
                  background: "url('/show.jpg')",
                  backgroundSize: "cover",
                  backgroundOrigin: "initial",
                }}>
              </div>
              <p className="description">Shows</p>
            </Card1>
            <Card1>
              <div 
                className="image-card"
                style={{ 
                  background: "url('/party.jpg')",
                  backgroundSize: "cover",
                  backgroundOrigin: "initial",
                }}>
              </div>
              <p className="description">Parties</p>
            </Card1>
          </RowFlexedContainer>
        </PageSizedContainer>
      </FullPageContainer>

      {/* LIST OF DJS TO THE HOME PAGE *************************************************************************************************** */}
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

      <Banner style={styles2}>
        <div className="overlay">
          <PageSizedContainer style={{ gap: '20px', textAlign: 'center' }}>
            <HeaderOne1 style={{ fontWeight: '600' }}>Visit our weekly schedules</HeaderOne1>
            <p>You can view a list of events that your favorite DJs will be hosting, where they will be playing and book accordingly.</p>
            <CallToActionButton 
              text={'View more'} 
              color={'white'} 
              hoverColor={'#2f5c8f'}
              destination={'/'} 
            />
          </PageSizedContainer>
        </div>
      </Banner>

    </PageContainer>
  )
}
