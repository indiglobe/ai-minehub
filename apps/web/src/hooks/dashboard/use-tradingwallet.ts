import {
  useMutation,
  useQuery,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";
import { serverFn__readOneUser } from "@/integrations/server-function/user";
import {
serverFn__createTradingWallet,
} from "@/integrations/server-function/trading-wallet";
import { useServerFn } from "@tanstack/react-start";
import { DASHBOARD, TRADING_WALLET } from "@/utils/mutation-keys";
import { useRouteContext } from "@tanstack/react-router";

export function useFetchTradingWallet() {
  const readOneUser = useServerFn(serverFn__readOneUser);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  return useQuery(
    queryOptions({
      queryKey: [DASHBOARD, TRADING_WALLET],

      queryFn: () =>
        readOneUser({
          data: {
            identifier: {
              id: userId,
            },
            joinOptions: {
              tradingWallet: true,
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
