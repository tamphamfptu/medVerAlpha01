import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";
import queryString from "query-string";

export const getTracksAPI = async (payload) => {
  const queryUrl = queryString.stringifyUrl({
    url: "/audio",
    query: payload,
  });
  return CallAPI.get(queryUrl);
};
export const getAudioForArtistAPI = async () => {
  const playlistId = store.getState().playlist.playlistId;
  const artist = store.getState()?.user?.user;
  const artistId = artist?.user_db?.id;
  const queryParam =
    `playlistId=` + `${playlistId}` + `&artistId=` + `${artistId}`;
  const url = "/audio?status=ACTIVE&" + `${queryParam}`;
  return CallAPI.get(url);
};
export const getAudioByIdForArtistAPI = async (payload) => {
  const audioArtistId = store.getState().audioArtist.audioArtistId;
  const queryParam = `${audioArtistId}`;
  if (!audioArtistId) return;
  const url = "/audio/" + `${queryParam}`;
  return CallAPI.get(url);
};

export const createAudioForArtistApi = (payload) => {
  const { name, imageUrl, status, length, playlistId, genreId } = payload;
  const url = "/audio";
  return CallAPI.post(url, {
    name,
    imageUrl,
    status,
    length,
    playlistId,
    genreId,
  });
};
export const updateAudioForArtistApi = (payload) => {
  const { name } = payload;
  const audioArtistId = store.getState().audioArtist.audioArtistId;
  const queryParam = `${audioArtistId}`;
  const url = "/audio/" + `${queryParam}`;
  return CallAPI.put(url, {
    name,
  });
};

export const deleteAudioArtistAPI = (payload) => {
  const audioId = store.getState().audioArtist.audioArtistId;
  const url = "/audio/" + `${audioId}`;
  return CallAPI.delete(url);
};
