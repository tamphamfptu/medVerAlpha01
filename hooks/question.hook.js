import { useMutation, useQuery } from "react-query";
import {
  getFinishedQuiz,
  getFinishedQuizHistory,
  getQuestionBankApi,
  getQuizResultByIdApi,
  isValidQuiz,
  saveQuizResultApi,
  setQuizStatus,
} from "../api/question.api";

export const useGetQuestionBankApi = (payload) =>
  useQuery({
    queryKey: ["getQuestionBank"],
    queryFn: async () => {
      const data = await getQuestionBankApi();
      return data;
    },
  });
export const useFinishedQuiz = (payload) =>
  useQuery({
    queryKey: ["getFinishedQuiz"],
    queryFn: async () => {
      const data = await getFinishedQuiz();
      return data;
    },
  });

export const useIsValidQuiz = (payload) =>
  useQuery({
    queryKey: ["getValidQuiz"],
    queryFn: async () => {
      const data = await isValidQuiz();
      return data;
    },
  });
export const useGetFinishedQuizHistoryApi = (payload) =>
  useQuery({
    queryKey: ["getFinishedQuizHistory"],
    queryFn: async () => {
      const data = await getFinishedQuizHistory(payload);
      return data;
    },
  });
export const useGetResultByIdApi = (payload) =>
  useQuery({
    queryKey: ["getGetResultById"],
    queryFn: async () => {
      const data = await getQuizResultByIdApi(payload);
      return data;
    },
    enabled: !!payload,
  });
export const useSetQuizStatus = (payload) =>
  useMutation({
    mutationFn: (payload) => setQuizStatus(payload),
  });
export const useSaveQuizResultApi = (payload) =>
  useMutation({
    mutationFn: (payload) => saveQuizResultApi(payload),
  });
