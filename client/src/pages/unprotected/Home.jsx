import { Banner } from "../../styles/BannerStyledComponents";
import { BannerContent, Card1, Card2, CustomParagraph, FullPageContainer, HeaderOne1, PageContainer, PageSizedContainer, RowFlexedContainer } from "../../styles/GeneralStyledComponents";
import SearchFormComponent from '../../components/SearchForm';
import CallToActionButton from "../../components/CallToActionButton";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";
import { useSelector } from "react-redux";
import Endpoints from "../../utils/APIS";
import { useNavigate } from "react-router-dom";


const styles = { 
  background: 'url("Banner_Image_Cement_Swift.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat', 
  backgroundPosition: 'bottom',
  background: 'black'
}

export default function Home() {
  const { setNotHomePage } = useContext(ScrollContext);
  const { isLoading, listOfDJs } = useSelector(state => state.user)

  const navigate = useNavigate();

  useEffect(() => {
    setNotHomePage(false);
  }, [setNotHomePage]);

  return (
    <PageContainer>
      <Helmet>
        <title>Cement Swift - Welcome</title>
        <meta name="description" content={`Welcome to Cement. Get deliveries of the best cement quality.`} /> 
      </Helmet>

      <Banner style={{ background: "url('Banner_Image_Cement_Swift.jpg')", height: '100vh', backgroundSize:'cover'}}>
        <div className="overlay">
          <BannerContent>
            <div className="left">
              <h1>Get access to the best quality cement</h1>
              <h2>Order it and get it delivered to your door</h2>
              <button onClick={() => navigate('/products')}>Order now</button>
            </div>
            <div className="right"></div>
          </BannerContent>
        </div>
      </Banner>



      

    </PageContainer>
  )
}
