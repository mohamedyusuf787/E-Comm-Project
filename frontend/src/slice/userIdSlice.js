import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: "",
    email: "",
}

const userIdSlice = createSlice({
    name: "userId",
    initialState,
    reducers: {
        userId(state, action) {
            state.uid = action.payload.uid
            state.email = action.payload.email
        }
    }
})

export const { userId } = userIdSlice.actions //this line used for to export this slice
export default userIdSlice.reducer  //this used to export the specific reducer


// 🧠 The Correct Mental Model
// 🔁 To UPDATE value

// 👉 You send data to the slice (via action)

// 👀 To READ value

// 👉 You get data from the store (via useSelector)