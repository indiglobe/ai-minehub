import { useQuery, queryOptions } from "@tanstack/react-query";
import { serverFn__readOneUser } from "@/integrations/server-function/user";
import { useServerFn } from "@tanstack/react-start";
import { ACTIVE_MINIG_SESSIONS, DASHBOARD } from "@/utils/mutation-keys";
import { useRouteContext } from "@tanstack/react-router";

export function useFetchActiveMiningSessions() {
  const readOneUser = useServerFn(serverFn__readOneUser);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  return useQuery(
    queryOptions({
      queryKey: [DASHBOARD, ACTIVE_MINIG_SESSIONS],

      queryFn: () =>
        readOneUser({
          data: {
            identifier: {
              id: userId,
            },
            joinOptions: {
              miningOrders: true,
            },
          },
        }),

      select: (data) => {
        if (!data) return null;

        const { miningOrders } = data;

        return miningOrders.filter(
          (orders) => orders.miningStatus === "active",
        );
      },
    }),
  );
}
