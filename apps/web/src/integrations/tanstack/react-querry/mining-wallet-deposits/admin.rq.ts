import {
  serverFn__readMiningWalletDepositStats,
  serverFn__readMiningWalletMonthlyDepositStats,
  serverFn__readAllMiningWalletDeposit,
  serverFn__updateMiningWalletDeposit,
} from "@/integrations/tanstack/server-function/mining-wallet-deposits.sfn";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { DEPOSIT_STATUS } from "@repo/utils/db-enums";

type TDEPOSIT_STATUS = (typeof DEPOSIT_STATUS)[number];

export const queryKeys = {
  __: () => ["mining-wallet-deposits", "admin"],

  stats: {
    __: () => [...queryKeys.__(), "stats"],

    monthly: () => [...queryKeys.stats.__(), "monthly"],

    withStatus: (status: TDEPOSIT_STATUS | TDEPOSIT_STATUS[]) => [
      ...queryKeys.stats.__(),
      status,
    ],
  },

  withStatus: {
    __: (status: TDEPOSIT_STATUS | TDEPOSIT_STATUS[]) => [
      ...queryKeys.__(),
      status,
    ],
  },

  withUserId: {
    __: (userId: string) => [...queryKeys.__(), "user", userId],
  },
} as const;

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadPendingMiningWalletDepositStats() {
  const readMiningWalletDepositStats = useServerFn(
    serverFn__readMiningWalletDepositStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.stats.withStatus("PENDING"),

      queryFn: () =>
        readMiningWalletDepositStats({
          data: {
            identifier: { status: "PENDING" },
          },
        }),
    }),
  );
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadProcessedMiningWalletDepositStats() {
  const readMiningWalletDepositStats = useServerFn(
    serverFn__readMiningWalletDepositStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.stats.withStatus("PROCESSED"),

      queryFn: () =>
        readMiningWalletDepositStats({
          data: {
            identifier: { status: "PROCESSED" },
          },
        }),
    }),
  );
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadMiningWalletMonthlyDepositStats() {
  const readMiningWalletMonthlyDepositStats = useServerFn(
    serverFn__readMiningWalletMonthlyDepositStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.stats.monthly(),

      queryFn: () => readMiningWalletMonthlyDepositStats(),
    }),
  );
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadPendingMiningWalletDeposit() {
  const readAllMiningWalletDeposit = useServerFn(
    serverFn__readAllMiningWalletDeposit,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.withStatus.__("PENDING"),

      queryFn: () =>
        readAllMiningWalletDeposit({
          data: { identifier: { status: "PENDING" } },
        }),
    }),
  );
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadAllMiningWalletDepositOfUser(userId: string) {
  const readAllMiningWalletDeposit = useServerFn(
    serverFn__readAllMiningWalletDeposit,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.withUserId.__(userId),

      queryFn: () =>
        readAllMiningWalletDeposit({
          data: { identifier: { orderedBy: userId } },
        }),

      enabled: !!userId,
    }),
  );
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useUpdateMiningWalletDeposit() {
  const updateMiningWalletDeposit = useServerFn(
    serverFn__updateMiningWalletDeposit,
  );

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMiningWalletDeposit,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.stats.__(),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.withStatus.__("PENDING"),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.withStatus.__("PROCESSED"),
      });
    },
  });
}

export {
  useReadPendingMiningWalletDepositStats,
  useReadProcessedMiningWalletDepositStats,
  useReadMiningWalletMonthlyDepositStats,
  useReadPendingMiningWalletDeposit,
  useUpdateMiningWalletDeposit,
  useReadAllMiningWalletDepositOfUser,
};
