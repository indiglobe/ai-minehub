import { serverFn__readReferrals } from "@/integrations/server-function/user";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

export const querryKeys = {
  all: () => ["referrals"],
};

export function useFetchReferrals() {
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
