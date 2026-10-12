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
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);

  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  return useQuery(
    queryOptions({
      queryKey: querryKeys.activeMinigSessions(),

      queryFn: () =>
        readAllMiningOrders({
          data: {
            identifier: { userId: userId, miningStatus: "ACTIVE" },
          },
        }),
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
      queryKey: querryKeys.investmentDetails(),

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
          if (miningOrder.miningStatus === "COMPLETED") {
            output = {
              ...output,
              investedAmount:
                output.investedAmount + miningOrder.amountInvested,
              gainedAmount:
                output.gainedAmount +
                (miningOrder.amountReceived
                  ? miningOrder.amountReceived - miningOrder.amountInvested
                  : 0),
            };
          }

          if (miningOrder.miningStatus === "ACTIVE") {
            output = {
              ...output,
              activeInvestmentsCount: output.activeInvestmentsCount + 1,
            };
          }
        });

        data.allTradingOrders.forEach((tradingOrder) => {
          if (tradingOrder.tradingStatus === "COMPLETED") {
            output = {
              ...output,
              investedAmount:
                output.investedAmount + tradingOrder.amountInvested,
            };
          }
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
      queryKey: querryKeys.miningOrders(),

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

export function useFetchMiningWallet() {
  const readOneMiningWallet = useServerFn(serverFn__readOneMiningWallet);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  return useQuery(
    queryOptions({
      queryKey: querryKeys.miningWallet(),

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
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
  });

  return useQuery(
    queryOptions({
      queryKey: querryKeys.tradingWallet(),

      queryFn: () =>
        readOneTradingWallet({
          data: {
            identifier: { associatedUserId: userId },
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
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
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
    from: "/(without-header-footer)/(authenticated)/(existing-user)",
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
        const [miningOrdersResult, tradingOrdersResult] = await Promise.all([
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
