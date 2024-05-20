import { createSlice } from '@reduxjs/toolkit'

const jobslice = createSlice({

    name: "Jobdata",
    initialState: {
        value: [],
    },
    reducers: {
        JobListReducer: (state, action) => {
            state.value = action.payload
        },
        StatusReducer: (state, action) => {
            state.value = action.payload
        },
        jobByCateListReducer: (state, action) => {
            state.value = action.payload
        },
    }
})

export const { JobListReducer,StatusReducer, jobByCateListReducer } = jobslice.actions
export default jobslice.reducer