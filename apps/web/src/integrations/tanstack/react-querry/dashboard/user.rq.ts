import {
  useQuery,
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useRouteContext } from "@tanstack/react-router";
import {
  serverFn__createMiningWallet,
  serverFn__readOneMiningWallet,
  serverFn__updateOneMiningWallet,
} from "@/integrations/server-function/mining-wallet";
import {
  serverFn__createTradingWallet,
  serverFn__readOneTradingWallet,
} from "@/integrations/server-function/trading-wallet";
import {
  serverFn__createMiningOrder,
  serverFn__readAllMiningOrders,
} from "@/integrations/server-function/mining-order";
import { serverFn__readAllTradingOrders } from "@/integrations/server-function/trading-order";
import { serverFn__readAllMiningProfiles } from "@/integrations/server-function/mining-profile";
import type { INVESTMENT_STATUS } from "@repo/utils/db-enums";
import { serverFn__createMiningWalletDeposite } from "@/integrations/server-function/mining-wallet-deposits";
import { serverFn__createTradingWalletDeposite } from "@/integrations/server-function/trading-wallet-deposits";
import { serverFn__readAllReferalEarning } from "@/integrations/server-function/referal-earning";
import { serverFn__createTradingWalletWithdraw } from "@/integrations/server-function/trading-wallet-withdraw";
import { serverFn__createMiningWalletWithdraw } from "@/integrations/server-function/mining-wallet-withdraw";

export type TRrecentTransactionsOptions = {
  userId: string;
};

// -----------------------------------------------------------------------------
// Query keys
// -----------------------------------------------------------------------------

export const queryKeys = {
  all: ["user"] as const,

  user: (userId: string) => [...queryKeys.all, userId] as const,

  mining: {
    all: (userId: string) => [...queryKeys.user(userId), "mining"] as const,

    orders: (userId: string, filters?: Record<string, any>) =>
      [...queryKeys.mining.all(userId), "orders", filters] as const,

    activeSessions: (userId: string) =>
      [...queryKeys.mining.all(userId), "active-sessions"] as const,

    wallet: (userId: string) =>
      [...queryKeys.mining.all(userId), "wallet"] as const,

    profiles: () => ["mining-profiles"] as const,
  },

  trading: {
    all: (userId: string) => [...queryKeys.user(userId), "trading"] as const,

    orders: (userId: string, filters?: Record<string, any>) =>
      [...queryKeys.trading.all(userId), "orders", filters] as const,

    wallet: (userId: string) =>
      [...queryKeys.trading.all(userId), "wallet"] as const,
  },

  referrals: {
    all: (userId: string) => [...queryKeys.user(userId), "referrals"] as const,
  },

  dashboard: {
    all: (userId: string) => [...queryKeys.user(userId), "dashboard"] as const,

    investmentData: (userId: string) =>
      [...queryKeys.dashboard.all(userId), "investment"] as const,

    recentTransactions: (userId: string) =>
      [...queryKeys.dashboard.all(userId), "transactions"] as const,
  },
};

// -----------------------------------------------------------------------------
// Shared route context
// -----------------------------------------------------------------------------

function useAuthenticatedUserId() {
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  return userId;
}

// -----------------------------------------------------------------------------
// Mining queries
// -----------------------------------------------------------------------------

export function useReadActiveMiningSessions() {
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);

  const readAllMiningProfiles = useServerFn(serverFn__readAllMiningProfiles);

  const userId = useAuthenticatedUserId();

  return useQuery(
    queryOptions({
      queryKey: queryKeys.mining.activeSessions(userId),

      queryFn: async () => {
        const [allActiveMiningOrders, allMiningProfiles] = await Promise.all([
          readAllMiningOrders({
            data: {
              identifier: {
                userId,
                miningStatus: "ACTIVE",
              },
            },
          }),

          readAllMiningProfiles(),
        ]);

        return {
          allActiveMiningOrders,
          allMiningProfiles,
        };
      },

      select: (data) => {
        const { allActiveMiningOrders, allMiningProfiles } = data;

        return allActiveMiningOrders.map(({ miningProfileUsed, ...rest }) => {
          const miningProfile = allMiningProfiles.find(
            (profile) => profile.id === miningProfileUsed,
          );

          return {
            ...rest,
            miningProfileUsed,
            miningProfile,
          };
        });
      },
    }),
  );
}

