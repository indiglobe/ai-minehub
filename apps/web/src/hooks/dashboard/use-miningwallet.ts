import {
  useMutation,
  useQuery,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";
import { serverFn__readOneUser } from "@/integrations/server-function/user";
import { serverFn__createMiningWallet } from "@/integrations/server-function/mining-wallet";
import { useServerFn } from "@tanstack/react-start";
import { DASHBOARD, MINING_WALLET } from "@/utils/mutation-keys";
import { useRouteContext } from "@tanstack/react-router";

export function useFetchMiningWallet() {
  const readOneUser = useServerFn(serverFn__readOneUser);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  return useQuery(
    queryOptions({
      queryKey: [DASHBOARD, MINING_WALLET],

      queryFn: () =>
        readOneUser({
          data: {
            identifier: {
              id: userId,
            },
            joinOptions: {
              miningWallet: true,
            },
          },
        }),
    }),
  );
}

export function useCreateMiningWallet() {
  const createMiningWallet = useServerFn(serverFn__createMiningWallet);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DASHBOARD, MINING_WALLET],

    mutationFn: createMiningWallet,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DASHBOARD, MINING_WALLET],
      });
    },
  });
}
