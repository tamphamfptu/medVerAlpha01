import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getArtistWalletApi = (payload) => {
  const artist = store.getState()?.user?.user;
  const artistId = artist?.user_db?.id;
  const queryParam = `/` + `${artistId}`;
  const url = "/wallets" + `${queryParam}`;
  return CallAPI.get(url);
};
