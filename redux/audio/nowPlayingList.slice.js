import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  playingList: [],
  currentPlaying: {
    currentAudioIndex: 0,
    soundStatus: {},
  },
  audioAction: "",
  audioActionValue: "",
  currentAction: null,
  isLoading: true,
};
const beatifulAudioFormat = (audio) => {
  if (!audio) return;
  const audioInfo = audio["audio"];
  const artist = audioInfo["artist"];
  const audioFile = audioInfo["audioFile"][0];
  const latestFile = audioFile["file"];
  const formated = {
    artist: artist["artist_name"] || "Unknow",
    imageUrl: audioInfo["imageUrl"],
    id: audioInfo["audioId"],
    likeNumber: audioInfo["liked"],
    name: audioInfo["name"],
    status: audioInfo["status"],
    isLike: false,
    url: latestFile["url"],
  };
  return formated;
};
const reducer = createSlice({
  name: "nowPlayingList",
  initialState,
  reducers: {
    addAudioToPlayList: (state, action) => {
      const playingList = state.playingList;
      playingList.push(beatifulAudioFormat(action.payload));
      state.playingList = playingList;
    },
    addListToPlayList: (state, action) => {
      const currentId = action.payload["currentId"];
      const listPlaylistInput = action.payload["tracklist"];
      const beatifulData = listPlaylistInput.map((item) =>
        beatifulAudioFormat(item)
      );
      state.currentPlaying.currentAudioIndex = currentId;
      state.playingList = beatifulData;
    },
    setNowPLayingList: (state, action) => {
      state.playingList = markAudioListen(action.payload);
    },
    setNowPlayingAudioId: (state, action) => {
      state.currentPlaying.currentAudioIndex = action.payload;
    },
    setCurrentPlayingAudio: (state, action) => {
      state.currentPlaying = action.payload;
    },
    triggerAudioPlayer: (state, action) => {
      state.audioAction = action.payload["audioAction"];
      state.audioActionValue = action.payload["audioActionVaue"];
    },
  },
});
const markAudioListen = (listAudio) => {
  return listAudio.map((audio) => (audio.isPlayed = true));
};
export const nowPlayingAction = {
  ...reducer.actions,
};
export const nowPlayingListReducer = reducer.reducer;

export const ACTION_TYPE = {
  START: "START",
  PAUSE: "PAUSE",
  NEXT_SONG: "NEXT_SONG",
  PREV_SONG: "PREV_SONG",
  MINOR_10_SEC: "MINOR_10_SEC",
  ADD_10_SEC: "ADD_10_SEC",
  CHANGE_SONG_TIMELINE: "CHANGE_SONG_TIMELINE",
  PLAY_SONG_INDEX: "PLAY_SONG_INDEX",
};
