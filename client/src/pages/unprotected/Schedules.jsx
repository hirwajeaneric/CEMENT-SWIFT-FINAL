import { Helmet } from "react-helmet-async";
import { AnEvent, FullPageContainer, HeaderOne1, PageContainer, RowFlexedContainer2, PageSizedContainer } from "../../styles/GeneralStyledComponents";
import { MdLocationPin } from "react-icons/md";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/features/bookingSlice";

export default function Schedules() {
  const { setNotHomePage } = useContext(ScrollContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.pathname !== '/' || window.location.pathname !== '') {
      setNotHomePage(true);
    };
    dispatch(getAllBookings());
  }, [setNotHomePage, dispatch]);

  const { listofConfirmedBookings, isLoading } = useSelector(state => state.booking);
  
  return (
    <PageContainer>
      <Helmet>
        <title>Schedules - Our weekly events</title>
        <meta name="description" content={`Weekly events and jobs.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: 'white' }}>
        <PageSizedContainer style={{ justifyContent: 'flex-start', minHeight: '70vh'}}>
          <RowFlexedContainer2 style={{ justifyContent:'flex-start', gap: '30px', alignItems: "flex-start", marginTop:'50px', flexDirection: 'column' }}>
          <HeaderOne1 style={{ fontWeight: '600', color: '#1b1d21', width: '100%' }}>Weekly Schedule</HeaderOne1>
            <RowFlexedContainer2 style={{ justifyContent:'flex-start', alignItems: "flex-start", gap: '20px', flexDirection: 'row' }}>
              {isLoading ? <p style={{ color: 'black' }}>Loading...</p> : 
                <>
                  {listofConfirmedBookings.map((booking, index) => (
                    <AnEvent 
                      to={(booking.jobType === 'Club' || booking.jobType === 'Concert' || booking.jobType === 'Public meeting sound system' || booking.jobType === 'Event Management') ? `/schedules/${booking.id}` : '#'} key={index}>
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
                          <p>{(booking.jobType !== 'Concert' && booking.jobType !== 'Club' && booking.jobType !== 'Public meeting sound system') ? 'Private'  : booking.jobLocation}</p>
                        </div>
                      </div>
                    </AnEvent>
                  ))}
              </>
              }
            </RowFlexedContainer2>
          </RowFlexedContainer2>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
