import { useQuery } from "react-query";
import { getArtistTotalListenerApi } from "../api/totalListener.api";

export const useGetArtistTotalListenerApi = (payload) =>
  useQuery({
    queryKey: ["getArtistTotalListener"],
    queryFn: async () => {
      const data = await getArtistTotalListenerApi();
      return data;
    },
  });
