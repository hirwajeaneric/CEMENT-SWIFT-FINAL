import { Helmet } from "react-helmet-async";
import { FullPageContainer, PageContainer, PageSizedContainer, RowFlexedContainer2, RowFlexedContainerForm } from "../../styles/GeneralStyledComponents";
import { useContext, useEffect, useState } from "react";
import { ScrollContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfo } from "../../redux/features/userSlice";
import axios from "axios";
import Endpoints from "../../utils/APIS";
import { Button } from "@mui/material";

const DjDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { setNotHomePage } = useContext(ScrollContext);
  const { setOpen, setResponseMessage } = useContext(ScrollContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (window.location.pathname !== '/') {
      setNotHomePage(true);
    }
    dispatch(getUserInfo(params.id));
  }, [dispatch, params.id, setNotHomePage]);


  const handleUserInfo = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  }

  const { isLoading, selectedUser } = useSelector(state => state.user);

  const updateUser = (userId) => {
    
    setIsProcessing(true);
    let URL = Endpoints.APIS.userApis.updateUserAccount+userId
    axios.put(URL, user)
    .then(response => {
      if (response.status === 200) {
        setIsProcessing(false);
        setResponseMessage({ message: response.data.message , severity: 'success' });
        setOpen(true);
        dispatch({ type: 'user/updateUserInfo', payload: response.data.user});
        setTimeout(() => {
          navigate('/dash/djs')
        }, 2000)
      }
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
        <title>{`DJ Info - ${selectedUser.fullName} - View / Edit dj related information`}</title>
        <meta name="description" content={`View / Edit dj related information.`} /> 
      </Helmet>
      <FullPageContainer style={{ background: '#f1f1f1', color: 'black' }}>
        <PageSizedContainer style={{ paddingTop: '30px' }}>
          <RowFlexedContainer2 style={{ flexDirection: 'column', justifyContent:'flex-start', alignItems: "center", minHeight: '40vh' }}>
            {isLoading ? <p>Loading...</p> : 
              <>
                <h2 style={{ fontWeight: '600', color: '#1b1d21', textAlign: 'left', width: '100%' }}>DJ Details</h2>
                <RowFlexedContainerForm onSubmit={ e => { e.preventDefault(); updateUser(selectedUser._id); }} style={{ background: 'white', padding: '20px', border: '1px solid #cccccc', borderRadius: '5px', marginTop: '20px' }}>
                  <div className="left">
                    <div className="data-container">
                      <p className="description">Name </p>
                      <p className="data">{selectedUser.fullName}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">User Type </p>
                      <p className="data">{selectedUser.userType}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">Email </p>
                      <p className="data">{selectedUser.email}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">Phone </p>
                      <p className="data">{selectedUser.phone}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">Specialities </p>
                      <p className="data">{selectedUser.specialities}</p>
                    </div>
                  </div>
                  <div className="right">
                    <div className="data-container">
                      <p className="description">Description </p>
                      <p className="data">{selectedUser.description}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">Ratings </p>
                      <p className="data">{selectedUser.ratings}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">Status </p>
                      <p className="data">{selectedUser.status}</p>
                    </div>
                    <div className="data-container">
                      <p className="description">Change status </p>
                      <select id='status' name='status' onChange={handleUserInfo} style={{ width: '60%' }}>
                        <option value={''}>Choose Option</option>
                        <option value={'Active'}>Active</option>
                        <option value={'Inactive'}>Inactive</option>  
                      </select> 
                    </div>
                    <div className="data-container" style={{ justifyContent: 'flex-end' }}>
                      { isProcessing ?
                        <Button disabled variant='contained' size='small' type='submit' color='primary'>PROCESSING...</Button>
                        : 
                        <Button variant='contained' size='small' type='submit' color='primary'>Confirm update</Button>
                      }
                    </div>
                  </div>
                </RowFlexedContainerForm>
              </>
            }
          </RowFlexedContainer2>
        </PageSizedContainer>
      </FullPageContainer>
    </PageContainer>
  )
}

export default DjDetails