import { useQuery } from "react-query";
import { getArtistWalletApi } from "../api/wallet.api";

export const useGetArtistWalletApi = (payload) =>
  useQuery({
    queryKey: ["getWallet"],
    queryFn: async () => {
      const data = await getArtistWalletApi();
      return data;
    },
  });
