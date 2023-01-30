import {createSlice} from '@reduxjs/toolkit'
// import type {RootState} from '../store'

const initialState = {
    data: []
}

export const home_data = createSlice({
    name: 'home_slice',
    initialState,
    reducers: {
        set_home_data: (state, action) => {
            state.data = action.payload
        }
    }
})
export const {set_home_data} = home_data.actions
// export const home_model_data = (state: RootState) => state.home_data
export default home_data.reducer
