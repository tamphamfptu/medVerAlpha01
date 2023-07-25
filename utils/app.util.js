import { USER_KEY_STORAGE } from "../constants/config";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../core/store/store";
import { Linking } from "react-native";

export const removeTokenFromStorage = () => {
  AsyncStorage.removeItem(USER_KEY_STORAGE);
};

export const parseTokenToUsername = (token) => {
  let token_decoded = jwtDecode(token);
  return token_decoded["preferred_username"];
};

export const parseTokenToUserId = (token) => {
  let token_decoded = jwtDecode(token);
  return token_decoded["sub"];
};

export const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

export const parseTokenToRole = (token) => {
  let token_decoded = jwtDecode(token);
  const resource_access = token_decoded["resource_access"];
  const med_app = resource_access["med-app"];
  const roles = med_app["roles"];
  const artist_role = roles.find((item) => item === "artist");
  return artist_role;
};

export const formatQuestionData = (originRaw) => {
  const dataRaw = JSON.parse(JSON.stringify(originRaw));
  const dataFormat = dataRaw.map((item) => {
    return {
      id: item["question"].id,
      question: item["question"].question,
      status: item["question"].status,
      option: item["question"].option,
      selected: null,
    };
  });
  return dataFormat;
};

export const getUserFromDb = () => {
  return store.getState()?.user?.user?.user_db;
};

export const handleWebNavigation = async (url) => {
  Linking.openURL(url)
    .then(() => console.log(`URL '${url}' opened successfully`))
    .catch((error) => console.log("An error occurred", error));
};
