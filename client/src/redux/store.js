import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import jobPictureReducer from './features/jobPicturesSlice';
import bookReducer from './features/bookingSlice';
import reportReducer from './features/reportSlice';
import ratingReducer from './features/ratingSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        jobPicture: jobPictureReducer,
        booking: bookReducer,
        report: reportReducer,
        rating: ratingReducer
    },
});