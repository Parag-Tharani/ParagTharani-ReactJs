import { createSlice } from "@reduxjs/toolkit";

interface Arr {
    deleteProduct : string[];
    isLoading : boolean
  };

const initialState : Arr = {
    deleteProduct : [],
    isLoading : true
}

const delSlice = createSlice({
    name: "fav",
    initialState,
    reducers: {
        delProduct: (state , { payload }) => {
            state.deleteProduct.push(payload)
        }
    }
})

export const { delProduct } = delSlice.actions

export default delSlice.reducer