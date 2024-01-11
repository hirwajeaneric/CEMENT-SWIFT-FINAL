import { Helmet } from "react-helmet-async";
import { FullPageContainer, PageContainer, PageSizedContainer, RowFlexedContainer2 } from "../../styles/GeneralStyledComponents";
import { useContext, useEffect } from "react";
import { ScrollContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import DJsTable from "../../components/tables/DJsTable";
import { getAllUsers } from "../../redux/features/userSlice";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ListOfDjs() {
  const { setNotHomePage } = useContext(ScrollContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname !== '/') {
      setNotHomePage(true);
    }
    dispatch(getAllUsers());
  }, [setNotHomePage, dispatch]);

  const { listOfDJs, isLoading } = useSelector(state => state.user);

  return (
    <PageContainer>
      <Helmet>
        <title>List of DJs - List of all available djs</title>
        <meta name="description" content={`List of all available bookings.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: '#f1f1f1', color: 'black' }}>
      <PageSizedContainer style={{ paddingTop: '30px' }}>
          <RowFlexedContainer2 style={{ flexDirection: 'column', justifyContent:'flex-start', alignItems: "center", minHeight: '40vh' }}>
            {isLoading ? <p>Loading...</p> : 
              <>
                {/* Title  */}
                <RowFlexedContainer2>
                  <h2 style={{ fontWeight: '600', color: '#1b1d21', textAlign: 'left', width: '100%' }}>Lisf of DJs</h2>
                  <Button variant='contained' color='success' size='small' onClick={() => { navigate('/dash/new-dj'); }}>Add</Button>
                </RowFlexedContainer2>
                {/* Table of DJS  */}
                <DJsTable data={listOfDJs} />
              </>
            }
          </RowFlexedContainer2>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}
