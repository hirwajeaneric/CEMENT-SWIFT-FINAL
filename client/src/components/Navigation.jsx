import { Link, NavLink, useNavigate } from "react-router-dom";
import { CustomMobileMenu, CustomNavigationBox, DesktopNavigation, MobileSignInSignUpButton, NavigationBarContainer, RightNavigationCommands, SignInSignUpCustomBox, UserIconAndName } from "../styles/GeneralStyledComponents";
import { LiaUserCircleSolid } from 'react-icons/lia';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ScrollContext } from "../App";
import { useContext, useEffect, useState } from "react";
import SearchFormComponent from '../components/SearchFormTwo';
import { Modal } from "@mui/material";
import { Close as CloseMobileIcon, Menu as OpenMobileIcon } from "@mui/icons-material";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import Endpoints from "../utils/APIS";

const style = {
  boxShadow: 24,
  p: 4,
};

export default function Navigation() {
  const { showSearchForm, scrolled, notHomePage } = useContext(ScrollContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => { setAnchorEl(null);};

  const [open, setOpen] = useState(false);
  const [selectedAuthForm, setSelectedAuthForm] = useState('Sign In');
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const handleOpenSignUpModal = () => setOpenSignUpModal(true);
  const handleCloseSignUpModal = () => setOpenSignUpModal(false);

  const handleAuthFormExchange = (form) => setSelectedAuthForm(form);
  const handleBookLinkConditions = () => {
    if (localStorage.getItem('userTkn')) {
      navigate('/book-now')
    } else {
      setOpenSignUpModal(true);
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userInfo')));
  },[])

  const logout = () => {
    localStorage.removeItem('userTkn');
    localStorage.removeItem('userInfo');
    window.location.replace('/');

    if (user.userType === 'Manager') {
      window.location.replace('/admin/auth/signin');
    } else {
      window.location.replace('/');
    }
  }

  return (
    <NavigationBarContainer style={{ backgroundColor: (scrolled || notHomePage) ? 'white' : 'transparent' }}>
      <div className="inner-container">
        
        {/* Logo  */}
        <Link to='/'>
          <h1 style={{ color: 'black', textDecoration: 'none', }}>Cement Swift</h1>
        </Link>
        

        {/* Search form  */}
        {/* {showSearchForm && (
          <SearchFormComponent />
        )} */}


        {/* Desktop navigation bar  */}
        <DesktopNavigation>
          <NavLink to={'/'}>Home</NavLink>
          {/* <NavLink to={'/about'}>About us</NavLink> */}
          <NavLink to={'/djs'}>Shop</NavLink>
          {/* <NavLink to={'/book-now'} onClick={handleBookLinkConditions}>Book now</NavLink> */}
          {/* <NavLink to={'/schedules'}>Schedules</NavLink> */}
          {!localStorage.getItem('userTkn') && <button style={{ color: 'white' }} onClick={handleOpenSignUpModal}><LiaUserCircleSolid />Sign in / Sign up</button>}
          {(localStorage.getItem('userTkn') && user.userType === 'Admin' ) && <NavLink to={'/dash/'}>Dashboard</NavLink>}
          {localStorage.getItem('userTkn') && 
            <div>
              <UserIconAndName aria-controls={openMenu ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={openMenu ? 'true' : undefined} onClick={handleClick}>
                <div className="icon" style={{ background: user.profilePicture !== undefined ? "url('"+Endpoints.APIS.files.profile+user.profilePicture+"')" : "url('/user-icon.png')", backgroundSize: "cover", backgroundOrigin: "initial" }}></div>
              </UserIconAndName>
              <Menu id="basic-menu" anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
                <MenuItem>
                  <div className="icon" style={{ background: "url('/public/pexels-francesco-paggiaro-2111015.jpg')", backgroundSize: "cover",backgroundOrigin: "initial" }}></div>
                  <p>
                    {user.fullName}
                    <br/>
                    <strong style={{ fontSize: '90%', color: 'gray' }}>{user.userType}</strong>
                  </p>
                </MenuItem>
                {user.userType === 'Manager' && <MenuItem onClick={() => {navigate('/dash/'); handleCloseMenu(); }}>Dashboard</MenuItem>}
                <MenuItem onClick={() => {navigate('/dash/settings'); handleCloseMenu();}}>Profile</MenuItem>
                <MenuItem onClick={() => {handleCloseMenu(); logout();}}>Logout</MenuItem>
              </Menu>
            </div>
          }
        </DesktopNavigation>
        

        {/* Menu Icon for mobile devices */}
        <RightNavigationCommands>
          {!localStorage.getItem('userTkn') && 
            <MobileSignInSignUpButton onClick={handleOpenSignUpModal}>
                <LiaUserCircleSolid />Sign in / Sign up
            </MobileSignInSignUpButton>
          }
          <CustomMobileMenu onClick={handleOpen}>
            {open ? <CloseMobileIcon /> :<OpenMobileIcon />}
          </CustomMobileMenu>
        </RightNavigationCommands>


        {/* Mobile Menu */}
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <CustomNavigationBox sx={{ boxShadow: 24, p: 4 }}>
            <NavLink to={'/'} style={{ marginTop: '70px' }} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to={'/djs'} onClick={() => setOpen(false)}>Shop</NavLink>
            {/* <NavLink to={'/book-now'} onClick={() => { setOpen(false); handleBookLinkConditions(); }}>Book now</NavLink> */}
            {/* <NavLink to={'/schedules'} onClick={() => setOpen(false)}>Schedules</NavLink> */}
            {(localStorage.getItem('userTkn') && user.userType === 'Admin' ) && <NavLink to={'/dash/'} onClick={() => setOpen(false)}>Dashboard</NavLink>}
            {localStorage.getItem('userTkn') && <NavLink to={'/dash/settings'} onClick={() => setOpen(false)}>Settings</NavLink>}
            {localStorage.getItem('userTkn') && <button onClick={() => {setOpen(false); logout();}}>Log out</button>}
          </CustomNavigationBox>
        </Modal>
      </div>


      {/* Authentication Modal      */}
      <Modal open={openSignUpModal} onClose={handleCloseSignUpModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <SignInSignUpCustomBox sx={style}>
          <h2 style={{ fontWeight: '600', color: '#1b1d21', textAlign: 'center', width: '100%' }}>{selectedAuthForm}</h2>
          {selectedAuthForm==='Sign In' && <SignInForm setSelectedAuthForm={setSelectedAuthForm} handleAuthFormExchange={handleAuthFormExchange} />}
          {selectedAuthForm==='Sign Up' && <SignUpForm setSelectedAuthForm={setSelectedAuthForm} handleAuthFormExchange={handleAuthFormExchange} />}
          {selectedAuthForm==='Forgot Password' && <ForgotPasswordForm setSelecteAuthForm={setSelectedAuthForm} handleAuthFormExchange={handleAuthFormExchange} />}
        </SignInSignUpCustomBox>
      </Modal>

    </NavigationBarContainer>
  )
}