export function useMiningOrdersData() {
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);

  const userId = useAuthenticatedUserId();

  return useQuery(
    queryOptions({
      queryKey: queryKeys.mining.orders(userId, {
        miningStatus: "ACTIVE",
      }),

      queryFn: () =>
        readAllMiningOrders({
          data: {
            identifier: {
              userId,
              miningStatus: "ACTIVE",
            },
          },
        }),
    }),
  );
}

// -----------------------------------------------------------------------------
// Create mining order mutation
// -----------------------------------------------------------------------------

export function useCreateMiningOrder() {
  const createMiningOrder = useServerFn(serverFn__createMiningOrder);

  const queryClient = useQueryClient();
  const userId = useAuthenticatedUserId();

  return useMutation({
    mutationFn: createMiningOrder,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.mining.all(userId),
        }),

        queryClient.invalidateQueries({
          queryKey: queryKeys.dashboard.investmentData(userId),
        }),

        queryClient.invalidateQueries({
          queryKey: queryKeys.dashboard.recentTransactions(userId),
        }),
      ]);
    },
  });
}

// -----------------------------------------------------------------------------
// Dashboard investment data
// -----------------------------------------------------------------------------

export function useInvestmentData() {
  const userId = useAuthenticatedUserId();

  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);

  const readAllTradingOrders = useServerFn(serverFn__readAllTradingOrders);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.dashboard.investmentData(userId),

      queryFn: async () => {
        const [allMiningOrders, allTradingOrders] = await Promise.all([
          readAllMiningOrders({
            data: {
              identifier: { userId },
            },
          }),

          readAllTradingOrders({
            data: {
              identifier: { userId },
            },
          }),
        ]);

        return {
          allMiningOrders,
          allTradingOrders,
        };
      },

      select: (data) => {
        let output = {
          investedAmount: 0,
          gainedAmount: 0,
          activeInvestmentsCount: 0,
        };

        data.allMiningOrders.forEach((miningOrder) => {
          output = {
            ...output,

            investedAmount: output.investedAmount + miningOrder.amountInvested,

            gainedAmount:
              output.gainedAmount +
              (miningOrder.amountReceived
                ? miningOrder.amountReceived - miningOrder.amountInvested
                : 0),

            activeInvestmentsCount:
              output.activeInvestmentsCount +
              (miningOrder.miningStatus === "ACTIVE" ? 1 : 0),
          };
        });

        data.allTradingOrders.forEach((tradingOrder) => {
          output = {
            ...output,

            investedAmount: output.investedAmount + tradingOrder.amountInvested,
          };
        });

        return output;
      },
    }),
  );
}

// -----------------------------------------------------------------------------
// Mining wallet queries and mutations
// -----------------------------------------------------------------------------

export function useReadMiningWallet() {
  const readOneMiningWallet = useServerFn(serverFn__readOneMiningWallet);

  const userId = useAuthenticatedUserId();

  return useQuery(
    queryOptions({
      queryKey: queryKeys.mining.wallet(userId),

      queryFn: () =>
        readOneMiningWallet({
          data: {
            identifier: {
              associatedUserId: userId,
            },
          },
        }),
    }),
  );
}

export function useCreateMiningWallet() {
  const createMiningWallet = useServerFn(serverFn__createMiningWallet);

  const queryClient = useQueryClient();
  const userId = useAuthenticatedUserId();

  return useMutation({
    mutationFn: createMiningWallet,

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.mining.wallet(userId),
      }),
  });
}

export function useCreateMiningWalletDeposits() {
  const createMiningWalletDeposite = useServerFn(
    serverFn__createMiningWalletDeposite,
  );

  const queryClient = useQueryClient();
  const userId = useAuthenticatedUserId();

  return useMutation({
    mutationFn: createMiningWalletDeposite,

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.mining.wallet(userId),
      }),
  });
}

export function useCreateMiningWalletWithdraws() {
  const createMiningWalletWithdraw = useServerFn(
    serverFn__createMiningWalletWithdraw,
  );

  const queryClient = useQueryClient();
  const userId = useAuthenticatedUserId();

  return useMutation({
    mutationFn: createMiningWalletWithdraw,

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.mining.wallet(userId),
      }),
  });
}

// -----------------------------------------------------------------------------
// Trading wallet queries and mutations
// -----------------------------------------------------------------------------

export function useReadTradingWallet() {
  const readOneTradingWallet = useServerFn(serverFn__readOneTradingWallet);

  const userId = useAuthenticatedUserId();

  return useQuery(
    queryOptions({
      queryKey: queryKeys.trading.wallet(userId),

      queryFn: () =>
        readOneTradingWallet({
          data: {
            identifier: {
              associatedUserId: userId,
            },
          },
        }),
    }),
  );
}

