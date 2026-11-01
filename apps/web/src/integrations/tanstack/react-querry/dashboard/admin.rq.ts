import {
  queryOptions,
  useQuery,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  serverFn__readAllMiningWalletWithdraw,
} from "@/integrations/tanstack/server-function/mining-wallet-withdraw.sfn";

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
