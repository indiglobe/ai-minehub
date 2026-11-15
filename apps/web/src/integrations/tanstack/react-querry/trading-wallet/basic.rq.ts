import {
  serverFn__createTradingWallet,
  serverFn__readOneTradingWallet,
} from "@/integrations/tanstack/server-function/trading-wallet.sfn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type {
  read__OneTradingWalletSchema,
} from "@repo/data/validators/trading-wallet";
import type z from "zod";

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

type TOneTradingWalletSchema = z.infer<typeof read__OneTradingWalletSchema>;

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

export const tradingWalletQueryKeys = {
  all: () => ["trading-wallet", "basic"],

  list: {
    all: () => [...tradingWalletQueryKeys.all(), "list"],

    readOne: {
      all: () => [...tradingWalletQueryKeys.list.all(), "read-one"],

      withIdentifier: (identifier: TOneTradingWalletSchema["identifier"]) => [
        ...tradingWalletQueryKeys.list.readOne.all(),
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

function useCreateTradingWallet() {
  const queryClient = useQueryClient();

  const createTradingWallet = useServerFn(serverFn__createTradingWallet);

  return useMutation({
    mutationFn: createTradingWallet,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: tradingWalletQueryKeys.all(),
      });
    },
  });
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================

function useReadOneTradingWallet(
  identifier: TOneTradingWalletSchema["identifier"],
) {
  const readOneTradingWallet = useServerFn(serverFn__readOneTradingWallet);

  return useQuery({
    queryKey: tradingWalletQueryKeys.list.readOne.withIdentifier(identifier),

    queryFn: () =>
      readOneTradingWallet({
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

export { useCreateTradingWallet, useReadOneTradingWallet };
