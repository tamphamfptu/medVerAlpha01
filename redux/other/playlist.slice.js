import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlistId: null,
  activePlaylist: null,
};

const reducer = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylistId: (state, action) => {
      state.playlistId = action.payload;
    },
    setActivePlaylist: (state, action) => {
      state.activePlaylist = action.payload;
    },
  },
});

export const playlistAction = {
  ...reducer.actions,
};
export const playlistReducer = reducer.reducer;
