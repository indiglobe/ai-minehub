import { serverFn__readOneMiningWallet } from "@/integrations/server-function/mining-wallet";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

export const querryKeys = {
  all: () => ["mining"],
};

export function useFetchOneMiningWallet() {
  const readOneMiningWallet = useServerFn(serverFn__readOneMiningWallet);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/mining/",
  });

  return useQuery(
    queryOptions({
      queryKey: querryKeys.all(),

      queryFn: () =>
        readOneMiningWallet({
          data: {
            identifier: { associatedUser: userId },
          },
        }),
    }),
  );
}
