import { Banner } from "../../styles/BannerStyledComponents";
import { CustomParagraph, FullPageContainer, HeaderOne1, PageContainer, PageSizedContainer, VerticallyFlexedContainer } from "../../styles/GeneralStyledComponents";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";

const styles2 = { 
  background: 'url("/defcon1.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat', 
  backgroundPosition: 'bottom',
}

export default function AboutUs() {
  const { setNotHomePage } = useContext(ScrollContext);

  useEffect(() => {
    setNotHomePage(false);
  }, [setNotHomePage]);

  return (
    <PageContainer>
      <Helmet>
        <title>Fusee - About us.</title>
        <meta name="description" content={`About us.`} /> 
      </Helmet>

      <Banner style={styles2}>
        <div className="overlay" style={{ background: 'rgba(0,0,0,0.7)'}}>
          <PageSizedContainer style={{ gap: '20px', textAlign: 'center' }}>
            <HeaderOne1 style={{ fontWeight: '600' }}>The Story Behind</HeaderOne1>
            <HeaderOne1 style={{ color: 'orange', fontWeight: '600' }}>Fusee</HeaderOne1>
            <p>Best DJ Locating and accessing system in Rwanda</p>
          </PageSizedContainer>
        </div>
      </Banner>

      <FullPageContainer style={{ background: 'white' }}>
        <PageSizedContainer>
          <VerticallyFlexedContainer style={{ gap: '20px', alignItems: 'center'}}>
            <h2 style={{ fontWeight: '500', color: 'black' }}>About Fusee</h2>
            <HeaderOne1 style={{ fontWeight: '600', color: 'black' }}>What we can do for you.</HeaderOne1>
            <CustomParagraph style={{ color: 'black', textAlign: 'center' }}>
              Long Valley Entertainment stands as a prominent pillar in the realm of entertainment, with a rich historical legacy that has shaped the company into what it is today. Established with a vision to redefine and elevate the entertainment experience, Long Valley Entertainment has traversed a remarkable journey through time, consistently evolving to meet the ever-changing demands of the industry.
              <br/><br/>
              Rooted in a history that spans decades, Long Valley Entertainment emerged as a response to the growing appetite for innovative and captivating entertainment. From its humble beginnings, the company steadily transformed into a powerhouse, recognized for its exceptional contributions to the world of DJs and event entertainment.
              <br/><br/>
              The company's historical trajectory is marked by groundbreaking initiatives that have redefined industry norms. Long Valley Entertainment introduced a paradigm shift by revolutionizing the way DJs are discovered, booked, and experienced. This innovative approach, fueled by a passion for creating unforgettable moments, has earned the company an esteemed reputation as the go-to destination for those seeking to infuse their events with electrifying energy.
            </CustomParagraph>
          </VerticallyFlexedContainer>
        </PageSizedContainer>
      </FullPageContainer>

    </PageContainer>
  )
}
