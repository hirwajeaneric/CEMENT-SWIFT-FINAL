import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Endpoints from '../../utils/APIS';

const initialState = {
    listOfDJs: [],
    selectedUser: {},
    numberOfDJs: 0,
    searchQuery: {},
    searchResults: [],
    isLoading: false,
}

export const getAllUsers = createAsyncThunk(
    'user/getAllUsers',
    async (thunkAPI) => {
        try {
            const response = await axios.get(Endpoints.APIS.userApis.list);
            response.data.users.forEach(element => {
                element.id = element._id;
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
            const response = await axios.get(Endpoints.APIS.userApis.update+id, user)
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
        dinamicSearch: (state, action) => {
            state.searchResults = state.listOfDJs.filter(user => !user.fullName.includes(action.payload));
        },
        manualSearch: (state, action) => {
            state.searchResults = state.listOfDJs.filter(user => user.fullName !== action.payload);
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
        },
        [updateUser.pending] : (state) => {
            state.isLoading = true;
        },
        [updateUser.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.selectedUser = action.payload;
            let products = state.listOfDJs;
            products.forEach(user => {
                if (user._id === action.payload._id) {
                    user = action.payload;
                }
            })
            state.listOfDJs = products;
        },
        [updateUser.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export const { updateUserInfo, getDJs, dinamicSearch, manualSearch } = userSlice.actions;
export default userSlice.reducer;
