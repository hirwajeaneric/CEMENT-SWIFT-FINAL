import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Endpoints from '../../utils/APIS';

const initialState = {
    listOfBookings: [],
    listofConfirmedBookings: [],
    numberofConfirmedBookings: 0,
    listofGeneralBookings: [],
    listOfADjsBookings: [],
    selectedBooking: {},
    numberOfBookings: 0,
    responseMessage: '',
    searchOption: '',
    searchBookingsResults: [],
    numberOfBookingsResults: 0,
    isLoading: false,
}

export const getAllBookings = createAsyncThunk(
    'booking/getAllBookings',
    async (thunkAPI) => {
        try {
            const response = await axios.get(Endpoints.APIS.jobApis.list);
            response.data.jobs.forEach((element, index) => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.startDate = new Date(element.startDate).toLocaleString();
                element.endDate = new Date(element.endDate).toLocaleString();
                element.number = index;
            });
            return response.data.jobs
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getMyBookings = createAsyncThunk(
    'booking/getMyBookings',
    async (djId, thunkAPI) => {
        try {
            const response = await axios.get(Endpoints.APIS.jobApis.findBySuggestedDjId+djId);
            response.data.jobs.forEach((element, index) => {
                element.id = element._id;
                delete element._id;
                delete element.__v;
                element.startDate = new Date(element.startDate).toLocaleString();
                element.endDate = new Date(element.endDate).toLocaleString();
                element.number = index;
            });
            return response.data.jobs
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getBookingDetails = createAsyncThunk(
    'booking/getBookingDetails',
    async (bookingId, thunkAPI) => { 
        try {
            const response = await axios.get(Endpoints.APIS.jobApis.findById+bookingId)
            return response.data.job;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const deleteBooking = createAsyncThunk(
    'booking/deleteBooking',
    async (id, thunkAPI) => { 
        try {
            const response = await axios.delete(Endpoints.APIS.jobApis.delete+id)
            if (response.status === 204) {
                return id;
            }
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const userSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        updateBookings: (state, action) => {
            state.selectedBooking = action.payload;
            let bookings = state.listOfBookings;

            bookings.forEach(booking => {
                if (booking.id === action.payload._id) {
                    booking = action.payload;
                }
            })
            state.listOfBookings = bookings;
        },
        changeSearchOption: (state, action) => {
            state.searchOption = action.payload
        },
        dynamicSearch: (state, action) => {
            state.searchBookingsResults = state.listofGeneralBookings.filter(booking => booking.jobLocation.toUpperCase().includes(action.payload.toUpperCase()));
            state.numberOfBookingsResults = state.searchBookingsResults.length;
        },
        manualSearch: (state, action) => {
            state.searchBookingsResults = state.listofGeneralBookings.filter(booking => booking.jobLocation.toUpperCase().includes(action.payload.toUpperCase()));
            state.numberOfBookingsResults = state.searchBookingsResults.length;
        }
    },
    extraReducers: {
        [getAllBookings.pending] : (state) => {
            state.isLoading = true;
        },
        [getAllBookings.fulfilled] : (state, action) => {
            state.isLoading = false;
            let listOfBookings = action.payload.sort((a,b) => new Date(a.sendDate) - new Date(b.sendDate));
            state.listOfBookings = listOfBookings;
            state.numberOfBookings = listOfBookings.length;
            const confirmedBookings = action.payload.filter(booking => booking.status === 'Confirmed');
            state.listofConfirmedBookings = confirmedBookings;
            state.numberofConfirmedBookings = confirmedBookings.length;
            state.listofGeneralBookings = action.payload.filter(booking => booking.status === 'Confirmed' && (booking.jobType === 'Club' || booking.jobType === 'Public meeting sound system' || booking.jobType === 'Concert'))
        },
        [getMyBookings.rejected] : (state) => {
            state.isLoading = false;
        },
        [getMyBookings.pending] : (state) => {
            state.isLoading = true;
        },
        [getMyBookings.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.listOfADjsBookings = action.payload.sort((a,b) => new Date(a.sendDate) - new Date(b.sendDate));
        },
        [getAllBookings.rejected] : (state) => {
            state.isLoading = false;
        },
        [getBookingDetails.pending] : (state) => {
            state.isLoading = true;
        },
        [getBookingDetails.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.selectedBooking = action.payload;
        },
        [getBookingDetails.rejected] : (state) => {
            state.isLoading = false;
        },
        [deleteBooking.pending] : (state) => {
            state.isLoading = true;
        },
        [deleteBooking.fulfilled] : (state, action) => {
            state.isLoading = false;
            let bookings = state.listOfBookings;
            bookings.filter(booking => booking._id !== action.payload)
            state.listOfBookings = bookings;
            state.responseMessage = 'Booking deleted';
        },
        [deleteBooking.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export const { updateBookings, dynamicSearch, manualSearch } = userSlice.actions;
export default userSlice.reducer;
