import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from './redux/features/userSlice';
import { getDjPictures } from './redux/features/jobPicturesSlice';
import { getAllBookings } from './redux/features/bookingSlice';
import ResponseComponent from './components/ResponseComponent';

import PublicPages from './pages/unprotected/index';
import Home from './pages/unprotected/Home';
import AboutUs from './pages/unprotected/AboutUs';
import Djs from './pages/unprotected/Djs';
import DjInfo from './pages/unprotected/DjInfo';
import DjJobDetails from './pages/unprotected/DjJobDetails';
import SearchResults from './pages/unprotected/SearchResults';
import Success from './pages/unprotected/Success';
import Schedules from './pages/unprotected/Schedules';

import Book from './pages/protected/Book';
import MyBookings from './pages/protected/MyBookings';

import AdminAuth from './pages/unprotected/AdminAuth';
import AdminSignInForm from './components/AdminSignInForm';
import AdminSignUpForm from './components/AdminSignUpForm';
import AdminForgotPasswordForm from './components/AdminForgotPasswordForm';
import AdminResetPassword from './components/AdminResetPassword';

import ProtectedPages from './pages/protected/index';
import UserAccountHome from './pages/protected/UserAccountHome';
import UserAccountSettings from './pages/protected/UserAccountSettings';
import BookingDetails from './pages/protected/BookingDetails';
import UpdateJob from './pages/protected/UpdateJob';
import ListOfSchedules from './pages/protected/ListOfSchedules';
import ListOfBookings from './pages/protected/ListOfBookings';
import ResetPassword from './pages/protected/ResetPassword';
import ReportPreview from './pages/protected/ReportPreview';

import DjDetails from './pages/protected/DjDetails';
import AddDj from './pages/protected/AddDJ';
import ListOfDjs from './pages/protected/ListOfDjs';
import ScheduleDetails from './pages/unprotected/ScheduleDetails';

export const ScrollContext = createContext();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    
    dispatch(getAllUsers());
    dispatch(getAllBookings());
    if (user !== null) {
      dispatch(getDjPictures(user.id))
    }
  },[dispatch]);

  const [scrolled, setScrolled] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [notHomePage, setNotHomePage] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', severity: ''});
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setScrolled(true);
      setShowSearchForm(true);
    } else {
      setScrolled(false);
      setShowSearchForm(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollContext.Provider value={{ 
      scrolled, 
      showSearchForm, 
      handleScroll, 
      notHomePage, 
      setNotHomePage,
      open,
      setOpen, 
      handleClose,
      responseMessage, 
      setResponseMessage,
      }}>
      <Router>
        <Routes>
          
          <Route path={'/'} element={<PublicPages />}>
            <Route path={''} element={<Home />}/>
            <Route path={'about'} element={<AboutUs />}/>
            <Route path={'book-now'} element={localStorage.getItem("userTkn") ? <Book /> : <Navigate replace to='/' />} />
            <Route path='success' element={<Success />} />
            <Route path={'djs'} element={<Djs />}/>
            <Route path={'reset-password/:token/:userId'} element={<ResetPassword />}/>
            <Route path={'schedules'} element={<Schedules />}/>
            <Route path='schedules/:scheduleId' element={<ScheduleDetails />} />
            <Route path={'dj/:djId'} element={<DjInfo />}/>
            <Route path={'dj/:djId/:jobId'} element={<DjJobDetails />}/>
            <Route path={'search'} element={<SearchResults />}/>
          </Route>

          <Route path='/admin/auth/' element={<AdminAuth />}>
            <Route path={''} element={<AdminSignInForm />}/>
            <Route path={'signin'} element={<AdminSignInForm />}/>
            <Route path={'signup'} element={<AdminSignUpForm />}/>
            <Route path={'forgot-password'} element={<AdminForgotPasswordForm />}/>
            <Route path={'reset-password/:token/:userId'} element={<AdminResetPassword />}/>
          </Route>

          <Route path='/dash' element={localStorage.getItem("userTkn") ? <ProtectedPages /> : <Navigate replace to='/' />}>
            <Route path='' element={<UserAccountHome />} />
            <Route path='my-bookings' element={<MyBookings />} />
            <Route path='bookings' element={<ListOfBookings />} />
            <Route path='schedules' element={<ListOfSchedules />} />
            <Route path='djs/' element={<ListOfDjs />} />
            <Route path='new-dj/' element={<AddDj />} />
            <Route path='settings' element={<UserAccountSettings />} />
            <Route path='bookings/:id' element={<BookingDetails />} />
            <Route path='djs/:id' element={<DjDetails />} />
            <Route path='my-booking/:id' element={<BookingDetails />} />
            <Route path='report-preview' element={<ReportPreview />} />
            <Route path='update-job/:id' element={<UpdateJob />} />
          </Route>

        </Routes>
      </Router>

      {/* RESPONSE MESSAGE DISPLAYER ****************************************************************************************************************************** */}
      <ResponseComponent 
        message={responseMessage.message} 
        severity={responseMessage.severity}
        open={open} 
        handleClose={handleClose} 
      />
    </ScrollContext.Provider>
  );
}

export default App;