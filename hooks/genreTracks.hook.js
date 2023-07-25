import { useQuery } from "react-query";
import { getTrackByGenreIdAPI } from "../api/genreTracks.api";
import { store } from "../core/store/store";

export const useGetTracksFromGenre = (payload) => {
  const genreId = store.getState().genre.genreId;
  return useQuery({
    queryKey: ["getAudio"],
    queryFn: async () => {
      const data = await getTrackByGenreIdAPI(genreId);
      return data;
    },
  });
};
