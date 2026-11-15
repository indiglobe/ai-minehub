import {
  serverFn__createMiningWallet,
  serverFn__readOneMiningWallet,
  serverFn__updateOneMiningWallet,
  serverFn__updateAddBalance,
  serverFn__updateDeductBalance,
} from "@/integrations/tanstack/server-function/mining-wallet.sfn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { read__OneMiningWalletSchema } from "@repo/data/validators/mining-wallet";
import type z from "zod";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TOneMiningWalletSchema = z.infer<typeof read__OneMiningWalletSchema>;
type TOneMiningWalletIdentifier = TOneMiningWalletSchema["identifier"];

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export const miningWalletQueryKeys = {
  all: () => ["mining-wallet", "basic"] as const,

  list: {
    all: () => [...miningWalletQueryKeys.all(), "list"] as const,

    readOne: {
      all: () => [...miningWalletQueryKeys.list.all(), "read-one"] as const,

      withIdentifier: (identifier: TOneMiningWalletIdentifier) =>
        [
          ...miningWalletQueryKeys.list.readOne.all(),
          "identifier",
          identifier,
        ] as const,
    },
  },
} as const;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useCreateMiningWallet() {
  const queryClient = useQueryClient();

  const createMiningWallet = useServerFn(serverFn__createMiningWallet);

  return useMutation({
    mutationFn: createMiningWallet,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: miningWalletQueryKeys.all(),
      });
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadOneMiningWallet(identifier: TOneMiningWalletIdentifier) {
  const readOneMiningWallet = useServerFn(serverFn__readOneMiningWallet);

  return useQuery({
    queryKey: miningWalletQueryKeys.list.readOne.withIdentifier(identifier),

    queryFn: () =>
      readOneMiningWallet({
        data: {
          identifier,
        },
      }),
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useUpdateOneMiningWallet() {
  const queryClient = useQueryClient();

  const updateOneMiningWallet = useServerFn(serverFn__updateOneMiningWallet);

  return useMutation({
    mutationFn: updateOneMiningWallet,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: miningWalletQueryKeys.all(),
      });
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useUpdateAddBalance() {
  const queryClient = useQueryClient();

  const updateAddBalance = useServerFn(serverFn__updateAddBalance);

  return useMutation({
    mutationFn: updateAddBalance,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: miningWalletQueryKeys.all(),
      });
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useUpdateDeductBalance() {
  const queryClient = useQueryClient();

  const updateDeductBalance = useServerFn(serverFn__updateDeductBalance);

  return useMutation({
    mutationFn: updateDeductBalance,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: miningWalletQueryKeys.all(),
      });
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export {
  useCreateMiningWallet,
  useReadOneMiningWallet,
  useUpdateOneMiningWallet,
  useUpdateAddBalance,
  useUpdateDeductBalance,
};
