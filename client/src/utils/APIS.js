/** 
 * 
 * This file contains a list of API Endpoints from the backend application to perform all system functionalities tied to the backend and FaDatabase.
 * 
 * */
const PORT = '4444';
const HOST = '127.0.0.1';
const PROTOCOL = 'http';
const LINK =  `${PROTOCOL}://${HOST || 'localhost'}:${PORT}/api/v1/fdj/`;

let APIS = {
    userApis: {
        signIn: `${LINK}user/signin`,
        signUp:`${LINK}user/signup`,
        requestPasswordReset: `${LINK}user/requestPasswordReset`,
        resetPassword: `${LINK}user/resetPassword?id=`,
        updateUserAccount: `${LINK}user/update?id=`,
        findById: `${LINK}user/findById?id=`,
        findByEmail: `${LINK}user/findByEmail?email=`,
        findByUserType: `${LINK}user/findByEmail?email=`,
        list: `${LINK}user/list`,
        delete: `${LINK}user/delete`,
    },
    jobApis: {
        add: `${LINK}job/add`,
        update: `${LINK}job/update?id=`,
        delete: `${LINK}job/delete?id=`,
        list: `${LINK}job/list`,
        findById: `${LINK}job/findById?id=`,
        findBySuggestedDjId: `${LINK}job/findBySuggestedDjId?suggestedDjId=` 
    },
    ratingApis: {
        add: `${LINK}rating/add`,
        update: `${LINK}rating/update?id=`,
        delete: `${LINK}rating/delete?id=`,
        list: `${LINK}rating/list`,
        findById: `${LINK}rating/findById?id=`,
        findByDjId: `${LINK}rating/findByDjId?djId=` 
    },
    workTimeApis: {
        add: `${LINK}workTime/add`,
        update: `${LINK}workTime/update?id=`,
        delete: `${LINK}workTime/delete?id=`,
        list: `${LINK}workTime/list`,
        findById: `${LINK}workTime/findById?id=`,
        findByTime: `${LINK}workTime/findByTime?time=`,
    },
    jobPicturesApis: {
        add: `${LINK}jobPictures/add`,
        update: `${LINK}jobPictures/update?id=`,
        list: `${LINK}jobPictures/list`,
        findById: `${LINK}jobPictures/findById?id=`,
        findByJobId: `${LINK}jobPictures/findByJobId?jobId=`,
        findByDjId: `${LINK}jobPictures/findByDjId?djId=`,
    },
    email: {
        send: `${LINK}email/`,
    },
    files: {
        profile: `${LINK}profile/`,
        pictures: `${LINK}pictures/`,
    }
}

const Endpoints = { APIS, HOST, PORT, LINK, PROTOCOL }

export default Endpoints;