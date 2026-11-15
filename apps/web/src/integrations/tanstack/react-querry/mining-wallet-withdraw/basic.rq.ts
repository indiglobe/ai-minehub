import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serverFn__createMiningWalletWithdraw } from "@/integrations/tanstack/server-function/mining-wallet-withdraw.sfn";
import { useServerFn } from "@tanstack/react-start";
import { miningWalletDepositQueryKeys } from "@/integrations/tanstack/react-querry/mining-wallet-deposits/basic.rq";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export const miningWalletWithdrawQueryKeys = {
  all: () => ["mining-wallet-withdraw", "basic"] as const,

  list: {
    all: () => [...miningWalletWithdrawQueryKeys.all(), "list"] as const,
  },
} as const;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useCreateMiningWalletWithdraw() {
  const queryClient = useQueryClient();

  const createMiningWalletWithdraw = useServerFn(
    serverFn__createMiningWalletWithdraw,
  );

  return useMutation({
    mutationFn: createMiningWalletWithdraw,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: miningWalletWithdrawQueryKeys.all(),
        }),

        queryClient.invalidateQueries({
          queryKey: miningWalletDepositQueryKeys.all(),
        }),
      ]);
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export {
  //

  useCreateMiningWalletWithdraw,
};
