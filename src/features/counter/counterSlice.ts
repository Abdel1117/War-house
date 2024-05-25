import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState  {
    value : number
    loading : boolean
    error : boolean
}
const initialState: CounterState = {
    loading : false,
    value : 0 ,
    error: false, 
}

export const counterSlice = createSlice({
    name: "counter",
    initialState ,
    reducers : {
        increment : (state) => {
            state.value += 1
        },

        decrement : (state) => {
            state.value -= 1
        },


        incrementByAmount : (state, action: PayloadAction<number>) => {
            state.value += action.payload 
        },
    },
})


/*  */

export const {increment, decrement, incrementByAmount} = counterSlice.actions


export const counterReducer =  counterSlice.reducer