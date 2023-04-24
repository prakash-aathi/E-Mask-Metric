import { createSlice } from "@reduxjs/toolkit";

const initialState = { hr: 0, m: 0, s: 0, ms: 0 } 

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {

    }
})

export const selectCounter = state => state.counter;
export default counterSlice.reducer