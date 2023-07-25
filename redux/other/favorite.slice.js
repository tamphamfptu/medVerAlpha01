import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteId: [],
};

const reducer = createSlice({
  name: "genre",
  initialState,
  reducers: {
    setFavoriteId: (state, action) => {
      state.favoriteId = action.payload;
    },
  },
});

export const favoriteAction = {
  ...reducer.actions,
};
export const favoriteReducer = reducer.reducer;
