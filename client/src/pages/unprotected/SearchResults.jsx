import { Helmet } from "react-helmet-async";
import { AnEvent, Card2, FullPageContainer, PageContainer, PageSizedContainer, RowFlexedContainer2 } from "../../styles/GeneralStyledComponents";
import { MdLocationPin } from "react-icons/md";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";
import SearchForm from "../../components/SearchForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Endpoints from "../../utils/APIS";

export default function Schedules() {
  const { setNotHomePage } = useContext(ScrollContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname !== '/' || window.location.pathname !== '') {
      setNotHomePage(true);
    }
  }, [setNotHomePage]);

  const { listOfBookings, searchBookingsResults, numberOfBookingsResults } = useSelector(state => state.booking);
  const { listOfDJs, searchUserResults, numberOfUserResults } = useSelector(state => state.user);

  return (
    <PageContainer>
      <Helmet>
        <title>Search results</title>
        <meta name="description" content={`Search results of schedules and djs.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: 'white' }}>
        <PageSizedContainer>
          <RowFlexedContainer2 style={{ justifyContent:'flex-start', alignItems: "flex-start", marginTop:'50px', flexDirection: 'column' }}>
            <RowFlexedContainer2 style={{ justifyContent:'center', alignItems: "center", flexDirection: 'column', marginBottom:'20px' }}>
              <SearchForm />
            </RowFlexedContainer2>
            <RowFlexedContainer2 style={{ justifyContent:'flex-start', alignItems: "flex-start", marginTop:'20px', flexDirection: 'column' }}>
              <RowFlexedContainer2 style={{ color: '#1b1d21', justifyContent: 'flex-start', gap: '30px' }}>
                <h2>Search Results</h2>
                <p style={{ color: 'gray' }}>Found: {numberOfBookingsResults} location(s)</p>
                <p style={{ color: 'gray' }}>Found: {numberOfUserResults} dj(s)</p>
              </RowFlexedContainer2>
              <RowFlexedContainer2 style={{ flexDirection: 'column', justifyContent:'flex-start', gap: '30px', alignItems: "flex-start", marginTop:'20px' }}>
                
                {searchUserResults.length === 0 && <RowFlexedContainer2 style={{ justifyContent:'flex-start', alignItems: "flex-start", gap: '20px', flexDirection: 'row' }}>
                  {listOfDJs && listOfDJs.map((dj, index) => {
                    
                    if (dj.status === 'Active') {
                      return (<></>); 
                    }

                    return (
                      <Card2 onClick={() => { navigate(`/dj/${dj.id}`)}} key={index}>
                        {dj.profilePicture !== undefined 
                          ? 
                          <div className="image-card" style={{ background: `url('${Endpoints.APIS.files.profile+dj.profilePicture}')`, backgroundSize: "cover", backgroundOrigin: "initial" }}></div> 
                          :
                          <div className="image-card" style={{ background: "url('user-icon.png')", backgroundSize: "cover", backgroundOrigin: "initial" }}></div>
                        }
                        <p className="description">{dj.fullName}</p>
                      </Card2>
                    )
                  })}
                </RowFlexedContainer2>}
                
                {searchUserResults.length !== 0 && <RowFlexedContainer2 style={{ justifyContent:'flex-start', alignItems: "flex-start", gap: '20px', flexDirection: 'row' }}>
                  {searchUserResults && searchUserResults.map((dj, index) => {
                    
                    if (dj.status !== 'Active') {
                      return (<></>);
                    }
                    
                    return (
                      <Card2 onClick={() => { navigate(`/dj/${dj.id}`)}} key={index}>
                        {dj.profilePicture !== undefined 
                          ? 
                          <div className="image-card" style={{ background: `url('${Endpoints.APIS.files.profile+dj.profilePicture}')`, backgroundSize: "cover", backgroundOrigin: "initial" }}></div> 
                          :
                          <div className="image-card" style={{ background: "url('user-icon.png')", backgroundSize: "cover", backgroundOrigin: "initial" }}></div>
                        }
                        <p className="description">{dj.fullName}</p>
                      </Card2>
                    )
                  })}
                </RowFlexedContainer2>}


                
                {/* Bookings  */}
                {searchBookingsResults.length === 0 && <RowFlexedContainer2 style={{ justifyContent:'flex-start', alignItems: "flex-start", gap: '20px', flexDirection: 'row' }}>
                  {listOfBookings.map((booking, index) => (
                    <AnEvent key={index}>
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
                </RowFlexedContainer2>}

                {searchBookingsResults.length !== 0 && <RowFlexedContainer2 style={{ justifyContent:'flex-start', alignItems: "flex-start", gap: '20px', flexDirection: 'row' }}>
                  {searchBookingsResults.map((booking, index) => (
                    <AnEvent key={index}>
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
                </RowFlexedContainer2>}
              </RowFlexedContainer2>
              
            </RowFlexedContainer2>
          </RowFlexedContainer2>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
