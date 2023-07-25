import { CallAPI, CallAPIMulti } from "../core/api/baseAxios";

export const getUserDataByUsernameApi = (username) => {
  const queryUrl = `/user/${username}`;
  return CallAPI.get(queryUrl);
};

export const getUserProfileByUserIdApi = (userId) => {
  const queryUrl = `/user/getProfile/${userId}`;
  return CallAPI.get(queryUrl);
};

export const updateUserAvatar = (form) => {
  const url = "/user";
  return CallAPIMulti.put(url, form);
};

export const updateUserAccountDetails = (form) => {
  const url = "/user";
  return CallAPIMulti.put(url, form);
};
