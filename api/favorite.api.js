import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getFavoriteGenreAPI = () => {
  const url = "/favorite/userId";
  return CallAPI.get(url);
};

export const isFavoriteExisted = (payload) => {
  const url = "/favorite";
  return CallAPI.get(url);
};

export const createFavoriteApi = (payload) => {
  const url = "/favorite";
  const { genreId } = payload;
  return CallAPI.post(url, {
    genreId,
  });
};
