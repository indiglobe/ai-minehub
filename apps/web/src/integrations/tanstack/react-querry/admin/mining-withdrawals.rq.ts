
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { serverFn__readMiningWalletWithdrawStats } from "@/integrations/server-function/mining-wallet-withdraw";

// Query keys
export const adminMiningWithdrawalQueryKeys = {
  all: ["admin", "mining", "withdrawals"] as const,

  stats: () => [...adminMiningWithdrawalQueryKeys.all, "stats"] as const,

  statsByStatus: (status: "PENDING" | "PROCESSED") =>
    [...adminMiningWithdrawalQueryKeys.stats(), status] as const,
};

// Withdrawal statistics by status
export function useReadMiningWalletWithdrawalStats(
  status: "PENDING" | "PROCESSED",
) {
  const readMiningWalletWithdrawStats = useServerFn(
    serverFn__readMiningWalletWithdrawStats,
  );

  return useQuery(
    queryOptions({
      queryKey: adminMiningWithdrawalQueryKeys.statsByStatus(status),

      queryFn: () =>
        readMiningWalletWithdrawStats({
          data: {
            identifier: { status },
          },
        }),
    }),
  );
}

// Convenience hook
export function useReadMiningWalletPendingWithdrawalStats() {
  return useReadMiningWalletWithdrawalStats("PENDING");
}
