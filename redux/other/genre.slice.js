import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genreId: null,
  genreTrack: null,
};

const reducer = createSlice({
  name: "genre",
  initialState,
  reducers: {
    setGenreId: (state, action) => {
      state.genreId = action.payload;
    },
    setGenreTrack: (state, action) => {
      state.genreTrack = action.payload;
    },
  },
});

export const genreAction = {
  ...reducer.actions,
};
export const genreReducer = reducer.reducer;
