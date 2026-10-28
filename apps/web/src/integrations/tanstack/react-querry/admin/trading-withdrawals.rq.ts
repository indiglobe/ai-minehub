
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { serverFn__readTradingWalletWithdrawStats } from "@/integrations/server-function/trading-wallet-withdraw";

// Query keys
export const adminTradingWithdrawalQueryKeys = {
  all: ["admin", "trading", "withdrawals"] as const,

  stats: () => [...adminTradingWithdrawalQueryKeys.all, "stats"] as const,

  statsByStatus: (status: "PENDING" | "PROCESSED") =>
    [...adminTradingWithdrawalQueryKeys.stats(), status] as const,
};

// Withdrawal statistics by status
export function useReadTradingWalletWithdrawalStats(
  status: "PENDING" | "PROCESSED",
) {
  const readTradingWalletWithdrawStats = useServerFn(
    serverFn__readTradingWalletWithdrawStats,
  );

  return useQuery(
    queryOptions({
      queryKey: adminTradingWithdrawalQueryKeys.statsByStatus(status),

      queryFn: () =>
        readTradingWalletWithdrawStats({
          data: {
            identifier: { status },
          },
        }),
    }),
  );
}

// Convenience hook
export function useReadTradingWalletPendingWithdrawalStats() {
  return useReadTradingWalletWithdrawalStats("PENDING");
}