export function useCreateTradingWallet() {
  const createTradingWallet = useServerFn(serverFn__createTradingWallet);

  const queryClient = useQueryClient();
  const userId = useAuthenticatedUserId();

  return useMutation({
    mutationFn: createTradingWallet,

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.trading.wallet(userId),
      }),
  });
}

export function useUpdateOneMiningWallet() {
  const updateOneMiningWallet = useServerFn(serverFn__updateOneMiningWallet);

  const queryClient = useQueryClient();
  const userId = useAuthenticatedUserId();

  return useMutation({
    mutationFn: updateOneMiningWallet,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mining.wallet(userId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.investmentData(userId),
      });
    },
  });
}

export function useCreateTradingWalletWithdraw() {
  const createTradingWalletWithdraw = useServerFn(
    serverFn__createTradingWalletWithdraw,
  );

  const queryClient = useQueryClient();
  const userId = useAuthenticatedUserId();

  return useMutation({
    mutationFn: createTradingWalletWithdraw,

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.trading.wallet(userId),
      }),
  });
}

export function useCreateTradingWalletDeposits() {
  const createTradingWalletDeposite = useServerFn(
    serverFn__createTradingWalletDeposite,
  );

  const queryClient = useQueryClient();
  const userId = useAuthenticatedUserId();

  return useMutation({
    mutationFn: createTradingWalletDeposite,

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.trading.wallet(userId),
      }),
  });
}

// -----------------------------------------------------------------------------
// Trading orders query
// -----------------------------------------------------------------------------

export function useTradingOrdersData() {
  const readAllTradingOrders = useServerFn(serverFn__readAllTradingOrders);

  const userId = useAuthenticatedUserId();

  return useQuery(
    queryOptions({
      queryKey: queryKeys.trading.orders(userId),

      queryFn: () =>
        readAllTradingOrders({
          data: {
            identifier: { userId },
          },
        }),
    }),
  );
}

// -----------------------------------------------------------------------------
// Referral earnings query
// -----------------------------------------------------------------------------

export function useReadAllReferalEarning() {
  const readAllReferalEarning = useServerFn(serverFn__readAllReferalEarning);

  const userId = useAuthenticatedUserId();

  return useQuery(
    queryOptions({
      queryKey: queryKeys.referrals.all(userId),

      queryFn: () =>
        readAllReferalEarning({
          data: {
            identifier: { userId },
          },
        }),
    }),
  );
}

// -----------------------------------------------------------------------------
// Recent transaction history
// -----------------------------------------------------------------------------

export function useRecentTransactionsHistory() {
  const readAllTradingOrders = useServerFn(serverFn__readAllTradingOrders);

  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);

  const readAllReferalEarning = useServerFn(serverFn__readAllReferalEarning);

  const userId = useAuthenticatedUserId();

  type TResponse = {
    id: string;
    status: (typeof INVESTMENT_STATUS)[number];
    category: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    type: "gain" | "receive" | "spend";
  };

  return useQuery(
    queryOptions({
      queryKey: queryKeys.dashboard.recentTransactions(userId),

      queryFn: async () => {
        const [tradingOrdersResult, miningOrdersResult, allReferalEarning] =
          await Promise.all([
            readAllTradingOrders({
              data: {
                identifier: { userId },
              },
            }),

            readAllMiningOrders({
              data: {
                identifier: { userId },
              },
            }),

            readAllReferalEarning({
              data: {
                identifier: { userId },
              },
            }),
          ]);

        return {
          miningOrdersResult,
          tradingOrdersResult,
          allReferalEarning,
        };
      },

      select: (data): TResponse[] => {
        const { miningOrdersResult, tradingOrdersResult, allReferalEarning } =
          data;

        const response: TResponse[] = [];

        tradingOrdersResult.forEach((order) => {
          response.push({
            amount: order.amountInvested,
            category: "Trading order",
            type: "spend",
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            id: order.id,
            status: order.tradingStatus,
          });
        });

        miningOrdersResult.forEach((order) => {
          response.push({
            amount: order.amountInvested,
            category: "Mining order",
            type: "spend",
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            id: order.id,
            status: order.miningStatus,
          });
        });

        allReferalEarning.forEach((order) => {
          response.push({
            amount: order.amount,
            category: "Referrals",
            type: "gain",
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            id: order.id,
            status: "COMPLETED",
          });
        });

        return response
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(0, 10);
      },
    }),
  );
}
