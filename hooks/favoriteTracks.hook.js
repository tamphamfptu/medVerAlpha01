import { useQuery } from "react-query";
import { getFavoriteTracksAPI } from "../api/favoriteTracks.api";

export const useGetTracksFromFavorite = (payload) =>
  useQuery({
    queryKey: ["getAudio"],
    queryFn: async () => {
      const data = await getFavoriteTracksAPI();
      return data;
    },
    enabled: false,
  });
