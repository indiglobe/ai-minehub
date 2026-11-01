import {
  serverFn__updateAddBalance,
  serverFn__updateDeductBalance,
  serverFn__readOneMiningWallet,
} from "@/integrations/tanstack/server-function/mining-wallet.sfn";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

export const queryKeys = {
  __: () => ["mining-wallet", "admin"],

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

function useAddMiningWalletBalance() {
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

function useDeductMiningWalletBalance() {
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

function useReadOneMiningWallet(userId: string) {
  const readOneMiningWallet = useServerFn(serverFn__readOneMiningWallet);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.detail.byUserId(userId),

      queryFn: () =>
        readOneMiningWallet({
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
  useAddMiningWalletBalance,
  useDeductMiningWalletBalance,
  useReadOneMiningWallet,
};
