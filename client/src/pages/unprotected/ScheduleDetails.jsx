import { Helmet } from "react-helmet-async";
import { FullPageContainer, HeaderOne1, PageContainer, RowFlexedContainer2, PageSizedContainer, VerticallyFlexedContainer, FormElement } from "../../styles/GeneralStyledComponents";
import { MdLocationPin } from "react-icons/md";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { getBookingDetails } from "../../redux/features/bookingSlice";
import { useParams } from "react-router-dom";
import LocationMap from "../../components/LocationMap";

export default function ScheduleDetails() {
  const { setNotHomePage } = useContext(ScrollContext);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (window.location.pathname !== '/' || window.location.pathname !== '') {
      setNotHomePage(true);
    };
    dispatch(getBookingDetails(params.scheduleId))
  }, [setNotHomePage, dispatch]);
  
  const { isLoading,  selectedBooking } = useSelector(state => state.booking)
 
  return (
    <PageContainer>
      <Helmet>
        <title>{`Scheduled event - ${selectedBooking.jobLocation} `}</title>
        <meta name="description" content={`Weekly events and jobs.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: 'white' }}>
        <PageSizedContainer style={{ justifyContent: 'flex-start', minHeight: '70vh'}}>
          <VerticallyFlexedContainer style={{ justifyContent:'flex-start', gap: '20px', alignItems: "flex-start", marginTop:'50px' }}>
            <h2 style={{ fontWeight: '600', color: '#1b1d21', width: '100%' }}>{`Event with ${selectedBooking.suggestedDjName}`}</h2>
            <VerticallyFlexedContainer style={{ justifyContent:'flex-start', alignItems: "flex-start", gap: '20px' }}>
              {isLoading ? <p style={{ color: 'black' }}>Loading...</p> : 
                <>
                  <RowFlexedContainer2>
                    <div className="left">
                      <FormElement style={{ gap: '0px' }}>
                        <label htmlFor="jobLocation">Location</label>
                        <p>{selectedBooking.jobLocation}</p>
                      </FormElement>
                      <FormElement style={{ gap: '0px' }}>
                        <label htmlFor="jobType">DJ Role</label>
                        <p>{selectedBooking.jobType}</p>
                      </FormElement>
                    </div>
                    <div className="right">
                      <FormElement style={{ gap: '0px' }}>
                        <label htmlFor="startDate">Start date</label>
                        <p>{new Date(selectedBooking.startDate).toUTCString()}</p>
                      </FormElement>
                      <FormElement style={{ gap: '0px' }}>
                        <label htmlFor="endDate">End date</label>
                        <p>{new Date(selectedBooking.endDate).toUTCString()}</p>
                      </FormElement>
                    </div>
                  </RowFlexedContainer2>
                  <LocationMap coordinates={selectedBooking.jobGoogleMapLocation}/>

                </>
              }
            </VerticallyFlexedContainer>
          </VerticallyFlexedContainer>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
