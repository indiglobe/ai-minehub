import {
  serverFn__readAllTradingWalletDeposit,
  serverFn__readTradingWalletDepositStats,
  serverFn__readTradingWalletMonthlyDepositStats,
  serverFn__updateTradingWalletDeposit,
} from "@/integrations/tanstack/server-function/trading-wallet-deposits.sfn";
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
  __: () => ["trading-wallet-deposits", "admin"],

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

function useReadPendingTradingWalletDepositStats() {
  const readTradingWalletDepositStats = useServerFn(
    serverFn__readTradingWalletDepositStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.stats.withStatus("PENDING"),

      queryFn: () =>
        readTradingWalletDepositStats({
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

function useReadProcessedTradingWalletDepositStats() {
  const readTradingWalletDepositStats = useServerFn(
    serverFn__readTradingWalletDepositStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.stats.withStatus("PROCESSED"),

      queryFn: () =>
        readTradingWalletDepositStats({
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

function useReadTradingWalletMonthlyDepositStats() {
  const readTradingWalletMonthlyDepositStats = useServerFn(
    serverFn__readTradingWalletMonthlyDepositStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.stats.monthly(),

      queryFn: () => readTradingWalletMonthlyDepositStats(),
    }),
  );
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */
function useReadPendingTradingWalletDeposit() {
  const readAllTradingWalletDeposit = useServerFn(
    serverFn__readAllTradingWalletDeposit,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.withStatus.__("PENDING"),

      queryFn: () =>
        readAllTradingWalletDeposit({
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

function useUpdateTradingWalletDeposit() {
  const updateTradingWalletDeposit = useServerFn(
    serverFn__updateTradingWalletDeposit,
  );

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTradingWalletDeposit,

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

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadAllTradingWalletDepositOfUser(userId: string) {
  const readAllTradingWalletDeposit = useServerFn(
    serverFn__readAllTradingWalletDeposit,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.withUserId.__(userId),

      queryFn: () =>
        readAllTradingWalletDeposit({
          data: { identifier: { orderedBy: userId } },
        }),

      enabled: !!userId,
    }),
  );
}

export {
  useReadPendingTradingWalletDepositStats,
  useReadProcessedTradingWalletDepositStats,
  useReadTradingWalletMonthlyDepositStats,
  useReadPendingTradingWalletDeposit,
  useUpdateTradingWalletDeposit,
  useReadAllTradingWalletDepositOfUser,
};
