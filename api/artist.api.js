import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getArtistTotalFollowerApi = (payload) => {
  const user = store.getState()?.user?.user;
  const artistId = user?.user_db?.id;
  const queryParam = `/` + `${artistId}`;
  if (!artistId) return;
  const url = "/followedArtist" + `${queryParam}`;
  return CallAPI.get(url);
};
