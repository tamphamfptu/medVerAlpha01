import {
  createSubscriptionApi,
  getSubscriptionType,
} from "../api/subscriptionType.api";
import { useMutation, useQuery } from "react-query";
export const useGetSubscriptionType = (payload) =>
  useQuery({
    queryKey: ["getSubList"],
    queryFn: async () => {
      const data = await getSubscriptionType();
      return data;
    },
  });

export const useCreateSubscriptionApi = (payload) =>
  useMutation({
    mutationFn: (payload) => createSubscriptionApi(payload),
  });
