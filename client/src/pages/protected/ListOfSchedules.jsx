import { Helmet } from "react-helmet-async";
import { FullPageContainer, PageContainer, PageSizedContainer, RowFlexedContainer, RowFlexedContainer2 } from "../../styles/GeneralStyledComponents";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/features/bookingSlice";
import ScheduleTable from "../../components/tables/ScheduleTable";

export default function ListOfSchedules() {
  const { setNotHomePage } = useContext(ScrollContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.pathname !== '/') {
      setNotHomePage(true);
    }
    dispatch(getAllBookings());
  }, [setNotHomePage, dispatch]);

  const { listofConfirmedBookings, isLoading } = useSelector(state => state.booking);

  return (
    <PageContainer>
      <Helmet>
        <title>Scheduled jobs - List of all scheduled jobs</title>
        <meta name="description" content={`List of all scheduled jobs.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: '#f1f1f1', color: 'black' }}>
        <PageSizedContainer style={{ paddingTop: '30px' }}>
          <RowFlexedContainer2 style={{ flexDirection: 'column', justifyContent:'flex-start', alignItems: "center", minHeight: '40vh' }}>
            {isLoading ? <p>Loading...</p> : 
              <>
                <h2 style={{ fontWeight: '600', color: '#1b1d21', textAlign: 'left', width: '100%' }}>Scheduled jobs</h2>
                <ScheduleTable data={listofConfirmedBookings} />
              </>
            }
          </RowFlexedContainer2>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
