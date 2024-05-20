import { createSlice } from '@reduxjs/toolkit'

const canproslice = createSlice({

    name: "Jobdata",
    initialState: {
        value: [],
    },
    reducers: {
        canProfileReducer: (state, action) => {
            state.value = action.payload
        },
    }
})

export const { canProfileReducer } = canproslice.actions
export default canproslice.reducer