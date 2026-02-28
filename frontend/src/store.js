import {configureStore} from "@reduxjs/toolkit"
import userIdReducer from "./slice/userIdSlice"

const store = configureStore({
    reducer:{
        userID: userIdReducer
    }
})

export default store