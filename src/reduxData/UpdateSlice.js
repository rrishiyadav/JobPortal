import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({

    name: "Hrupdate",
    initialState: {
        value: undefined

    },
    reducers: {

        HrUpdateReducer: (state, action) => {
            state.value = action.payload
        },
        CateUpdateReducer: (state, action) => {
            state.value = action.payload
        },
        editJobReducer:(state, action) => {
            state.value = action.payload
        },
    }
})

export const { HrUpdateReducer, CateUpdateReducer,editJobReducer } = slice.actions
export default slice.reducer