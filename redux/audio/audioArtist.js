import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  audioArtistId: null,
  audioList: null,
  audioInfo: null,
};

const reducer = createSlice({
  name: "audioArtist",
  initialState,
  reducers: {
    setAudioArtistId: (state, action) => {
      state.audioArtistId = action.payload;
    },
    setAudioList: (state, action) => {
      state.audioList = action.payload;
    },
    setAudioInfo: (state, action) => {
      state.audioInfo = action.payload;
    },
  },
});

export const audioArtistAction = {
  ...reducer.actions,
};
export const audioArtistReducer = reducer.reducer;
