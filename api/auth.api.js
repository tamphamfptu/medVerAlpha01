import { CallAPI } from "../core/api/baseAxios";

export const loginApi = (payload) => {
  const { username, password } = payload;
  const url = "/auth/login/token";
  return CallAPI.post(url, {
    username,
    password,
  });
};
export const loginWithGoogleApi = (payload) => {
  const { subject_token, username, email } = payload;
  const url = "/user/google";
  return CallAPI.post(url, {
    subject_token,
    username,
    email,
  });
};

export const registerUserApi = (payload) => {
  const url = "/user/user";
  const { username, email, password, repassword } = payload;
  return CallAPI.post(url, {
    username,
    email,
    password,
    repassword,
  });
};

export const getRefreshTokenApi = (payload) => {
  const { refreshToken } = payload;
  const url = "/update-token";
  return CallAPI.post(url, {
    refresh_token: refreshToken,
  });
};
