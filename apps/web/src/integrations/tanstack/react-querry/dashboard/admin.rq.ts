import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  serverFn__readAllUsers,
  serverFn__readUserCount,
} from "@/integrations/server-function/user";
import { serverFn__readAllMiningProfiles } from "@/integrations/server-function/mining-profile";
import {
  serverFn__readAllMiningWalletDeposite,
  serverFn__readMiningWalletDepositStats,
  serverFn__updateMiningWalletDeposit,
} from "@/integrations/server-function/mining-wallet-deposits";
import { serverFn__readTradingWalletDepositStats } from "@/integrations/server-function/trading-wallet-deposits";
import { serverFn__readTradingWalletWithdrawStats } from "@/integrations/server-function/trading-wallet-withdraw";
import {
  serverFn__readAllMiningWalletWithdraw,
  serverFn__readMiningWalletWithdrawStats,
} from "@/integrations/server-function/mining-wallet-withdraw";
import { serverFn__readAllMiningOrders } from "@/integrations/server-function/mining-order";

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Query keys
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export const queryKeys = {
  all: ["admin"] as const,

  users: {
    all: () => [...queryKeys.all, "users"] as const,

    count: {
      all: () => [...queryKeys.users.all(), "count"] as const,

      role: (role: string) => [...queryKeys.users.count.all(), role] as const,
    },

    list: {
      all: () => [...queryKeys.users.all(), "list"] as const,
    },
  },

  mining: {
    all: () => [...queryKeys.all, "mining"] as const,

    profiles: {
      all: () => [...queryKeys.mining.all(), "profiles"] as const,
    },

    sessions: {
      all: () => [...queryKeys.mining.all(), "sessions"] as const,

      active: {
        all: () => [...queryKeys.mining.sessions.all(), "active"] as const,
      },
    },

    status: {
      all: (status: string) =>
        [...queryKeys.mining.all(), "status", status] as const,
    },

    deposits: {
      all: () => [...queryKeys.mining.all(), "deposits"] as const,

      list: {
        all: () => [...queryKeys.mining.deposits.all(), "list"] as const,

        status: (status: string) =>
          [...queryKeys.mining.deposits.list.all(), status] as const,
      },

      stats: {
        all: () => [...queryKeys.mining.deposits.all(), "stats"] as const,

        status: {
          all: (status: string) =>
            [...queryKeys.mining.deposits.stats.all(), status] as const,
        },
      },
    },

    withdraw: {
      all: () => [...queryKeys.mining.all(), "withdraw"] as const,

      list: {
        all: () => [...queryKeys.mining.withdraw.all(), "list"] as const,

        status: (status: string) =>
          [...queryKeys.mining.withdraw.list.all(), status] as const,
      },

      stats: {
        all: () => [...queryKeys.mining.withdraw.all(), "stats"] as const,

        status: {
          all: (status: string) =>
            [...queryKeys.mining.withdraw.stats.all(), status] as const,
        },
      },
    },
  },

  trading: {
    all: () => [...queryKeys.all, "trading"] as const,

    deposits: {
      all: () => [...queryKeys.trading.all(), "deposits"] as const,

      stats: {
        all: () => [...queryKeys.trading.deposits.all(), "stats"] as const,

        status: {
          all: (status: string) =>
            [...queryKeys.trading.deposits.stats.all(), status] as const,
        },
      },
    },

    withdraw: {
      all: () => [...queryKeys.trading.all(), "withdraw"] as const,

      stats: {
        all: () => [...queryKeys.trading.withdraw.all(), "stats"] as const,

        status: {
          all: (status: string) =>
            [...queryKeys.trading.withdraw.stats.all(), status] as const,
        },
      },
    },
  },
};

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Users
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export function useReadUserCount() {
  const readUserCount = useServerFn(serverFn__readUserCount);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.users.count.role("BASIC"),

      queryFn: () =>
        readUserCount({
          data: {
            identifier: {
              role: "BASIC",
            },
          },
        }),
    }),
  );
}

