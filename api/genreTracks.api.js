import { CallAPI } from "../core/api/baseAxios";

export const getTrackByGenreIdAPI = async (payload) => {
  const { genreId } = payload;
  const queryParam = `/` + `${genreId}`;
  const url = "/audio_genre" + `${queryParam}`;
  return CallAPI.get(url);
};
