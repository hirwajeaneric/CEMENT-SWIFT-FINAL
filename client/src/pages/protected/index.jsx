import { NavLink, Outlet } from 'react-router-dom'
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { BodySections, FullPageContainer, PageSizedContainer } from '../../styles/GeneralStyledComponents';
import UserAccountMenuBar from '../../components/UserAccountMenuBar';
import { useState, useEffect } from 'react';
import { getAllBookings } from '../../redux/features/bookingSlice';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../redux/features/userSlice';

export default function ProtectedPages() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userInfo')));
    console.log((JSON.parse(localStorage.getItem('userInfo')).userType === 'DJ' || JSON.parse(localStorage.getItem('userInfo')).userType === 'Personal' || JSON.parse(localStorage.getItem('userInfo')).userType == 'Company'));
    
    dispatch(getAllBookings());
    dispatch(getAllUsers());
  },[dispatch])

  return (
    <FullPageContainer>
      <Navigation />
      <BodySections>
        {!(user.userType !== 'DJ' || user.userType !== 'Personal' || user.userType !== 'Company') && <UserAccountMenuBar />}
        {user.userType === 'Manager' && <UserAccountMenuBar />}
        {(user.userType === 'DJ' || user.userType === 'Personal' || user.userType === 'Company') && <div style={{ marginTop:'80px' }}></div>}
        <PageSizedContainer style={{ padding: "80px 0px", display:'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap:"10px"  }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '30%'}}>
            <div style={{ display: 'flex', gap: '20px'}}>
              
            </div>
            <NavLink to="dash">Personal information</NavLink>
            <NavLink to="purchases">My purchases</NavLink>
            <NavLink to="orders">My orders</NavLink>
            <button>Logout</button>
          </div>
          <div style={{width: '650%'}}>
            <Outlet />
          </div>
        </PageSizedContainer>   
        <Footer />
      </BodySections>
    </FullPageContainer> 
  );
}