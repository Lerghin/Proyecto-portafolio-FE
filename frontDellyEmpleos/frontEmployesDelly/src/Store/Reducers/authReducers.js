import { createReducer } from "@reduxjs/toolkit"
import { authenticate, login, logout, signup } from "../Actions/authActions"

const initialState={

    user:{},
    token: null,
    status:"offline"
}

const authReducer= createReducer(initialState,(builder)=>builder
.addCase(login,(state,action)=>{
    const newState= {...state, ...action.payload}
    return newState
})

.addCase(signup,(state, action)=>{
    const newState= {...state, ...action.payload}
    return newState
})

.addCase(authenticate.fulfilled, (state, action)=>{
    const  newState= {...state, ...action.payload}
    return newState
})
.addCase(logout, (state) => {
    return {
        ...state,
        user: {},
        token: null,
        status: "offline"
    };
})

)
export default authReducer;