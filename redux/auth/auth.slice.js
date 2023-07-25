import { createSlice } from "@reduxjs/toolkit";
import { parseTokenToRole, removeTokenFromStorage } from "../../utils/app.util";
import {
  removeAllDataFromLocal,
  storeTokenToLocal,
  storeUserToLocal,
} from "../../utils/app.local_handler";

const initialState = {
  isTriedLogin: false,
  data: null,
  token: null,
  refreshToken: null,
  role: null,
};
const reducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: () => ({ ...initialState }),
    storeUser: (state, { payload }) => {
      state.data = payload;
      storeUserToLocal(payload).then((r) =>
        console.log("store_user_local_success")
      );
    },
    storeUserWithoutLocal: (state, { payload }) => {
      state.data = payload;
    },
    storeToken: (state, { payload }) => {
      state.token = payload["access_token"];
      state.refreshToken = payload["refresh_token"];
      state.role = parseTokenToRole(payload["access_token"]);
      storeTokenToLocal(payload).then((r) =>
        console.log("store_token_local_success")
      );
    },
    storeTokenWithoutLocal: (state, { payload }) => {
      state.token = payload["access_token"];
      state.refreshToken = payload["refresh_token"];
      state.role = parseTokenToRole(payload["access_token"]);
    },
    removeToken: (state, { payload }) => {
      removeTokenFromStorage();
      state.token = null;
    },
    storeAudio: (state, { payload }) => {
      state.audio = payload;
    },
    logout: () => {
      console.log("ALl Data removed");
      removeAllDataFromLocal();
    },
  },
});
export const userAction = {
  ...reducer.actions,
};
export const userReducer = reducer.reducer;

// {
//   "address": "696 XVNT",
//   "avatar": "32182d5e-be57-4f66-a91f-67e8bd72da3c",
//   "city": "BMT",
//   "created_at": "32182d5e-be57-4f66-a91f-67e8bd72da3c",
//   "dob": "2000-01-22T13:18:58.000Z",
//   "email": "chaubao.cloud@gmail.com",
//   "favorite": 0,
//   "firstName": "Bao",
//   "following": 0,
//   "followingArtist": [],
//   "gender": "MALE",
//   "id": "32182d5e-be57-4f66-a91f-67e8bd72da3c",
//   "lastName": "Chau",
//   "lastestSub": null,
//   "playlist": 0,
//   "publicPlaylist": [],
//   "status": "ACTIVE",
//   "username": "bao.huynh"
// }
