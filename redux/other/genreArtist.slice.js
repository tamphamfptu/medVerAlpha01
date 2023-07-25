import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genreArtistId: [],
};

const reducer = createSlice({
  name: "genreArtist",
  initialState,
  reducers: {
    storeGenreArtistId: (state, action) => {
      state.genreArtistId = action.payload;
    },
  },
});

export const genreArtistAction = {
  ...reducer.actions,
};
export const genreArtistReducer = reducer.reducer;
