import { serverFn__readReferrals } from "@/integrations/tanstack/server-function/user.sfn";

import { queryOptions, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

export const queryKeys = {
  all: () => ["referrals", "basic"],

  withIdentifier: {
    all: (identifier: { id: string } | { email: string }) => [
      ...queryKeys.all(),
      identifier,
    ],
  },
} as const;

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadReferrals(identifier: { id: string } | { email: string }) {
  const readReferrals = useServerFn(serverFn__readReferrals);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.withIdentifier.all(identifier),

      queryFn: () =>
        readReferrals({
          data: {
            identifier,
          },
        }),

      enabled: "id" in identifier ? !!identifier.id : !!identifier.email,
    }),
  );
}

export { useReadReferrals };
