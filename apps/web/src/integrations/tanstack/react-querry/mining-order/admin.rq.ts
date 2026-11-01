import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { INVESTMENT_STATUS } from "@repo/utils/db-enums";
import {
  serverFn__readAllMiningOrders,
  serverFn__updateMiningOrder,
} from "@/integrations/tanstack/server-function/mining-order.sfn";

type TINVESTMENT_STATUS = (typeof INVESTMENT_STATUS)[number];

export const queryKeys = {
  __: () => ["mining-orders", "admin"],

  withStatus: {
    __: ({ status }: { status: TINVESTMENT_STATUS | TINVESTMENT_STATUS[] }) => [
      ...queryKeys.__(),
      status,
    ],

    user: {
      __: ({
        status,
      }: {
        status: TINVESTMENT_STATUS | TINVESTMENT_STATUS[];
      }) => [...queryKeys.withStatus.__({ status }), "user"],

      withUserId: ({
        status,
        userId,
      }: {
        status: TINVESTMENT_STATUS | TINVESTMENT_STATUS[];
        userId: string;
      }) => [...queryKeys.withStatus.user.__({ status }), userId],
    },
  },
} as const;

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadAllMiningOrders() {
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.withStatus.__({ status: ["ACTIVE", "COMPLETED"] }),

      queryFn: () =>
        readAllMiningOrders({
          data: {
            identifier: { miningStatus: ["ACTIVE", "COMPLETED"] },
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

function useReadAllMiningOrdersOfUser(userId: string) {
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.withStatus.user.withUserId({
        status: ["ACTIVE", "COMPLETED"],
        userId,
      }),

      queryFn: () =>
        readAllMiningOrders({
          data: {
            identifier: { miningStatus: ["ACTIVE", "COMPLETED"], userId },
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

function useReadCompletedMiningOrdersOfUser(userId: string) {
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.withStatus.user.withUserId({
        status: "COMPLETED",
        userId,
      }),

      queryFn: () =>
        readAllMiningOrders({
          data: {
            identifier: { miningStatus: "COMPLETED", userId },
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

function useReadActiveMiningOrdersOfUser(userId: string) {
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.withStatus.user.withUserId({
        status: "ACTIVE",
        userId,
      }),

      queryFn: () =>
        readAllMiningOrders({
          data: {
            identifier: { miningStatus: "ACTIVE", userId },
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

function useReadActiveMiningOrders() {
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.withStatus.__({ status: "ACTIVE" }),

      queryFn: () =>
        readAllMiningOrders({
          data: {
            identifier: { miningStatus: "ACTIVE" },
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

function useUpdateMiningOrder() {
  const queryClient = useQueryClient();

  const updateMiningOrder = useServerFn(serverFn__updateMiningOrder);

  return useMutation({
    mutationFn: updateMiningOrder,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.__(),
      });
    },
  });
}

export {
  useReadAllMiningOrders,
  useReadActiveMiningOrders,
  useReadCompletedMiningOrdersOfUser,
  useReadActiveMiningOrdersOfUser,
  useReadAllMiningOrdersOfUser,
  useUpdateMiningOrder,
};
