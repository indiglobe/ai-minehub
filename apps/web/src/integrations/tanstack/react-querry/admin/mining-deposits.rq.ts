
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import {
  serverFn__readAllMiningWalletDeposite,
  serverFn__readMiningWalletDepositStats,
} from "@/integrations/server-function/mining-wallet-deposits";

// Query keys
export const adminMiningDepositQueryKeys = {
  all: ["admin", "mining", "deposits"] as const,

  lists: () => [...adminMiningDepositQueryKeys.all, "list"] as const,

  listByStatus: (status: "PENDING" | "PROCESSED") =>
    [...adminMiningDepositQueryKeys.lists(), status] as const,

  stats: () => [...adminMiningDepositQueryKeys.all, "stats"] as const,

  statsByStatus: (status: "PENDING" | "PROCESSED") =>
    [...adminMiningDepositQueryKeys.stats(), status] as const,
};

// Pending mining deposits list
export function useReadAllPendingMiningWalletDeposits() {
  const readAllMiningWalletDeposite = useServerFn(
    serverFn__readAllMiningWalletDeposite,
  );

  return useQuery(
    queryOptions({
      queryKey: adminMiningDepositQueryKeys.listByStatus("PENDING"),

      queryFn: () =>
        readAllMiningWalletDeposite({
          data: {
            identifier: { status: "PENDING" },
          },
        }),
    }),
  );
}

// Mining deposit statistics by status
export function useReadMiningWalletDepositStats(
  status: "PENDING" | "PROCESSED",
) {
  const readMiningWalletDepositStats = useServerFn(
    serverFn__readMiningWalletDepositStats,
  );

  return useQuery(
    queryOptions({
      queryKey: adminMiningDepositQueryKeys.statsByStatus(status),

      queryFn: () =>
        readMiningWalletDepositStats({
          data: {
            identifier: { status },
          },
        }),
    }),
  );
}

// Convenience hooks preserving your previous API
export function useReadMiningWalletPendingDepositStats() {
  return useReadMiningWalletDepositStats("PENDING");
}

export function useReadMiningWalletProcessedDepositStats() {
  return useReadMiningWalletDepositStats("PROCESSED");
}
