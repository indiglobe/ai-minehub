import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type {
  read__AllMiningOrdersSchema,
} from "@repo/data/validators/mining-order";
import {
  serverFn__readAllMiningOrders,
  serverFn__createMiningOrder,
} from "@/integrations/tanstack/server-function/mining-order.sfn";
import type z from "zod";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TReadAllMiningOrdersSchema = NonNullable<
  z.infer<typeof read__AllMiningOrdersSchema>
>;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export const miningOrderQueryKeys = {
  all: () => ["mining-orders", "basic"],

  list: {
    all: () => [...miningOrderQueryKeys.all(), "list"],

    readAll: {
      all: () => [...miningOrderQueryKeys.list.all(), "read-all"],

      withIdentifier: (
        identifier?: TReadAllMiningOrdersSchema["identifier"],
      ) => [
        ...miningOrderQueryKeys.list.readAll.all(),
        "identifier",
        identifier,
      ],
    },
  },
} as const;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useCreateMiningOrder() {
  const queryClient = useQueryClient();

  const createMiningOrder = useServerFn(serverFn__createMiningOrder);

  return useMutation({
    mutationFn: createMiningOrder,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: miningOrderQueryKeys.all(),
      });
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadAllMiningOrders(
  identifier?: TReadAllMiningOrdersSchema["identifier"],
) {
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);

  return useQuery({
    queryKey: miningOrderQueryKeys.list.readAll.withIdentifier(identifier),

    queryFn: () =>
      readAllMiningOrders({
        data: identifier ? { identifier } : {},
      }),
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export {
  //

  useReadAllMiningOrders,
  useCreateMiningOrder,
};
