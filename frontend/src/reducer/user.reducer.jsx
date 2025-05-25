import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authSvc from "../pages/LoginPage/auth.service";

export const getLoggedInUserRedux = createAsyncThunk(
    "User/getLoggedInUserRedux",
    async()=>{
        try{
            const loggedInUser = await authSvc.getRequest('/auth/me',{auth:true})
            return loggedInUser.result

        }catch(exception){
            throw exception
        }
    }
)

const UserSlicer = createSlice({
    name:'User',
    initialState:{
        loggedInUser:null,
    },
    reducers:{
        setLoggedInUserForRedux:(state,action)=>{
            state.loggedInUser = action.payload
        },
        logoutUser: (state) => {
            state.loggedInUser = null; // Clear user state on logout
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getLoggedInUserRedux.fulfilled,(state,action)=>{
            state.loggedInUser = action.payload
        })
        builder.addCase(getLoggedInUserRedux.rejected,(state)=>{
            state.loggedInUser = null
        })
    }
})

export const {setLoggedInUserForRedux, logoutUser} = UserSlicer.actions;

export default UserSlicer.reducer;