import {
  useQuery,
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { serverFn__readOneUser } from "@/integrations/server-function/user";
import { useServerFn } from "@tanstack/react-start";
import { useRouteContext } from "@tanstack/react-router";
import { serverFn__readAllMiningOrders } from "@/integrations/server-function/mining-order";
import {
  serverFn__createMiningWallet,
  serverFn__readOneMiningWallet,
} from "@/integrations/server-function/mining-wallet";
import {
  serverFn__createTradingWallet,
  serverFn__readOneTradingWallet,
} from "@/integrations/server-function/trading-wallet";
import { serverFn__readAllTradingOrders } from "@/integrations/server-function/trading-order";

export type TRrecentTransactionsOptions = { userId: string };

export const querryKeys = {
  all: () => ["dashboard"],
  activeMinigSessions: () => [...querryKeys.all(), "active-minig-sessions"],
  investmentDetails: () => [...querryKeys.all(), "investment-details"],
  miningOrders: () => [...querryKeys.all(), "mining-orders"],
  miningWallet: () => [...querryKeys.all(), "mining-wallet"],
  tradingWallet: () => [...querryKeys.all(), "trading-wallet"],
  recentTransactions: () => [...querryKeys.all(), "recent-transactions"],
  tradingOrders: () => [...querryKeys.all(), "trading-orders"],
};

export function useFetchActiveMiningSessions() {
  const readOneUser = useServerFn(serverFn__readOneUser);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  return useQuery(
    queryOptions({
      queryKey: querryKeys.activeMinigSessions(),

      queryFn: () =>
        readOneUser({
          data: {
            identifier: {
              id: userId,
            },
            joinOptions: {
              miningOrders: true,
            },
          },
        }),

      select: (data) => {
        if (!data) return null;

        const { miningOrders } = data;

        return miningOrders.filter(
          (orders) => orders.miningStatus === "active",
        );
      },
    }),
  );
}

export function useInvestmentData() {
  const readOneUser = useServerFn(serverFn__readOneUser);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  return useQuery(
    queryOptions({
      queryKey: querryKeys.investmentDetails(),

      queryFn: async () => {
        const result = await readOneUser({
          data: {
            identifier: {
              id: userId,
            },
            joinOptions: {
              miningOrders: true,
              tradingOrders: true,
            },
          },
        });

        return result;
      },

      select: (data) => {
        type TOutput = {
          activeInvestmentsCount: number;
          investedAmount: number;
          profitAmount: number;
        };

        let output: TOutput = {
          activeInvestmentsCount: 0,
          investedAmount: 0,
          profitAmount: 0,
        };

        data?.miningOrders.reduce((acc, curr) => {
          if (curr.miningStatus === "active") {
            output = {
              ...acc,
              activeInvestmentsCount: output.activeInvestmentsCount + 1,
            };
          }

          output = {
            ...acc,
            investedAmount: output.investedAmount + curr.amountInvested,
            profitAmount:
              output.profitAmount +
              (curr.amountRecived === null || curr.amountRecived === 0
                ? 0
                : curr.amountRecived - curr.amountInvested),
          };

          return output;
        }, output);

        data?.tradingOrders.reduce((acc, curr) => {
          if (curr.tradingStatus === "active") {
            output = {
              ...acc,
              activeInvestmentsCount: output.activeInvestmentsCount + 1,
            };
          }

          output = {
            ...acc,
            investedAmount: output.investedAmount + curr.amountInvested,
            profitAmount:
              output.profitAmount +
              (curr.amountRecived === null || curr.amountRecived === 0
                ? 0
                : curr.amountRecived - curr.amountInvested),
          };

          return output;
        }, output);

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
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  return useQuery(
    queryOptions({
      queryKey: querryKeys.miningOrders(),

      queryFn: async () => {
        const result = await readAllMiningOrders({
          data: {
            identifier: { userId: userId, miningStatus: "active" },
          },
        });

        return result;
      },
    }),
  );
}

export function useFetchMiningWallet() {
  const readOneMiningWallet = useServerFn(serverFn__readOneMiningWallet);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  return useQuery(
    queryOptions({
      queryKey: querryKeys.miningWallet(),

      queryFn: () =>
        readOneMiningWallet({
          data: {
            identifier: {
              associatedUser: userId,
            },
          },
        }),
    }),
  );
}

export function useCreateMiningWallet() {
  const createMiningWallet = useServerFn(serverFn__createMiningWallet);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMiningWallet,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: querryKeys.miningWallet(),
      });
    },
  });
}

export function useFetchTradingWallet() {
  const readOneTradingWallet = useServerFn(serverFn__readOneTradingWallet);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  return useQuery(
    queryOptions({
      queryKey: querryKeys.tradingWallet(),

      queryFn: () =>
        readOneTradingWallet({
          data: {
            identifier: {
              associatedUser: userId,
            },
          },
        }),
    }),
  );
}

export function useCreateTradingWallet() {
  const createTradingWallet = useServerFn(serverFn__createTradingWallet);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTradingWallet,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: querryKeys.tradingWallet(),
      });
    },
  });
}

export function useTradingOrdersData() {
  const readAllTradingOrders = useServerFn(serverFn__readAllTradingOrders);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  return useQuery(
    queryOptions({
      queryKey: querryKeys.tradingOrders(),

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

export function useRecentTransactionsHistory() {
  const readAllTradingOrders = useServerFn(serverFn__readAllTradingOrders);
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  type TRespose = {
    id: string;
    status: "completed" | "pending";
    category: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    type: "gain" | "receive" | "spend";
  };

  return useQuery(
    queryOptions({
      queryKey: querryKeys.recentTransactions(),

      queryFn: async () => {
        const tradingOrdersResult = await readAllTradingOrders({
          data: {
            identifier: { userId: userId },
          },
        });
        const miningOrdersResult = await readAllMiningOrders({
          data: {
            identifier: { userId: userId },
          },
        });

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
            status: "completed",
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
            status: "completed",
          };

          response.push(filteredFields);
        });

        return response.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        );
      },
    }),
  );
}
