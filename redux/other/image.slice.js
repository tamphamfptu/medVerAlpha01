import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageResult: null,
};

const reducer = createSlice({
  name: "image",
  initialState,
  reducers: {
    storeImage: (state, action) => {
      state.imageResult = action.payload;
    },
  },
});

export const imageAction = {
  ...reducer.actions,
};
export const imageReducer = reducer.reducer;
