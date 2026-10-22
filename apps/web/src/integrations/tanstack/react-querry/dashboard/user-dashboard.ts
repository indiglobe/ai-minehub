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
} from "@/integrations/server-function/mining-wallet";
import {
  serverFn__createTradingWallet,
  serverFn__readOneTradingWallet,
} from "@/integrations/server-function/trading-wallet";
import { serverFn__readAllMiningOrders } from "@/integrations/server-function/mining-order";
import { serverFn__readAllTradingOrders } from "@/integrations/server-function/trading-order";
import { serverFn__readAllMiningProfiles } from "@/integrations/server-function/mining-profile";
import type { INVESTMENT_STATUS } from "@repo/utils/db-enums";
import { serverFn__createMiningWalletDeposite } from "@/integrations/server-function/mining-wallet-deposits";
import { serverFn__createTradingWalletDeposite } from "@/integrations/server-function/trading-wallet-deposits";
import { serverFn__readAllReferalEarning } from "@/integrations/server-function/referal-earning";

export type TRrecentTransactionsOptions = { userId: string };

// Hierarchical query keys factory scoped by user and resource type
export const queryKeys = {
  all: ["user"] as const,

  user: (userId: string) => [...queryKeys.all, userId] as const,

  mining: {
    all: (userId: string) => [...queryKeys.user(userId), "mining"] as const,
    orders: (userId: string, filters?: Record<string, any>) =>
      [...queryKeys.mining.all(userId), "orders", filters] as const,
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

export function useReadActiveMiningSessions() {
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);
  const readAllMiningProfiles = useServerFn(serverFn__readAllMiningProfiles);

  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  return useQuery(
    queryOptions({
      queryKey: queryKeys.mining.orders(userId, { miningStatus: "ACTIVE" }),

      queryFn: async () => {
        const [allActiveMiningOrders, allMiningProfiles] = await Promise.all([
          readAllMiningOrders({
            data: {
              identifier: { userId: userId, miningStatus: "ACTIVE" },
            },
          }),
          readAllMiningProfiles(),
        ]);

        return { allActiveMiningOrders, allMiningProfiles };
      },

      select: (data) => {
        const { allActiveMiningOrders, allMiningProfiles } = data;

        return allActiveMiningOrders.map(({ miningProfileUsed, ...rest }) => {
          const miningProfile = allMiningProfiles.find(
            (p) => p.id === miningProfileUsed,
          )!;

          return { ...rest, miningProfileUsed, miningProfile };
        });
      },
    }),
  );
}

export function useInvestmentData() {
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);
  const readAllTradingOrders = useServerFn(serverFn__readAllTradingOrders);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.dashboard.investmentData(userId),

      queryFn: async () => {
        const [allMiningOrders, allTradingOrders] = await Promise.all([
          readAllMiningOrders({ data: { identifier: { userId } } }),
          readAllTradingOrders({ data: { identifier: { userId } } }),
        ]);

        return { allMiningOrders, allTradingOrders };
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
          };

          if (miningOrder.miningStatus === "ACTIVE") {
            output = {
              ...output,
              activeInvestmentsCount: output.activeInvestmentsCount + 1,
            };
          }
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

export function useMiningOrdersData() {
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);

  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  return useQuery(
    queryOptions({
      queryKey: queryKeys.mining.orders(userId, { miningStatus: "ACTIVE" }),

      queryFn: async () => {
        const result = await readAllMiningOrders({
          data: {
            identifier: { userId: userId, miningStatus: "ACTIVE" },
          },
        });

        return result;
      },
    }),
  );
}

export function useReadMiningWallet() {
  const readOneMiningWallet = useServerFn(serverFn__readOneMiningWallet);

  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

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
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  return useMutation({
    mutationFn: createMiningWallet,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mining.wallet(userId),
      });
    },
  });
}

export function useCreateMiningWalletDeposits() {
  const createMiningWalletDeposite = useServerFn(
    serverFn__createMiningWalletDeposite,
  );
  const queryClient = useQueryClient();
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  return useMutation({
    mutationFn: createMiningWalletDeposite,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mining.wallet(userId),
      });
    },
  });
}

export function useReadTradingWallet() {
  const readOneTradingWallet = useServerFn(serverFn__readOneTradingWallet);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  return useQuery(
    queryOptions({
      queryKey: queryKeys.trading.wallet(userId),

      queryFn: () =>
        readOneTradingWallet({
          data: {
            identifier: { associatedUserId: userId },
          },
        }),
    }),
  );
}

export function useReadAllReferalEarning() {
  const readAllReferalEarning = useServerFn(serverFn__readAllReferalEarning);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  return useQuery(
    queryOptions({
      queryKey: queryKeys.referrals.all(userId),

      queryFn: () =>
        readAllReferalEarning({
          data: {
            identifier: { userId: userId },
          },
        }),
    }),
  );
}

export function useCreateTradingWallet() {
  const createTradingWallet = useServerFn(serverFn__createTradingWallet);
  const queryClient = useQueryClient();
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  return useMutation({
    mutationFn: createTradingWallet,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.trading.wallet(userId),
      });
    },
  });
}

export function useCreateTradingWalletDeposits() {
  const createTradingWalletDeposite = useServerFn(
    serverFn__createTradingWalletDeposite,
  );
  const queryClient = useQueryClient();
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  return useMutation({
    mutationFn: createTradingWalletDeposite,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.trading.wallet(userId),
      });
    },
  });
}

export function useTradingOrdersData() {
  const readAllTradingOrders = useServerFn(serverFn__readAllTradingOrders);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  return useQuery(
    queryOptions({
      queryKey: queryKeys.trading.orders(userId),

      queryFn: async () => {
        const result = await readAllTradingOrders({
          data: {
            identifier: { userId: userId },
          },
        });

        return result;
      },
    }),
  );
}

export function 
useRecentTransactionsHistory() {
  const readAllTradingOrders = useServerFn(serverFn__readAllTradingOrders);
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  type TRespose = {
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
        const [tradingOrdersResult, miningOrdersResult] = await Promise.all([
          readAllTradingOrders({
            data: {
              identifier: { userId: userId },
            },
          }),
          readAllMiningOrders({
            data: {
              identifier: { userId: userId },
            },
          }),
        ]);

        return { miningOrdersResult, tradingOrdersResult };
      },

      select: (data) => {
        const { miningOrdersResult, tradingOrdersResult } = data;

        const response: TRespose[] = [];

        tradingOrdersResult.forEach((order) => {
          const filteredFields: TRespose = {
            amount: order.amountInvested,
            category: "Trading order",
            type: "spend",
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            id: order.id,
            status: order.tradingStatus,
          };

          response.push(filteredFields);
        });

        miningOrdersResult.forEach((order) => {
          const filteredFields: TRespose = {
            amount: order.amountInvested,
            category: "Mining order",
            type: "spend",
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            id: order.id,
            status: order.miningStatus,
          };

          response.push(filteredFields);
        });

        return response
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(0, 10);
      },
    }),
  );
}
