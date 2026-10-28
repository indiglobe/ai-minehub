
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { serverFn__readTradingWalletDepositStats } from "@/integrations/server-function/trading-wallet-deposits";

// Query keys
export const adminTradingDepositQueryKeys = {
  all: ["admin", "trading", "deposits"] as const,

  stats: () => [...adminTradingDepositQueryKeys.all, "stats"] as const,

  statsByStatus: (status: "PENDING" | "PROCESSED") =>
    [...adminTradingDepositQueryKeys.stats(), status] as const,
};

// Deposit statistics by status
export function useReadTradingWalletDepositStats(
  status: "PENDING" | "PROCESSED",
) {
  const readTradingWalletDepositStats = useServerFn(
    serverFn__readTradingWalletDepositStats,
  );

  return useQuery(
    queryOptions({
      queryKey: adminTradingDepositQueryKeys.statsByStatus(status),

      queryFn: () =>
        readTradingWalletDepositStats({
          data: {
            identifier: { status },
          },
        }),
    }),
  );
}

// Convenience hooks
export function useReadTradingWalletPendingDepositStats() {
  return useReadTradingWalletDepositStats("PENDING");
}

export function useReadTradingWalletProcessedDepositStats() {
  return useReadTradingWalletDepositStats("PROCESSED");
}
