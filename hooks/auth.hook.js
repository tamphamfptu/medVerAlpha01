import { useMutation } from "react-query";
import {
  getRefreshTokenApi,
  loginApi,
  loginWithGoogleApi,
  registerUserApi,
} from "../api/auth.api";

export const useLogin = (payload) =>
  useMutation({
    mutationFn: (payload) => loginApi(payload),
  });
export const useLoginWithGmail = (payload) =>
  useMutation({
    mutationFn: (payload) => loginWithGoogleApi(payload),
  });

export const useRegisterUser = (payload) =>
  useMutation({
    mutationFn: (payload) => registerUserApi(payload),
  });

export const useRefreshToken = (payload) =>
  useMutation({
    mutationFn: (payload) => getRefreshTokenApi(payload),
  });
