import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { WITHDRAWL_STATUS } from "@repo/utils/db-enums";
import {
  serverFn__readAllTradingWalletWithdraw,
  serverFn__readTradingWalletMonthlyWithdrawStats,
  serverFn__readTradingWalletWithdrawStats,
  serverFn__updateTradingWalletWithdraw,
} from "@/integrations/tanstack/server-function/trading-wallet-withdraw.sfn";

type TWITHDRAWL_STATUS = (typeof WITHDRAWL_STATUS)[number];

export const queryKeys = {
  __: () => ["trading-wallet-withdraw", "admin"],

  stats: {
    __: () => [...queryKeys.__(), "stats"],

    monthly: () => [...queryKeys.stats.__(), "monthly"],

    withStatus: (status: TWITHDRAWL_STATUS | TWITHDRAWL_STATUS[]) => [
      ...queryKeys.stats.__(),
      status,
    ],
  },

  withStatus: (status: TWITHDRAWL_STATUS | TWITHDRAWL_STATUS[]) => [
    ...queryKeys.__(),
    status,
  ],

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

function useReadPendingTradingWalletWithdrawlsStats() {
  const readTradingWalletWithdrawStats = useServerFn(
    serverFn__readTradingWalletWithdrawStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.stats.withStatus("PENDING"),

      queryFn: () =>
        readTradingWalletWithdrawStats({
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

function useReadTradingWalletMonthlyWithdrawStats() {
  const readTradingWalletMonthlyWithdrawStats = useServerFn(
    serverFn__readTradingWalletMonthlyWithdrawStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.stats.monthly(),

      queryFn: () => readTradingWalletMonthlyWithdrawStats(),
    }),
  );
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadPendingTradingWalletWithdraw() {
  const readAllTradingWalletWithdraw = useServerFn(
    serverFn__readAllTradingWalletWithdraw,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.withStatus("PENDING"),

      queryFn: () =>
        readAllTradingWalletWithdraw({
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

function useUpdateTradingWalletWithdraw() {
  const queryClient = useQueryClient();

  const updateTradingWalletWithdraw = useServerFn(
    serverFn__updateTradingWalletWithdraw,
  );

  return useMutation({
    mutationFn: updateTradingWalletWithdraw,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.stats.__(),
        }),

        queryClient.invalidateQueries({
          queryKey: queryKeys.__(),
        }),
      ]);
    },
  });
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadAllTradingWalletWithdrawOfUser(userId: string) {
  const readAllTradingWalletWithdraw = useServerFn(
    serverFn__readAllTradingWalletWithdraw,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.withUserId.__(userId),

      queryFn: () =>
        readAllTradingWalletWithdraw({
          data: { identifier: { orderedBy: userId } },
        }),

      enabled: !!userId,
    }),
  );
}

export {
  useReadPendingTradingWalletWithdrawlsStats,
  useReadTradingWalletMonthlyWithdrawStats,
  useReadPendingTradingWalletWithdraw,
  useUpdateTradingWalletWithdraw,useReadAllTradingWalletWithdrawOfUser
};
