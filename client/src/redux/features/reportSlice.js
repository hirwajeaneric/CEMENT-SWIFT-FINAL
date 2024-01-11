import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reportType: '',
    reportData: {},
    isLoading: false,
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setReportType: (state, action) => {
            state.reportType = action.payload;
        },
        setReportData: (state, action) => {
            state.reportType = action.payload;
        }
    },
});

export const { setReportType, setReportData } = reportSlice.actions;
export default reportSlice.reducer;
