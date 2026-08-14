import { useQuery, queryOptions } from "@tanstack/react-query";
import { serverFn__readAllMiningOrders } from "@/integrations/server-function/mining-order";
import { useServerFn } from "@tanstack/react-start";
import { DASHBOARD, MINING_ORDERS } from "@/utils/mutation-keys";
import { useRouteContext } from "@tanstack/react-router";

export function useMiningOrdersData() {
  const readAllMiningOrders = useServerFn(serverFn__readAllMiningOrders);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  return useQuery(
    queryOptions({
      queryKey: [DASHBOARD, MINING_ORDERS],

      queryFn: async () => {
        const result = await readAllMiningOrders({
          data: {
            identifier: { userId: userId, miningStatus: "active" },
          },
        });

        return result;
      },
    }),
  );
}