export function useReadAllusers() {
  const readAllUsers = useServerFn(serverFn__readAllUsers);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.users.list.all(),

      queryFn: () => readAllUsers(),
    }),
  );
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Mining profiles
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export function useReadAllMiningPlans() {
  const readAllMiningProfiles = useServerFn(serverFn__readAllMiningProfiles);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.mining.profiles.all(),

      queryFn: () => readAllMiningProfiles(),
    }),
  );
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Mining wallet deposits
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export function useReadAllPendingMiningWalletDeposite() {
  const readAllMiningWalletDeposite = useServerFn(
    serverFn__readAllMiningWalletDeposite,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.mining.deposits.list.status("PENDING"),

      queryFn: () =>
        readAllMiningWalletDeposite({
          data: {
            identifier: {
              status: "PENDING",
            },
          },
        }),
    }),
  );
}

export function useReadMiningWalletProcessedDepositStats() {
  const readMiningWalletDepositStats = useServerFn(
    serverFn__readMiningWalletDepositStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.mining.deposits.stats.status.all("PROCESSED"),

      queryFn: () =>
        readMiningWalletDepositStats({
          data: {
            identifier: {
              status: "PROCESSED",
            },
          },
        }),
    }),
  );
}

export function useReadMiningWalletPendingDepositStats() {
  const readMiningWalletDepositStats = useServerFn(
    serverFn__readMiningWalletDepositStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.mining.deposits.stats.status.all("PENDING"),

      queryFn: () =>
        readMiningWalletDepositStats({
          data: {
            identifier: {
              status: "PENDING",
            },
          },
        }),
    }),
  );
}

export function useUpdateMiningWalletDeposit() {
  const queryClient = useQueryClient();

  const updateMiningWalletDeposit = useServerFn(
    serverFn__updateMiningWalletDeposit,
  );

  return useMutation({
    mutationFn: updateMiningWalletDeposit,

    onSuccess: async () => {
      await Promise.all([
        // Invalidate deposit stats
        queryClient.invalidateQueries({
          queryKey: queryKeys.mining.deposits.stats.all(),
        }),

        // Invalidate deposit lists
        queryClient.invalidateQueries({
          queryKey: queryKeys.mining.deposits.list.all(),
        }),
      ]);
    },
  });
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Trading wallet deposits
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export function useReadTradingWalletProcessedDepositStats() {
  const readTradingWalletDepositStats = useServerFn(
    serverFn__readTradingWalletDepositStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.trading.deposits.stats.status.all("PROCESSED"),

      queryFn: () =>
        readTradingWalletDepositStats({
          data: {
            identifier: {
              status: "PROCESSED",
            },
          },
        }),
    }),
  );
}

export function useReadTradingWalletPendingDepositStats() {
  const readTradingWalletDepositStats = useServerFn(
    serverFn__readTradingWalletDepositStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.trading.deposits.stats.status.all("PENDING"),

      queryFn: () =>
        readTradingWalletDepositStats({
          data: {
            identifier: {
              status: "PENDING",
            },
          },
        }),
    }),
  );
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Mining wallet withdrawals
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export function useReadAllPendingMiningWalletWithdraw() {
  const readAllMiningWalletWithdraw = useServerFn(
    serverFn__readAllMiningWalletWithdraw,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.mining.withdraw.list.status("PENDING"),

      queryFn: () =>
        readAllMiningWalletWithdraw({
          data: {
            identifier: {
              status: "PENDING",
            },
          },
        }),
    }),
  );
}

export function useReadMiningWalletPendingWithdrawlStats() {
  const readMiningWalletWithdrawStats = useServerFn(
    serverFn__readMiningWalletWithdrawStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.mining.withdraw.stats.status.all("PENDING"),

      queryFn: () =>
        readMiningWalletWithdrawStats({
          data: {
            identifier: {
              status: "PENDING",
            },
          },
        }),
    }),
  );
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Trading wallet withdrawals
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export function useReadTradingWalletPendingWithdrawlStats() {
  const readTradingWalletWithdrawStats = useServerFn(
    serverFn__readTradingWalletWithdrawStats,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.trading.withdraw.stats.status.all("PENDING"),

      queryFn: () =>
        readTradingWalletWithdrawStats({
          data: {
            identifier: {
              status: "PENDING",
            },
          },
        }),
    }),
  );
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Active mining sessions
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export function useReadActiveMiningSession() {
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.mining.sessions.active.all(),

      queryFn: () =>
        readAllMiningOrders({
          data: {
            identifier: {
              miningStatus: "ACTIVE",
            },
          },
        }),

      select: (activeMiningOrders) => ({
        count: activeMiningOrders.length,

        invested: activeMiningOrders.reduce(
          (total, order) => total + order.amountInvested,
          0,
        ),
      }),
    }),
  );
}
