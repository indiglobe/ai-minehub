import {
  serverFn__createReferalEarning,
  serverFn__readAllReferalEarning,
} from "@/integrations/tanstack/server-function/referal-earning.sfn";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { z } from "zod";
import type { read__AllReferalEarningSchema } from "@repo/data/validators/referal-earning";

type TReadAllReferalEarning = z.infer<typeof read__AllReferalEarningSchema>;

type TReadAllReferalEarningIdentifier =
  NonNullable<TReadAllReferalEarning>["identifier"];

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

export const queryKeys = {
  all: () => ["referal-earning", "basic"] as const,

  withIdentifier: {
    all: (identifier: TReadAllReferalEarningIdentifier) =>
      [...queryKeys.all(), identifier] as const,
  },
} as const;

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useCreateReferalEarning() {
  const queryClient = useQueryClient();

  const createReferalEarning = useServerFn(serverFn__createReferalEarning);

  return useMutation({
    mutationFn: createReferalEarning,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.all(),
      });
    },
  });
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadAllReferalEarning(
  identifier?: TReadAllReferalEarningIdentifier,
) {
  const readAllReferalEarning = useServerFn(serverFn__readAllReferalEarning);

  return useQuery(
    queryOptions({
      queryKey: identifier
        ? queryKeys.withIdentifier.all(identifier)
        : queryKeys.all(),

      queryFn: () =>
        readAllReferalEarning({
          data: { identifier },
        }),
    }),
  );
}

export { useCreateReferalEarning, useReadAllReferalEarning };
