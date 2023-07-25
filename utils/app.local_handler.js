import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY_STORAGE, USER_KEY_STORAGE } from "../constants/config";

export const getTokenFromLocal = async () => {
  try {
    const value = await AsyncStorage.getItem(TOKEN_KEY_STORAGE);
    if (value !== null) {
      try {
        return JSON.parse(value);
      } catch (error) {
        console.log("Failed to parse token:", error);
      }
    }
  } catch (e) {
    console.log("fetch_token_local_fail");
  }
};

export const getUserFromLocal = async () => {
  try {
    const value = await AsyncStorage.getItem(USER_KEY_STORAGE);
    if (value !== null) {
      try {
        return JSON.parse(value);
      } catch (error) {
        console.log("Failed to parse user:", error);
      }
    }
  } catch (e) {
    console.log("fetch_user_local_fail");
  }
};

export const storeTokenToLocal = async (payload) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY_STORAGE, JSON.stringify(payload));
  } catch (error) {
    console.log("store_token_error: ", error);
  }
};
export const storeUserToLocal = async (payload) => {
  try {
    await AsyncStorage.setItem(USER_KEY_STORAGE, JSON.stringify(payload));
  } catch (error) {
    console.log("store_token_error: ", error);
  }
};

export const removeAllDataFromLocal = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY_STORAGE);
    await AsyncStorage.removeItem(USER_KEY_STORAGE);
  } catch (error) {
    console.log("remove_all_data: ", error);
  }
};
