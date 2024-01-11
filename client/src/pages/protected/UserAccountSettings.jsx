import { Helmet } from "react-helmet-async";
import { DjProfilePicture, DjBasicInfo, FullPageContainer,RowFlexedContainer2, GalleryForm, ProfilePictureForm, AnEvent, HeaderOne1, PageContainer, PageSizedContainer, CustomButtonTwo, RowFlexedContainerForm, FormInputsContainer, CustomImageDetailsBox, RatingsContainer } from "../../styles/GeneralStyledComponents";
import { useContext, useEffect, useState } from "react";
import { ScrollContext } from "../../App";
import { MdLocationPin } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/features/userSlice";
import { useParams } from "react-router-dom";
import Endpoints from "../../utils/APIS";
import axios from "axios";
import { getDjPictures, getPictureDetails } from "../../redux/features/jobPicturesSlice";
import { Modal, Rating } from "@mui/material";
import { getMyBookings } from "../../redux/features/bookingSlice";
import { getDJRatings } from "../../redux/features/ratingSlice";

export default function DjInfo() {
  const { setNotHomePage } = useContext(ScrollContext);
  const dispatch = useDispatch();
  const params = useParams();
  const { setOpen, setResponseMessage, ...other } = useContext(ScrollContext);
  
  // Picture details popup states
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Form processing and message display
  const [isProcessing1, setIsProcessing1] = useState(false);
  const [isProcessing2, setIsProcessing2] = useState(false);
  const [isProcessing3, setIsProcessing3] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [localUserInfo, setLocalUserInfo] = useState({});
  const [profilePicture, setProfilePicture] = useState("");
  
  const [editable, setEditable] = useState(false);

  const [jobPictureData, setJobPictureData] = useState({});
  const [jobPictureFile, setJobPictureFile] = useState("");
  const [jobPictureErrors, setJobPictureErrors] = useState({});

  const resetJobPicureFields = () => {
    setJobPictureData({});
    setJobPictureErrors({});
    setJobPictureFile("");
  }

  useEffect(() => {
    setLocalUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    
    const user = JSON.parse(localStorage.getItem('userInfo'));

    axios.get(Endpoints.APIS.userApis.findById+user.id)
    .then(response => {
      setUserInfo(response.data.user);
    })
    .catch(error => console.error(error))

    dispatch(getUserInfo(user.id));
    dispatch(getDjPictures(user.id));
    dispatch(getMyBookings(user.id));
    dispatch(getDJRatings(user.id));

    if (window.location.pathname !== '/' || window.location.pathname !== '') {
      setNotHomePage(true);
    }
  }, [dispatch, localUserInfo.id, params.djId, setNotHomePage]);


  // INPUT HANDLERS
  const handleProflePicture = (e) => {
    setProfilePicture(e.target.files[0]);
  }

  const handleUserFormInputs = ({ currentTarget: input }) => {
    setUserInfo({ ...userInfo, [input.name]: input.value });
  }

  const handleJobPictureInputs = ({ currentTarget: input }) => {
    setJobPictureData({ ...jobPictureData, [input.name]: input.value });
    if (jobPictureData.name !== '') {
      setJobPictureErrors({ ...jobPictureErrors, name: ''})
    } else if (jobPictureData.pictureDescription !== '') {
      setJobPictureErrors({ ...jobPictureErrors, pictureDescription: ''})
    }
  }

  const handleJobPictureFile = (e) => {
    setJobPictureFile(e.target.files[0]);
    if (jobPictureFile !== '') {
      setJobPictureErrors({ ...jobPictureErrors, picture: ''})
    }
  }


  // SUBMIT HANDLERS
  const updateUserInfo = (e) => {
    e.preventDefault();

    var config = {};

    if (profilePicture !== '' && profilePicture !== undefined) {
      config = {
        headers: { "Content-Type":"multipart/form-data" }
      };
      userInfo.profilePicture = profilePicture;
    } else {
      config = {}
    }

    delete userInfo._id;
    delete userInfo.__v;

    console.log(userInfo);

    setIsProcessing1(true);

    axios.put(Endpoints.APIS.userApis.updateUserAccount+localUserInfo.id, userInfo, config)
    .then(response => {
      setTimeout(() => {
        if (response.status === 200) {
          setIsProcessing1(false);
          localStorage.setItem('userInfo', JSON.stringify(response.data.user));
          setResponseMessage({ message: response.data.message , severity: 'success' });
          setOpen(true);
          dispatch(getUserInfo(localUserInfo.id));
          setEditable(false);
        }
      }, 3000)
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setIsProcessing1(false);
        setResponseMessage({ message: error.response.data.msg, severity:'error'})
        setOpen(true);
      }
    })
  }


  // UPLOAD A JOB PICTURE
  const addJobPicture = (e) => {
    e.preventDefault();
    
    jobPictureData.djId = localUserInfo.id;
    jobPictureData.picture = jobPictureFile;

    var config = {
      headers: { "Content-Type":"multipart/form-data" }
    };

    if (!jobPictureFile) {
      setJobPictureErrors({...jobPictureErrors, picture: 'Picture is required'})
      return;
    } else if (!jobPictureData.name) {
      setJobPictureErrors({...jobPictureErrors, name: 'Picture label is required'})
      return;
    } else if (!jobPictureData.pictureDescription) {
      setJobPictureErrors({...jobPictureErrors, pictureDescription: 'Picture description is required'})
      return;
    } else {

      console.log(jobPictureData);

      setIsProcessing3(true);

      axios.post(Endpoints.APIS.jobPicturesApis.add, jobPictureData, config)
      .then(response => {
        setTimeout(() => {
          if (response.status === 201) {
            setIsProcessing3(false);
            setResponseMessage({ message: response.data.message , severity: 'success' });
            setOpen(true);
            resetJobPicureFields();
            dispatch(getDjPictures(localUserInfo.id));
            setEditable(false);
          }
        }, 3000)
      })
      .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setIsProcessing3(false);
          setResponseMessage({ message: error.response.data.msg, severity:'error'})
          setOpen(true);
        }
      })
    }
  }


  // REQUEST FOR PASSWORD RESET
  const requestPasswordUpdate = (e) => {
    e.preventDefault();

    setIsProcessing2(true);

    axios.post(Endpoints.APIS.userApis.requestPasswordReset, { email: userInfo.email})
    .then(response => {
      setTimeout(() => {
        if (response.status === 200) {
          setIsProcessing2(false);
          setResponseMessage({ message: response.data.message , severity: 'success' });
          setOpen(true);
          setTimeout(() => {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('userTkn');
            window.location.replace('/');
          },2000)
        }
      }, 3000)
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setIsProcessing2(false);
        setResponseMessage({ message: error.response.data.msg, severity:'error'})
        setOpen(true);
      }
    })
  }


  // STORE DATA
  const { isLoading, selectedUser } = useSelector(state => state.user);
  const { listOfJobPictures, selectedPicture } = useSelector(state => state.jobPicture);
  const { listOfADjsBookings } = useSelector(state => state.booking);
  const { calculatedDjRating } = useSelector(state => state.rating)

  return (
    <PageContainer>
      <Helmet>
        <title>{`${selectedUser.fullName} - A DJ at Fusee.com`}</title>
        <meta name="description" content={`Dj information.`} /> 
      </Helmet>
      
      <FullPageContainer style={{ background: '#f1f1f1', color: 'black' }}>
        <PageSizedContainer>
          {isLoading ? 
          <p style={{ color: 'black', height: '80svh' }}>Loading ...</p>
          :
          <>
            <RowFlexedContainerForm onSubmit={updateUserInfo} style={{ gap: '30px' }}>
              <ProfilePictureForm>
                <DjProfilePicture style={{ background: selectedUser.profilePicture !== undefined ? "url('"+Endpoints.APIS.files.profile+selectedUser.profilePicture+"')" : "url('/user-icon.png')", backgroundSize: "cover", backgroundOrigin: "initial" }}></DjProfilePicture>
                {editable && 
                  <FormInputsContainer>
                    <label htmlFor="fullName">Upload profile</label>
                    <input type="file" name='profilePicture' id="profilePicture" onChange={handleProflePicture}/>
                  </FormInputsContainer>
                }
              </ProfilePictureForm>
              <DjBasicInfo>
                {!editable && <HeaderOne1 style={{ fontWeight: '600', color: '#1b1d21', textAlign: 'left' }}>{selectedUser.fullName}</HeaderOne1>}
                {!editable && <h2 style={{ color: 'gray', fontWeight: '600', fontSize: '140%' }}>{selectedUser.alias}</h2>}
                {!editable && 
                  <RatingsContainer>
                    <div className="ratings">
                      <Rating name="read-only" value={calculatedDjRating} readOnly />
                      <span>{calculatedDjRating}</span>
                    </div>
                  </RatingsContainer>
                }
                {!editable && <p><strong>Starting price: </strong>$ {selectedUser.startingPrice}</p>}
                {!editable && <p><strong>Email: </strong>{selectedUser.email}</p>}
                {!editable && <p><strong>Phone: </strong>{selectedUser.phone}</p>}

                {editable && 
                  <FormInputsContainer>
                    <label htmlFor="fullName">Full name</label>
                    <input type="text" name='fullName' value={userInfo.fullName || ''} id="fullName" onChange={handleUserFormInputs} placeholder='Full name' />
                  </FormInputsContainer>  
                }

                {editable && (userInfo.userType === 'DJ') &&
                  <FormInputsContainer>
                    <label htmlFor="alias">Alias / Work name</label>
                    <input type="text" name='alias' value={userInfo.alias || ''} id="alias" onChange={handleUserFormInputs} placeholder='Alias / Work name' />
                  </FormInputsContainer>  
                }

                {editable && 
                  <FormInputsContainer>
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name='phone' value={userInfo.phone || ''} id="phone" onChange={handleUserFormInputs} placeholder='Phone' />
                  </FormInputsContainer>  
                }

                {editable && 
                  <FormInputsContainer>
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' value={userInfo.email || ''} id="email" onChange={handleUserFormInputs} placeholder='Email' />
                  </FormInputsContainer>  
                }

                {editable && 
                  <FormInputsContainer>
                    <label htmlFor="startingPrice">Starting price</label>
                    <input type="number" name='startingPrice' value={userInfo.startingPrice || ''} id="startingPrice" onChange={handleUserFormInputs} placeholder='Starting price' />
                  </FormInputsContainer>  
                }

                {editable && (userInfo.userType === 'Personal' || userInfo.userType === 'Company') && 
                  <FormInputsContainer>
                    <label htmlFor="companyName">Company</label>
                    <input type="text" name='companyName' value={userInfo.companyName || ''} id="companyName" onChange={handleUserFormInputs} placeholder='Company name' />
                  </FormInputsContainer>  
                }
                
                {editable && (userInfo.userType === 'Personal' || userInfo.userType === 'Company') &&
                  <FormInputsContainer>
                    <label htmlFor="companyDescription">Company Description</label>
                    <textarea type="text" name='companyDescription' rows={'5'} value={userInfo.companyDescription || ''} id="companyDescription" onChange={handleUserFormInputs} placeholder="Company Descriptions"></textarea>
                  </FormInputsContainer>  
                }

                {!editable && selectedUser.specialities && 
                  <div>
                    <h3 style={{ fontWeight: '600', fontSize: '120%' }}>Specialized in</h3>
                    <p style={{ fontWeight: '500', color: 'grey' }}>{selectedUser.specialities}</p>
                  </div>
                }

                {editable && (userInfo.userType === 'DJ') &&
                  <FormInputsContainer>
                    <label htmlFor="specialities">Specialities</label>
                    <input type="text" name='specialities' value={userInfo.specialities || ''} id="specialities" placeholder="Specialities" onChange={handleUserFormInputs}/>
                    <p>Separate by comma: Ex: DJ, Sound system</p>
                  </FormInputsContainer>
                }
                
                {!editable && <p className="description">{selectedUser.description}</p>}
                
                {editable && (userInfo.userType === 'DJ') &&
                  <FormInputsContainer>
                    <label htmlFor="description">Description</label> 
                    <textarea type="text" name='description' rows={'5'} value={userInfo.description || ''} id="description" onChange={handleUserFormInputs} placeholder="Description"></textarea>
                  </FormInputsContainer>
                }
                
                {editable && 
                  <RowFlexedContainer2 style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <CustomButtonTwo variant="contained" color="success" size="small" type="submit">{isProcessing1 ? "Processing..." :"Confirm Changes"}</CustomButtonTwo>
                  </RowFlexedContainer2>
                }
                <RowFlexedContainer2 style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '10px' }}>
                  <CustomButtonTwo variant='contained' size="small" color="info" onClick={() => {setEditable(!editable);}}>{editable ? "Cancel" : "Edit"}</CustomButtonTwo>
                </RowFlexedContainer2>
              </DjBasicInfo>
            </RowFlexedContainerForm>
            


            {/* Request for password reset  */}
            <RowFlexedContainer2 style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '20px' }}>
              <CustomButtonTwo variant='contained' size="small" color='secondary' onClick={requestPasswordUpdate}>{isProcessing2 ? "Processing..." :"Reset password"}</CustomButtonTwo>
            </RowFlexedContainer2>




            {/* DJ's gallery  */}
            
            {localUserInfo.userType === 'DJ' &&  
              <>
                <RowFlexedContainer2 style={{ flexDirection: 'column', justifyContent:'flex-start', gap: '20px', alignItems: "flex-start", marginTop:'40px' }}>
                  <h2 style={{ color: 'gray', fontWeight: '600', fontSize: '140%', margin: '0px', padding: '0px'}}>Gallery</h2>
                  
                  {/* Add picture form */}
                  <GalleryForm onSubmit={addJobPicture}>
                    <h3 style={{ fontWeight: '500' }}>Add picture</h3>
                    <div className='form-container'>
                      <div className='input-container'>
                        <label htmlFor="picture">Upload picture</label> 
                        <input type="file" name='picture' id="picture" onChange={handleJobPictureFile} />
                        {jobPictureErrors.picture && <p>{jobPictureErrors.picture}</p>}
                      </div>
                      <div className='input-container'>
                        <label htmlFor="name">Name on picture</label> 
                        <input type="text" name='name' value={jobPictureData.name || ''} id="name" placeholder="Name on picture" onChange={handleJobPictureInputs} />
                        {jobPictureErrors.name && <p>{jobPictureErrors.name}</p>}
                      </div>
                      <div className='input-container'>
                        <label htmlFor="pictureDescription">Description</label> 
                        <textarea type="text" name='pictureDescription' rows={'3'} value={jobPictureData.pictureDescription || ''} id="description" placeholder="Description" onChange={handleJobPictureInputs}></textarea>
                        {jobPictureErrors.pictureDescription && <p>{jobPictureErrors.pictureDescription}</p>}
                      </div>
                    </div>
                    <div className='command-button'>
                      <CustomButtonTwo type="submit" variant='contained' size="small" color="success">{isProcessing3 ? "Processing..." :"Add"}</CustomButtonTwo>
                    </div>
                  </GalleryForm>


                  <RowFlexedContainer2 style={{ justifyContent:'flex-start', alignItems: "flex-start", gap: '20px', marginTop: '20px', flexDirection: 'row' }}>
                    {!listOfJobPictures && <p>No pictures yet</p>}
                    {listOfJobPictures && listOfJobPictures.map((element, index) => {
                      return (
                        <AnEvent key={index} onClick={() => {handleOpenModal(); dispatch(getPictureDetails(element._id))}}>
                          <div className='picture' style={{ background: "url('"+Endpoints.APIS.files.pictures+element.picture+"')", backgroundSize: "cover", backgroundOrigin: "initial", }}></div>
                        </AnEvent>
                      )
                    })}
                  </RowFlexedContainer2>
                </RowFlexedContainer2>
            
                {/* DJs assigned events  */}
                {listOfADjsBookings.length !== 0 && <RowFlexedContainer2 style={{ flexDirection: 'column', justifyContent:'flex-start', gap: '30px', alignItems: "flex-start", marginTop:'50px' }}>
                  <h2 style={{ color: 'gray', fontWeight: '600', fontSize: '140%' }}>Your events</h2>
                  <RowFlexedContainer2 style={{ justifyContent:'flex-start', alignItems: "flex-start", gap: '20px', flexDirection: 'row' }}>
                    {listOfADjsBookings.map((booking, index) => (
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

                  </RowFlexedContainer2>
                </RowFlexedContainer2>}
              </>
            }
          </>
          }
        </PageSizedContainer>
      </FullPageContainer>
        
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <CustomImageDetailsBox>
          <div className='image-container' style={{ background: "url('"+Endpoints.APIS.files.pictures+selectedPicture.picture+"')", backgroundSize: "cover", backgroundOrigin: "initial" }}></div>
          <div className="image-details">
            <h3>{selectedPicture.name}</h3>
            <p>{selectedPicture.pictureDescription}</p>
          </div>
        </CustomImageDetailsBox>
      </Modal>
    </PageContainer>
  )
}
