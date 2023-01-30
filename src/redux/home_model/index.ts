import {createSlice} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import {deepClone} from "@/util/utils";

const initialState = {
    data: {
        model_open: false,
        day: 0,
        week: '',
        hot: false,
        week_str: '',
        month_day: '',
        list: [],
        hot_list: {
            hot_radio: false,
            week: '',
            id: 0,
            editor_html: ''
        }
    }
}

export const home_model = createSlice({
    name: 'home_model_slice',
    initialState,
    reducers: {
        set_model_open: (state, action) => {
            if(action.payload===0){
                state.data = initialState.data
            }else{
                state.data = action.payload
            }
        },
        set_model_hot_list: (state, action) => {
            state.data.hot_list = action.payload
        },
        set_model_hot_editor_html: (state, action) => {
            let list = deepClone(state.data.list) || [];
            let list_item = list.find((u: any) => u.id === state.data.hot_list.id) || {editor_html: ''}
            list_item.editor_html = action.payload;
            state.data.hot_list.editor_html = action.payload
        },
        // set_model_editor_html: (state) => {
        //     let list = state.data.list || [];
        //     let list_item = list.find((u: any) => u.id === state.data.hot_list.id) || {editor_html: ''}
        //     list_item.editor_html = state.data.hot_list.editor_html;
        //     state.data.list = [...list]
        // },
    }
})
export const {set_model_open, set_model_hot_list, set_model_hot_editor_html,} = home_model.actions
export const home_model_data = (state: RootState) => state.home_model
export default home_model.reducer
