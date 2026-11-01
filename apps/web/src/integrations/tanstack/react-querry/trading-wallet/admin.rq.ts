import {
  serverFn__updateAddBalance,
  serverFn__updateDeductBalance,
  serverFn__readOneTradingWallet,
} from "@/integrations/tanstack/server-function/trading-wallet.sfn";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

export const queryKeys = {
  __: () => ["trading-wallet", "admin"],

  detail: {
    __: () => [...queryKeys.__(), "detail"],

    byUserId: (userId: string) => [...queryKeys.detail.__(), userId],
  },
} as const;

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useAddTradingWalletBalance() {
  const queryClient = useQueryClient();

  const updateAddBalance = useServerFn(serverFn__updateAddBalance);

  return useMutation({
    mutationFn: updateAddBalance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.__(),
      });
    },
  });
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useDeductTradingWalletBalance() {
  const queryClient = useQueryClient();

  const updateDeductBalance = useServerFn(serverFn__updateDeductBalance);

  return useMutation({
    mutationFn: updateDeductBalance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.__(),
      });
    },
  });
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadOneTradingWallet(userId: string) {
  const readOneTradingWallet = useServerFn(serverFn__readOneTradingWallet);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.detail.byUserId(userId),

      queryFn: () =>
        readOneTradingWallet({
          data: {
            identifier: {
              associatedUserId: userId,
            },
          },
        }),

      enabled: !!userId,
    }),
  );
}

export {
  useAddTradingWalletBalance,
  useDeductTradingWalletBalance,
  useReadOneTradingWallet,
};
