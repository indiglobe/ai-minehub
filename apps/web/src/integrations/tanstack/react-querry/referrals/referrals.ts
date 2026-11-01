import { serverFn__readReferrals } from "@/integrations/tanstack/server-function/user.sfn";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

export const querryKeys = {
  all: () => ["referrals"],
};

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadReferrals() {
  const readReferrals = useServerFn(serverFn__readReferrals);

  const {
    userDetailsFromCookie: { email },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/(basic)/referral/",
  });

  return useQuery(
    queryOptions({
      queryKey: querryKeys.all(),

      queryFn: () =>
        readReferrals({
          data: {
            identifier: {
              email,
            },
          },
        }),
    }),
  );
}

export { useReadReferrals };
