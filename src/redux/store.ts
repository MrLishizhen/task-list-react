import {configureStore} from '@reduxjs/toolkit'
import home_model from "@/redux/home_model";
import home_data from "@/redux/home_data";
const store = configureStore({
    reducer:{
        home_model,
        home_data
    }
})

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
