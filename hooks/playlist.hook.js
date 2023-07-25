import { useMutation, useQuery } from "react-query";
import {
  createPlaylistAPI,
  deletePlaylistAPI,
  getPlaylistAPI,
  getPlaylistByGenreIdAPI,
  getPlaylistByIdAPI,
  updatePlaylistforArtistAPI,
} from "../api/playlist.api";

export const useGetPlaylist = (payload) =>
  useQuery({
    queryKey: ["getPlaylist", payload],
    queryFn: async () => {
      const data = await getPlaylistAPI(payload);
      return data["items"];
    },
  });
export const useGetPlaylisByGenreIdApi = (payload) =>
  useQuery({
    queryKey: ["getPlaylistByGenreId", payload],
    queryFn: async () => {
      const data = await getPlaylistByGenreIdAPI(payload);
      return data;
    },
    enabled: !!payload,
  });

export const useGetPlaylistByIdApi = (payload) =>
  useQuery({
    queryKey: ["getPlaylistById", payload],
    queryFn: async () => {
      const data = await getPlaylistByIdAPI(payload);
      return data;
    },
    enabled: !!payload,
  });

export const useCreatePlaylistAPI = (payload) =>
  useMutation({
    mutationFn: (payload) => createPlaylistAPI(payload),
  });

export const useUpdatePlaylistForArtistAPI = (payload) =>
  useMutation({
    mutationFn: (payload) => updatePlaylistforArtistAPI(payload),
  });

export const useDeletePlaylistAPI = (payload) =>
  useMutation({
    mutationFn: (payload) => deletePlaylistAPI(payload),
  });
