import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getArtistTotalListenerApi = (payload) => {
  const artist = store.getState().user.user;
  const artistId = artist?.user_db?.id;
  if (!artistId) return;
  const queryParam = `/` + `${artistId}`;
  const url = "/history/count" + `${queryParam}`;
  return CallAPI.get(url);
};
