import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Endpoints from '../../utils/APIS';

const initialState = {
    listOfJobPictures: [],
    selectedPicture: {},
    isLoading: false,
}

export const getDjPictures = createAsyncThunk(
    'jobPicture/getJobPictures',
    async (djId, thunkAPI) => {
        try {
            const response = await axios.get(Endpoints.APIS.jobPicturesApis.findByDjId+djId);
            return response.data.pictures;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getPictureDetails = createAsyncThunk(
    'jobPicture/getPictureDetails',
    async (pictureId, thunkAPI) => { 
        try {
            const response = await axios.get(Endpoints.APIS.jobPicturesApis.findById+pictureId)
            console.log(pictureId);
            console.log(response.data.picture);
            return response.data.picture;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const updateJobPicture = createAsyncThunk(
    'user/updateJobPicture',
    async (update, thunkAPI) => { 
        try {
            const { id, jobPicture } = update;
            const response = await axios.get(Endpoints.APIS.jobPicturesApis.update+id, jobPicture)
            thunkAPI.dispatch(getDjPictures(jobPicture.djId));
            return response.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const userSlice = createSlice({
    name: 'jobPicture',
    initialState,
    reducers: {},
    extraReducers: {
        [getDjPictures.pending] : (state) => {
            state.isLoading = true;
        },
        [getDjPictures.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.listOfJobPictures = action.payload;
        },
        [getDjPictures.rejected] : (state) => {
            state.isLoading = false;
        },
        [getPictureDetails.pending] : (state) => {
            state.isLoading = true;
        },
        [getPictureDetails.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.selectedPicture = action.payload;
        },
        [getPictureDetails.rejected] : (state) => {
            state.isLoading = false;
        },
        [updateJobPicture.pending] : (state) => {
            state.isLoading = true;
        },
        [updateJobPicture.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.selectedPicture = action.payload;
        },
        [updateJobPicture.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export default userSlice.reducer;
