import { Helmet } from "react-helmet-async";
import { AdminDashboardContainer, AnEvent, FullPageContainer, HorizontallyFlexedContainer, PageContainer, PageSizedContainer, RowFlexedContainer, RowFlexedContainer2, VerticallyFlexedContainer } from "../../styles/GeneralStyledComponents";
import { useContext, useEffect, useState } from "react";
import { ScrollContext } from "../../App";
import { BsCartCheck, BsCart3 } from "react-icons/bs";
import { FiUsers, FiUserCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/features/bookingSlice";
import { MdLocationPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function UserAccountHome() {
  const { setNotHomePage } = useContext(ScrollContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchOptions, setSearchOptions] = useState({ location: '', djName: ''});

  const changeReportType = ({ currentTarget: input }) => {
    dispatch({ type: 'report/setReportType', payload: input.value });
    navigate("/dash/report-preview");
  }

  useEffect(() => {
    if (window.location.pathname !== '/') {
      setNotHomePage(true);
    }
    dispatch(getAllBookings());
  }, [setNotHomePage, dispatch]);

  const searchBookings = ({currentTarget: input}) => {
    setSearchOptions({ ...searchOptions, location : input.value });
    dispatch({type: 'booking/dynamicSearch', payload: input.value });
  }

  const { listOfBookings, numberOfBookings, searchBookingsResults, listofConfirmedBookings, numberofConfirmedBookings, isLoading } = useSelector(state => state.booking);
  const { listOfDJs, numberOfDJs, numberOfActiveDjs } = useSelector(state => state.user);

  return (
    <PageContainer>
      <Helmet>
        <title>Dashboard - User dashboard</title>
        <meta name="description" content={`User dashboard home page.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: '#f1f1f1', color: 'black' }}>
      <PageSizedContainer style={{ paddingTop: '30px' }}>
          <RowFlexedContainer2 style={{ flexDirection: 'column', justifyContent:'flex-start', alignItems: "center", minHeight: '40vh' }}>
            {isLoading ? <p>Loading...</p> : 
              <>
                <VerticallyFlexedContainer style={{ gap: '20px' }}>
                  
                  <HorizontallyFlexedContainer>
                    <h2>Dashboard</h2>
                    <HorizontallyFlexedContainer style={{ width: '50%', gap: '20px', justifyContent:'flex-end', alignItems:'center'}}>
                      <h4 style={{ fontWeight: '400' }}>Generate reports:</h4>
                      <select name="search" onChange={changeReportType} style={{ fontSize:'100%', color: 'black', backgroundColor: 'white', padding: '8px 12px', border: '1px solid rgba(0,0,0,0.3)', borderRadius:'5px'}}>
                        <option>Choose report</option>
                        <option value={'DJs'}>DJs</option>
                        <option value={'Booking'}>Bookings</option>
                      </select>
                    </HorizontallyFlexedContainer>
                  </HorizontallyFlexedContainer>
                  
                  <AdminDashboardContainer>
                    <div className="first">
                      <div className="inner-stats">
                        <BsCart3 style={{ color: 'blue' }}/>
                        <h3>Bookings</h3>
                        <p>{numberOfBookings}</p>
                      </div>
                    </div>
                    <div className="first">
                      <div className="inner-stats">
                        <BsCartCheck style={{ color: 'green' }}/>
                        <h3>Confirmed booking</h3>
                        <p>{numberofConfirmedBookings}</p>
                      </div>
                    </div>
                    <div className="first">
                      <div className="inner-stats">
                        <FiUsers style={{ color: 'purple' }}/>
                        <h3>Djs</h3>
                        <p>{numberOfDJs}</p>
                      </div>
                    </div>
                    <div className="first">
                      <div className="inner-stats">
                        <FiUserCheck style={{ color: 'orange' }}/>
                        <h3>Active Djs</h3>
                        <p>{numberOfActiveDjs}</p>
                      </div>
                    </div>
                  </AdminDashboardContainer>

                  <HorizontallyFlexedContainer>
                    <h2>Schedules</h2>
                    <HorizontallyFlexedContainer style={{ width: '50%', justifyContent:'flex-end'}}>
                      <input 
                        type='text' 
                        name="search" 
                        placeholder="Search by Location"
                        onChange={searchBookings}
                        style={{ fontSize:'100%', color: 'black', backgroundColor: 'white', padding: '8px 12px', border: '1px solid rgba(0,0,0,0.3)', borderRadius:'5px'}} 
                      />
                    </HorizontallyFlexedContainer>
                  </HorizontallyFlexedContainer>

                  {/* Available bookings  */}

                  {!searchOptions.location && <RowFlexedContainer2 style={{ justifyContent:'flex-start', alignItems: "flex-start", gap: '20px', flexDirection: 'row' }}>
                    {listOfBookings.map((booking, index) => (
                      <AnEvent to={`../bookings/${booking.id}`} key={index}>
                        <div className='picture'
                          style={{ background: "url('/pexels-francesco-paggiaro-2111015.jpg')", backgroundSize: "cover",backgroundOrigin: "initial" }}>
                        </div>
                        <div className='description'>
                          <p><strong>{booking.jobType}</strong></p>
                          <br />
                          <div className='day'>
                            <p className='week-day'>{new Date(booking.startDate).getDay()}</p>
                            <p className='date-time'>{new Date(booking.startDate).toDateString()}</p>
                          </div>
                          <p className='date-time'>
                            {new Date(booking.startDate).toLocaleTimeString()} to {new Date(booking.endDate).toLocaleTimeString()}
                          </p>
                          <div className="location">
                            <strong>Host</strong>
                            <p>{booking.suggestedDjName}</p>
                          </div>
                          <div className="location">
                            <MdLocationPin />
                            <p>{booking.jobLocation}</p>
                          </div>
                        </div>
                      </AnEvent>
                    ))}
                  </RowFlexedContainer2>}

                  {searchOptions.location && <RowFlexedContainer2 style={{ justifyContent:'flex-start', alignItems: "flex-start", gap: '20px', flexDirection: 'row' }}>
                    {searchBookingsResults.map((booking, index) => (
                      <AnEvent to={`../bookings/${booking.id}`} key={index}>
                        <div className='picture'
                          style={{ background: "url('/pexels-francesco-paggiaro-2111015.jpg')", backgroundSize: "cover",backgroundOrigin: "initial" }}>
                        </div>
                        <div className='description'>
                          <p><strong>{booking.jobType}</strong></p>
                          <br />
                          <div className='day'>
                            <p className='week-day'>{new Date(booking.startDate).getDay()}</p>
                            <p className='date-time'>{new Date(booking.startDate).toDateString()}</p>
                          </div>
                          <p className='date-time'>
                            {new Date(booking.startDate).toLocaleTimeString()} to {new Date(booking.endDate).toLocaleTimeString()}
                          </p>
                          <div className="location">
                            <strong>Host</strong>
                            <p>{booking.suggestedDjName}</p>
                          </div>
                          <div className="location">
                            <MdLocationPin />
                            <p>{booking.jobLocation}</p>
                          </div>
                        </div>
                      </AnEvent>
                    ))}
                  </RowFlexedContainer2>}

                </VerticallyFlexedContainer>
              </>
            }
          </RowFlexedContainer2>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
