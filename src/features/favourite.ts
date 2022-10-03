import { createSlice } from "@reduxjs/toolkit";


interface Arr {
    favItems: string[];
    isLoading : boolean
  };

const initialState : Arr = {
    favItems: [],
    isLoading : true
}

const favSlice = createSlice({
    name: "fav",
    initialState,
    reducers: {
        updateFav: (state , { payload }) => {
            if(state.favItems.includes(payload)){
                state.favItems = state.favItems.filter((items) => (items !== payload))
            }else{
                state.favItems.push(payload)
            }
        }
    }
})

export const { updateFav } = favSlice.actions

export default favSlice.reducer

