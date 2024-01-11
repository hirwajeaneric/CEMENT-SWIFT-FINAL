import { Banner } from "../../styles/BannerStyledComponents";
import { HeaderOne1, PageContainer, PageSizedContainer, } from "../../styles/GeneralStyledComponents";
import SearchFormComponent from '../../components/SearchForm';
import { Helmet } from "react-helmet-async";
import SignInForm from "../../components/SignInForm";
import { Outlet } from "react-router-dom";

const styles1 = { 
  background: 'url("/pexels-mikky-k-625644.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat', 
  backgroundPosition: 'bottom',
  height: '100vh',
}

const styles2 = { 
  background: 'url("/pexels-pixabay-164907.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat', 
  backgroundPosition: 'bottom',
}

export default function AdminAuth() {
  return (
    <PageContainer style={{ height: '100vh' }}>
      <Banner style={styles1}>
        <div className="overlay" style={{ height: '100vh', }}>
          <Outlet />
        </div>
      </Banner>
    </PageContainer>
  )
}
