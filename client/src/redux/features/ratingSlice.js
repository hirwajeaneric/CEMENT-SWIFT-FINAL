import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Endpoints from '../../utils/APIS';

const initialState = {
    djRatings: [],
    totalNumberOfDjRatings: 0,
    calculatedDjRating: 0,
    searchQuery: {},
    searchResults: [],
    isLoading: false,
}

export const getDJRatings = createAsyncThunk(
    'rating/getDJRatings',
    async (djId, thunkAPI) => { 
        try {
            const response = await axios.get(Endpoints.APIS.ratingApis.findByDjId+djId)
            return response.data.ratings;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const ratingSlice = createSlice({
    name: 'rating',
    initialState,
    extraReducers: {
        [getDJRatings.pending] : (state) => {
            state.isLoading = true;
        },
        [getDJRatings.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.djRatings = action.payload;
            state.totalNumberOfDjRatings = state.djRatings.length;
            var totalRatings = 0;
            action.payload.forEach(element => {
                totalRatings = totalRatings + element.score;
            }); 
            state.calculatedDjRating = (totalRatings * 5) / (5*state.totalNumberOfDjRatings); 
        },
        [getDJRatings.rejected] : (state) => {
            state.isLoading = false;
        },
    }
});

export const { } = ratingSlice.actions;
export default ratingSlice.reducer;
