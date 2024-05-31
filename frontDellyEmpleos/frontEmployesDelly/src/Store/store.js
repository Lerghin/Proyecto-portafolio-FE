import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../Store/Reducers/authReducers'


export const store= configureStore({
reducer:{
    applicants: authReducer
}

})
export default store;