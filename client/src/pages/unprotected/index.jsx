import { Outlet } from 'react-router-dom'
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { BodySections, FullPageContainer } from '../../styles/GeneralStyledComponents';

export default function PublicPages() {
    return (
        <FullPageContainer>
            <Navigation />
            <BodySections>
                <Outlet />   
                <Footer />
            </BodySections>
        </FullPageContainer> 
    );
}