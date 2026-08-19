import { serverFn__readOneUser } from "@/integrations/server-function/user";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

export const querryKeys = {
  all: () => ["referrals"],
};

export function useFetchReferrals() {
  const readOneUser = useServerFn(serverFn__readOneUser);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/referral/",
  });

  return useQuery(
    queryOptions({
      queryKey: querryKeys.all(),

      queryFn: () =>
        readOneUser({
          data: {
            identifier: {
              id: userId,
            },
            joinOptions: {
              referrals: true,
            },
          },
        }),
    }),
  );
}
