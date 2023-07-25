import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getFavoriteTracksAPI = async (payload) => {
  const favorite = store.getState()?.favorite;
  const favoriteId = favorite?.favoriteId;
  const queryParam = `/` + `${favoriteId}`;
  const url = "/audio_genre" + `${queryParam}`;
  return CallAPI.get(url);
};
