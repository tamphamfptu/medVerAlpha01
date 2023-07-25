import { useQuery, useMutation } from "react-query";
import {
  createFavoriteApi,
  isFavoriteExisted,
  getFavoriteGenreAPI,
} from "../api/favorite.api";

export const useGetFavoriteGenreAPI = (payload) =>
  useQuery({
    queryKey: ["getFavoriteByUserId"],
    queryFn: async () => {
      const data = await getFavoriteGenreAPI();
      return data;
    },
  });

export const useIsFavoriteExisted = (payload) =>
  useQuery({
    queryKey: ["isFavoriteExisted"],
    queryFn: async () => {
      const data = await isFavoriteExisted();
      return data;
    },
  });

export const useCreateFavoriteApi = () =>
  useMutation({
    mutationFn: (payload) => createFavoriteApi(payload),
  });
