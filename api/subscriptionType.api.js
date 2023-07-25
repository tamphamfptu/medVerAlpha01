import { CallAPI } from "../core/api/baseAxios";

export const getSubscriptionType = (payload) => {
  const url = "/Plans";
  return CallAPI.get(url);
};

export const createSubscriptionApi = (payload) => {
  const url = "/subscriptions";
  const { planId } = payload;
  return CallAPI.post(url, {
    planId,
  });
};
