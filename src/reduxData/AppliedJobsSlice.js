import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({

    name: "Jobdata",
    initialState: {
        value: [],
    },
    reducers: {
        AppliedJobListReducer: (state, action) => {
            state.value = action.payload
        },
       jobDetailsReducer: (state, action) => {
            state.value = action.payload
        },
        
        
    }
})

export const { AppliedJobListReducer,jobDetailsReducer } = slice.actions
export default slice.reducer