import {
  useMutation,
  useQuery,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";
import {
  serverFn__createTradingWallet,
  serverFn__readOneTradingWallet,
} from "@/integrations/server-function/trading-wallet";
import { useServerFn } from "@tanstack/react-start";
import { DASHBOARD, TRADING_WALLET } from "@/utils/mutation-keys";
import { useRouteContext } from "@tanstack/react-router";

export function useFetchTradingWallet() {
  const readOneTradingWallet = useServerFn(serverFn__readOneTradingWallet);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  return useQuery(
    queryOptions({
      queryKey: [DASHBOARD, TRADING_WALLET],

      queryFn: () =>
        readOneTradingWallet({
          data: {
            identifier: {
              associatedUser: userId,
            },
          },
        }),
    }),
  );
}

export function useCreateTradingWallet() {
  const createTradingWallet = useServerFn(serverFn__createTradingWallet);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DASHBOARD, TRADING_WALLET],

    mutationFn: createTradingWallet,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DASHBOARD, TRADING_WALLET],
      });
    },
  });
}
