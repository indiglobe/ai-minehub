import {
  serverFn__readAllUsers,
  serverFn__readUserCount,
} from "@/integrations/server-function/user";
import { serverFn__readAllMiningProfiles } from "@/integrations/server-function/mining-profile";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { serverFn__readAllMiningWalletDeposite } from "@/integrations/server-function/mining-wallet-deposits";

// Hierarchical query keys factory scoped for admin operations
export const queryKeys = {
  all: ["admin"] as const,
  
  users: {
    all: () => [...queryKeys.all, "users"] as const,
    count: (role?: string) => [...queryKeys.users.all(), "count", { role }] as const,
    list: () => [...queryKeys.users.all(), "list"] as const,
  },

  mining: {
    all: () => [...queryKeys.all, "mining"] as const,
    profiles: () => [...queryKeys.mining.all(), "profiles"] as const,
    deposits: (status?: string) => [...queryKeys.mining.all(), "deposits", { status }] as const,
  },
};

export function useReadUserCount() {
  const readUserCount = useServerFn(serverFn__readUserCount);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.users.count("BASIC"),

      queryFn: () => readUserCount({ data: { identifier: { role: "BASIC" } } }),
    }),
  );
}

export function useReadAllusers() {
  const readAllUsers = useServerFn(serverFn__readAllUsers);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.users.list(),

      queryFn: () => readAllUsers(),
    }),
  );
}

export function useReadAllMiningPlans() {
  const readAllMiningProfiles = useServerFn(serverFn__readAllMiningProfiles);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.mining.profiles(),

      queryFn: () => readAllMiningProfiles(),
    }),
  );
}

export function useReadAllPendingMiningWalletDeposite() {
  const readAllMiningWalletDeposite = useServerFn(
    serverFn__readAllMiningWalletDeposite,
  );

  return useQuery(
    queryOptions({
      queryKey: queryKeys.mining.deposits("PENDING"),

      queryFn: () =>
        readAllMiningWalletDeposite({
          data: { identifier: { status: "PENDING" } },
        }),
    }),
  );
}