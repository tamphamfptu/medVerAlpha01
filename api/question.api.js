import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getQuestionBankApi = (payload) => {
  const url = "/questionBank";
  return CallAPI.post(url);
};
export const saveQuizResultApi = (payload) => {
  const { questionBankId, optionId } = payload;
  const url = "/result";
  return CallAPI.post(url, { questionBankId, optionId });
};
export const getQuizResultByIdApi = (resultId) => {
  const url = "/result/" + `${resultId}`;
  return CallAPI.get(url);
};

export const isValidQuiz = (payload) => {
  const url = "/questionBank";
  return CallAPI.get(url);
};

export const getFinishedQuiz = (payload) => {
  const url = "/questionBank/user";
  return CallAPI.get(url);
};
export const getFinishedQuizHistory = (userId) => {
  const url = "/result/user/" + `${userId}`;
  return CallAPI.get(url);
};

export const setQuizStatus = (quesBankId) => {
  const url = "/questionBank/" + `${quesBankId}`;
  return CallAPI.patch(url);
};
