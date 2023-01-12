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
        hot_list: {
            hot_radio:false,
            week:'',
            id:0,
            editor_html:''
        }
    }
}

export const home_model = createSlice({
    name: 'home_model_slice',
    initialState,
    reducers: {
        set_model_open: (state, action) => {
            state.data = action.payload
        },
        set_model_hot_list:(state,action)=>{
            state.data.hot_list = action.payload
        }
    }
})
export const {set_model_open,set_model_hot_list} = home_model.actions
export const home_model_data = (state: RootState) => state.home_model
export default home_model.reducer
