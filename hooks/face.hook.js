import { useMutation } from "react-query";
import { faceRegApi } from "../api/face.api";

export const useFaceRegApi = (payload) =>
  useMutation({
    mutationFn: (payload) => faceRegApi(payload),
  });
