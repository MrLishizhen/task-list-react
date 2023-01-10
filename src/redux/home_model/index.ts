import {createSlice} from '@reduxjs/toolkit'
import type {RootState} from '../store'

const initialState = {
    data: {
        model_open:false,
        day: 0,
        week: '',
        hot: false,
        week_str: '',
        month_day: '',
        list: [],
        hot_list: {}
    }
}

export const home_model = createSlice({
    name: 'home_model_slice',
    initialState,
    reducers: {
        set_model_open: (state, action) => {
            state.data = action.payload
        }
    }
})
export const {set_model_open} = home_model.actions
export const home_model_data = (state: RootState) => state.home_model
export default home_model.reducer
