import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { serverFn__createMiningWalletDeposit } from "@/integrations/tanstack/server-function/mining-wallet-deposits.sfn";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export const miningWalletDepositQueryKeys = {
  all: () => ["mining-wallet-deposits", "basic"] as const,

  list: {
    all: () => [...miningWalletDepositQueryKeys.all(), "list"] as const,
  },
} as const;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useCreateMiningWalletDeposit() {
  const queryClient = useQueryClient();

  const createMiningWalletDeposit = useServerFn(
    serverFn__createMiningWalletDeposit,
  );

  return useMutation({
    mutationFn: createMiningWalletDeposit,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: miningWalletDepositQueryKeys.all(),
      });
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

  useCreateMiningWalletDeposit,
};
