import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { serverFn__createTradingWalletDeposit } from "@/integrations/tanstack/server-function/trading-wallet-deposits.sfn";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export const tradingWalletDepositQueryKeys = {
  all: () => ["trading-wallet-deposits", "basic"] as const,

  list: {
    all: () => [...tradingWalletDepositQueryKeys.all(), "list"] as const,
  },
} as const;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useCreateTradingWalletDeposit() {
  const queryClient = useQueryClient();

  const createTradingWalletDeposit = useServerFn(
    serverFn__createTradingWalletDeposit,
  );

  return useMutation({
    mutationFn: createTradingWalletDeposit,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: tradingWalletDepositQueryKeys.all(),
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

  useCreateTradingWalletDeposit,
};
