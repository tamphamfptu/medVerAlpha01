import FormData from "form-data";
import { CallAPIMulti } from "../core/api/baseAxios";

export const faceRegApi = (form) => {
  const url = "/face";
  return CallAPIMulti.post(url, form);
};
