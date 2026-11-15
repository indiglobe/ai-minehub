import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serverFn__createTradingWalletWithdraw } from "@/integrations/tanstack/server-function/trading-wallet-withdraw.sfn";
import { useServerFn } from "@tanstack/react-start";
import { tradingWalletDepositQueryKeys } from "@/integrations/tanstack/react-querry/trading-wallet-deposits/basic.rq";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export const tradingWalletWithdrawQueryKeys = {
  all: () => ["trading-wallet-withdraw", "basic"] as const,

  list: {
    all: () => [...tradingWalletWithdrawQueryKeys.all(), "list"] as const,
  },
} as const;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useCreateTradingWalletWithdraw() {
  const queryClient = useQueryClient();

  const createTradingWalletWithdraw = useServerFn(
    serverFn__createTradingWalletWithdraw,
  );

  return useMutation({
    mutationFn: createTradingWalletWithdraw,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: tradingWalletWithdrawQueryKeys.all(),
        }),

        queryClient.invalidateQueries({
          queryKey: tradingWalletDepositQueryKeys.all(),
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

  useCreateTradingWalletWithdraw,
};
