import { useQuery } from "react-query";
import { getGenreListApi } from "../api/genre.api";

export const useGetGenreList = (payload) =>
  useQuery({
    queryKey: ["getGenreList", payload],
    queryFn: async () => {
      const data = await getGenreListApi(payload);
      return data;
    },
  });
