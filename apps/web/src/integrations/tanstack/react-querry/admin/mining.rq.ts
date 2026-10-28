import { queryOptions, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { serverFn__readAllMiningProfiles } from "@/integrations/server-function/mining-profile";
import { serverFn__readAllMiningOrders } from "@/integrations/server-function/mining-order";
import type { INVESTMENT_STATUS } from "@repo/utils/db-enums";

type TINVESTMENT_STATUS = (typeof INVESTMENT_STATUS)[number];

export const adminMiningQueryKeys = {
  all: ["admin", "mining"] as const,

  profiles: () => [...adminMiningQueryKeys.all, "profiles"] as const,

  orders: () => [...adminMiningQueryKeys.all, "orders"] as const,

  ordersByStatus: (status: TINVESTMENT_STATUS | TINVESTMENT_STATUS[]) =>
    [...adminMiningQueryKeys.orders(), "status", status] as const,

  sessions: () => [...adminMiningQueryKeys.all, "sessions"] as const,

  activeSessions: () => [...adminMiningQueryKeys.sessions(), "active"] as const,
};

export function useReadAllMiningProfiles() {
  const readAllMiningProfiles = useServerFn(serverFn__readAllMiningProfiles);

  return useQuery(
    queryOptions({
      queryKey: adminMiningQueryKeys.profiles(),

      queryFn: () => readAllMiningProfiles(),
    }),
  );
}

export function useReadActiveMiningSession() {
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);

  return useQuery(
    queryOptions({
      queryKey: adminMiningQueryKeys.activeSessions(),

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

export function useReadMiningOrdersByStatus(
  status: TINVESTMENT_STATUS | TINVESTMENT_STATUS[],
) {
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);

  return useQuery(
    queryOptions({
      queryKey: adminMiningQueryKeys.ordersByStatus(status),

      queryFn: () =>
        readAllMiningOrders({
          data: {
            identifier: {
              miningStatus: status,
            },
          },
        }),
    }),
  );
}
