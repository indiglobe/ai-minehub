import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { WITHDRAWL_STATUS } from "@repo/utils/db-enums";
import {
  serverFn__readMiningWalletMonthlyWithdrawStats,
  serverFn__readMiningWalletWithdrawStats,
  serverFn__readAllMiningWalletWithdraw,
  serverFn__updateMiningWalletWithdraw,
} from "@/integrations/tanstack/server-function/mining-wallet-withdraw.sfn";

type TWITHDRAWL_STATUS = (typeof WITHDRAWL_STATUS)[number];

export const queryKeys = {
  __: () => ["mining-wallet-withdraw", "admin"],

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

function useReadPendingMiningWalletWithdrawlsStats() {
  const readMiningWalletWithdrawStats = useServerFn(
    serverFn__readMiningWalletWithdrawStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.stats.withStatus("PENDING"),

      queryFn: () =>
        readMiningWalletWithdrawStats({
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

function useReadMiningWalletMonthlyWithdrawStats() {
  const readMiningWalletMonthlyWithdrawStats = useServerFn(
    serverFn__readMiningWalletMonthlyWithdrawStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.stats.monthly(),

      queryFn: () => readMiningWalletMonthlyWithdrawStats(),
    }),
  );
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadPendingMiningWalletWithdraw() {
  const readAllMiningWalletWithdraw = useServerFn(
    serverFn__readAllMiningWalletWithdraw,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.withStatus("PENDING"),

      queryFn: () =>
        readAllMiningWalletWithdraw({
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

function useUpdateMiningWalletWithdraw() {
  const queryClient = useQueryClient();

  const updateMiningWalletWithdraw = useServerFn(
    serverFn__updateMiningWalletWithdraw,
  );

  return useMutation({
    mutationFn: updateMiningWalletWithdraw,

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

function useReadAllMiningWalletWithdrawOfUser(userId: string) {
  const readAllMiningWalletWithdraw = useServerFn(
    serverFn__readAllMiningWalletWithdraw,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.withUserId.__(userId),

      queryFn: () =>
        readAllMiningWalletWithdraw({
          data: { identifier: { orderedBy: userId } },
        }),

      enabled: !!userId,
    }),
  );
}

export {
  useReadPendingMiningWalletWithdrawlsStats,
  useReadMiningWalletMonthlyWithdrawStats,
  useReadPendingMiningWalletWithdraw,
  useUpdateMiningWalletWithdraw,
  useReadAllMiningWalletWithdrawOfUser,
};
