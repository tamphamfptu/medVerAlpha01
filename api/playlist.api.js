import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";
import queryString from "query-string";

export const getPlaylistAPI = (payload) => {
  const requestUrl = queryString.stringifyUrl({
    url: "/playlist",
    query: payload,
  });
  return CallAPI.get(requestUrl);
};
export const getPlaylistByGenreIdAPI = (genreId) => {
  const url = "/genres/" + `${genreId}`;
  return CallAPI.get(url);
};
export const getPlaylistByIdAPI = (playlistId) => {
  const url = "/playlist/" + `${playlistId}`;
  return CallAPI.get(url);
};

export const updatePlaylistforArtistAPI = (payload) => {
  const { name, description } = payload;
  const playlist = store?.getState()?.playlist;
  const playlistId = playlist?.playlistId;
  const queryParam = `${playlistId}`;
  const url = "/playlist/" + `${queryParam}`;
  return CallAPI.put(url, {
    name,
    description,
  });
};

export const deletePlaylistAPI = (payload) => {
  const playlistId = store.getState().playlist.playlistId;
  const url = "/playlist/" + `${playlistId}`;
  return CallAPI.delete(url);
};

export const createPlaylistAPI = (payload) => {
  const { name, imageUrl, status, description } = payload;
  const url = "/playlist";
  return CallAPI.post(url, {
    name,
    imageUrl,
    status,
    description,
  });
};
