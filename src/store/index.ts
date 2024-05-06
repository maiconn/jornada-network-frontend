import {combineReducers} from "redux";
import {userReducer} from "./userReducer"
import {configureStore} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    userReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;