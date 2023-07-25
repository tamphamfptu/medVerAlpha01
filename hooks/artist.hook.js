import { useQuery } from "react-query";
import { getArtistTotalFollowerApi } from "../api/artist.api";

export const useGetArtistTotalFollowerApi = (payload) =>
  useQuery({
    queryKey: ["getFavorite"],
    queryFn: async () => {
      const data = await getArtistTotalFollowerApi();
      return data;
    },
  });
