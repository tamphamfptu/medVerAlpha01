import { useMutation, useQuery } from "react-query";
import { createHistoryApi, getHistoryAPI } from "../api/history.api";

export const useCreateHisoryApi = (payload) =>
  useMutation({
    mutationFn: (payload) => createHistoryApi(payload),
  });

export const useGetHistory = (payload) =>
  useQuery({
    queryKey: ["getHistory"],
    queryFn: async () => {
      const data = await getHistoryAPI();
      return data;
    },
  });
