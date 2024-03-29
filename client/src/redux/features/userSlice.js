import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Endpoints from '../../utils/APIS';

const initialState = {
    listOfDJs: [],
    listOfActiveProducts: [],
    selectedUser: {},
    numberOfDJs: 0,
    numberOfActiveProducts: 0,
    searchOption: '',
    searchUserResults: [],
    numberOfUserResults: 0,
    isLoading: false,
}

export const getAllUsers = createAsyncThunk(
    'user/getAllUsers',
    async (thunkAPI) => {
        try {
            const response = await axios.get(Endpoints.APIS.userApis.list);
            response.data.users.forEach((element, index) => {
                element.id = element._id;
                element.number = index;
            });
            return response.data.users
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async (userId, thunkAPI) => { 
        try {
            const response = await axios.get(Endpoints.APIS.userApis.findById+userId)
            return response.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (update, thunkAPI) => { 
        try {
            const { id, user } = update;
            const response = await axios.put(Endpoints.APIS.userApis.update+id, user)
            return response.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getDJs: (state, action) => {
            let listOfProducts = action.payload.filter((user) => user.userType === 'DJ' )
            state.listOfDJs = listOfProducts;
            state.numberOfDJs = listOfProducts.length;
        },
        updateUserInfo: (state, action) => {
            state.selectedUser = action.payload;
            console.log(action.payload);
        },
        changeSearchOption: (state, action) => {
            state.searchOption = action.payload
        },
        dynamicSearch: (state, action) => {
            state.searchUserResults = state.listOfDJs.filter(user => user.fullName.toUpperCase().includes(action.payload.toUpperCase()));
            state.numberOfUserResults = state.searchUserResults.length;
        },
        manualSearch: (state, action) => {
            state.searchUserResults = state.listOfDJs.filter(user => user.fullName.toUpperCase().includes(action.payload.toUpperCase()));
            state.numberOfUserResults = state.searchUserResults.length;
        }
    },
    extraReducers: {
        [getAllUsers.pending] : (state) => {
            state.isLoading = true;
        },
        [getAllUsers.fulfilled] : (state, action) => {
            state.isLoading = false;
            let listOfDJs = action.payload.filter(user => user.userType === 'DJ');
            state.listOfDJs = listOfDJs;
            state.numberOfDJs = listOfDJs.length;
            state.listOfActiveProducts = listOfDJs.filter(user => user.status === "Active");
            state.numberOfActiveProducts = listOfDJs.filter(user => user.status === "Active").length;
        },
        [getAllUsers.rejected] : (state) => {
            state.isLoading = false;
        },
        [getUserInfo.pending] : (state) => {
            state.isLoading = true;
        },
        [getUserInfo.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.selectedUser = action.payload;
        },
        [getUserInfo.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export const { updateUserInfo, getDJs, dinamicSearch, manualSearch } = userSlice.actions;
export default userSlice.reducer;
