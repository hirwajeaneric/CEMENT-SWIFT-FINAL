import { FooterContainer } from '../styles/GeneralStyledComponents';
import { Link } from 'react-router-dom'
import { SiFacebook, SiInstagram } from 'react-icons/si';
import { HiOutlineMail } from 'react-icons/hi';
import { FiTwitter } from 'react-icons/fi';

export default function Footer() {
    return (
        <FooterContainer>
            <div className='inner-footer-container'>
                <div className='top-part'>
                    <div className='left'>
                        <Link to='/'>Home</Link>
                        <Link to='/pricing'>Pricing</Link>
                        <Link to='/djs'>DJs</Link>
                        <Link to='/schedules'>Schedules</Link>
                    </div>
                    <div className='left'>
                        <Link to='/'><HiOutlineMail /></Link>
                        <Link to='/'><SiFacebook /></Link>
                        <Link to='/'><SiInstagram /></Link>
                        <Link to='/'><FiTwitter /></Link>
                    </div>
                </div>
                <div className='bottom-part'>
                    <img src='/fusee-logo-0.png' alt=''/>
                    <p>&copy; {new Date().getFullYear()} Fusee Inc. All rights reserved</p>
                </div>
            </div>
        </FooterContainer>
    )
}