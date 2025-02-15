import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../features/counter/counterSlice"
import { userReducer } from "../features/user/userSlice"

const store = configureStore({
    reducer: {
        counter: counterReducer,
        user : userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production', 

})

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch