import { Helmet } from "react-helmet-async";
import { FullPageContainer, PageContainer, PageSizedContainer, RowFlexedContainer2 } from "../../styles/GeneralStyledComponents";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";
import BookingsTable from "../../components/tables/BookingsTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/features/bookingSlice";

export default function ListOfBookings() {
  const { setNotHomePage } = useContext(ScrollContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.pathname !== '/') {
      setNotHomePage(true);
    }
    dispatch(getAllBookings());
  }, [setNotHomePage, dispatch]);

  const { listOfBookings, isLoading } = useSelector(state => state.booking);

  return (
    <PageContainer>
      <Helmet>
        <title>Bookings - List of all available bookings</title>
        <meta name="description" content={`List of all available bookings.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: '#f1f1f1', color: 'black' }}>
        <PageSizedContainer style={{ paddingTop: '30px' }}>
          <RowFlexedContainer2 style={{ flexDirection: 'column', justifyContent:'flex-start', alignItems: "center", minHeight: '40vh' }}>
            {isLoading ? <p>Loading...</p> : 
              <>
                <h2 style={{ fontWeight: '600', color: '#1b1d21', textAlign: 'left', width: '100%' }}>Bookings</h2>
                <BookingsTable data={listOfBookings} />
              </>
            }
          </RowFlexedContainer2>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
