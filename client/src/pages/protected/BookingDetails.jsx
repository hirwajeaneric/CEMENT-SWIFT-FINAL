import { Helmet } from "react-helmet-async";
import { FullPageContainer, PageContainer, PageSizedContainer, RowFlexedContainer2, RowFlexedContainerForm } from "../../styles/GeneralStyledComponents";
import { useContext, useEffect, useState } from "react";
import { ScrollContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { getBookingDetails } from "../../redux/features/bookingSlice";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import Endpoints from "../../utils/APIS";

export default function JobDetails() {
  const { setNotHomePage } = useContext(ScrollContext);
  const dispatch = useDispatch();
  const params = useParams();
  const { setOpen, setResponseMessage } = useContext(ScrollContext);
  const [ isProcessing, setIsProcessing ] = useState(false);
  const [ booking, setBooking ] = useState({});
  const [ user, setUser ] = useState({})

  useEffect(() => {
    if (window.location.pathname !== '/') {
      setNotHomePage(true);
    }
    setUser(JSON.parse(localStorage.getItem('userInfo')));
    dispatch(getBookingDetails(params.id));
  }, [dispatch, params.id, setNotHomePage]);
 
  const handleBookingInfo = ({ currentTarget: input }) => {
    setBooking({ ...booking, [input.name]: input.value });
  }

  const { isLoading, selectedBooking } = useSelector(state => state.booking);
  const { listOfDJs } = useSelector(state => state.user);

  const updateBooking = (bookingId) => {
    if (booking.suggestedDjId){
      const dj = listOfDJs.find(dj => dj.id === booking.suggestedDjId);
      booking.suggestedDjName = dj.fullName;
    }

    setIsProcessing(true);
    axios.put(Endpoints.APIS.jobApis.update+bookingId, booking)
    .then(response => {
      setTimeout(() => {
        if (response.status === 200) {
          setIsProcessing(false);
          setResponseMessage({ message: response.data.message , severity: 'success' });
          setOpen(true);
          dispatch({ type: 'booking/updateBookings', payload: response.data.updatedJob});
        }
      }, 3000)
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setIsProcessing(false);
        setResponseMessage({ message: error.response.data.msg, severity:'error'})
        setOpen(true);
      }
    })
  }

  return (
    <PageContainer>
      <Helmet>
        <title>Booking details - View / Edit booking information</title>
        <meta name="description" content={`View / Edit booking information.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: '#f1f1f1', color: 'black' }}>
      <FullPageContainer style={{ background: '#f1f1f1', color: 'black' }}>
        <PageSizedContainer style={{ paddingTop: '30px' }}>
          <RowFlexedContainer2 style={{ flexDirection: 'column', justifyContent:'flex-start', alignItems: "center", minHeight: '40vh', gap: '20px' }}>
            {isLoading ? <p>Loading...</p> : 
              <>
                <h2 style={{ fontWeight: '600', color: '#1b1d21', textAlign: 'left', width: '100%' }}>Booking Details</h2>
                <RowFlexedContainerForm onSubmit={ e => { e.preventDefault(); updateBooking(selectedBooking._id); }} style={{ background: 'white', padding: '20px', border: '1px solid #cccccc', borderRadius: '5px' }}>
                  <div className="left">
                    <div className="data-container">
                      <p className="description">Description </p>
                      <p className="data">{selectedBooking.description}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">Job Type </p>
                      <p className="data">{selectedBooking.jobType}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">Job Location </p>
                      <p className="data">{selectedBooking.jobLocation}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">Google Maps Location </p>
                      <p className="data">{selectedBooking.jobGoogleMapLocation}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">Start Date </p>
                      <p className="data">{selectedBooking.startDate}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">End Date </p>
                      <p className="data">{selectedBooking.endDate}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">Requesting User Type </p>
                      <p className="data">{selectedBooking.requestingUserType}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">Requesting Company </p>
                      {selectedBooking.requestingUserType === 'Company' && !selectedBooking.requestingCompanyName && <p style={{ fontSize: '80%', color: 'grey' }}>Not provided</p>}
                      {selectedBooking.requestingCompanyName && <p className="data">{selectedBooking.requestingCompanyName}</p>}
                    </div>
                    <div className="data-container">
                      <p className="description">Requesting user </p>
                      <p className="data">{selectedBooking.requestingUserName}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">Requesting user phone</p>
                      <p className="data">{selectedBooking.requestingUserPhone}</p>
                    </div>
                  </div>
                  <div className="right">
                    <div className="data-container">
                      <p className="description">Requesting user email </p>
                      <p className="data">{selectedBooking.requestingUserEmail}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">Paid </p>
                      <p className="data">{selectedBooking.paymentInstallment && 'Yes'}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">Send Date </p>
                      <p className="data">{new Date(selectedBooking.sendDate).toLocaleString()}</p>
                    </div>
                    {selectedBooking.suggestedDjName && 
                      <div className="data-container">
                        <p className="description">Assigned DJ </p>
                        <p className="data">{selectedBooking.suggestedDjName}</p>
                      </div>
                    }
                    <div className="data-container">
                      <p className="description">Status </p>
                      <p className="data">{selectedBooking.status}</p>
                    </div>
                    {user.userType !== 'DJ' && 
                      <>
                        <div className="data-container">
                          <p className="description">Change status </p>
                          <select id='status' name='status' onChange={handleBookingInfo} style={{ width: '60%' }}>
                            <option value={''}>Choose Option</option>
                            <option value={'Confirmed'}>Confirm</option>
                            <option value={'Rejected'}>Reject</option>  
                          </select> 
                        </div>
                        <div className="data-container">
                          <p className="description">Choose DJ</p>
                          <select id='status' name='suggestedDjId' onChange={handleBookingInfo} style={{ width: '60%' }}>
                            <option value={''}>Choose a DJ</option>
                            {listOfDJs && listOfDJs.map((dj, index) => 
                              <option key={index} value={dj.id}>{dj.fullName}</option>)
                            }  
                          </select>
                        </div>
                        <div className="data-container" style={{ justifyContent: 'flex-end' }}>
                          { isProcessing ?
                            <Button disabled variant='contained' size='small' type='submit' color='primary'>PROCESSING...</Button>
                            : 
                            <Button variant='contained' size='small' type='submit' color='primary'>Confirm</Button>
                          }
                        </div>
                      </>
                    }
                  </div>
                </RowFlexedContainerForm>
              </>
            }
          </RowFlexedContainer2>
        </PageSizedContainer>
      </FullPageContainer>
      </FullPageContainer>
    </PageContainer>
  )
}